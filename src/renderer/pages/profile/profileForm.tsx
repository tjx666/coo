import React, { forwardRef, useImperativeHandle } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Icon } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

import api, { AxiosResponse } from '../../api';
import { GetUserResponse, UpdateProfileResponse } from '../../dto';

const { Item: FormItem } = Form;

type Ref = FormComponentProps;

interface FormFields {
    name: string;
    password: string;
}

interface ProfileFormProps extends FormComponentProps {
    form: WrappedFormUtils<FormFields>;
}

const ProfileForm = forwardRef<Ref, ProfileFormProps>(({ form }: ProfileFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));
    const history = useHistory();
    const { getFieldDecorator, setFieldsValue } = form;

    const [modalVisible, setVisible] = React.useState(false);
    React.useEffect(() => {
        (async function syncProfile() {
            let resp: AxiosResponse<GetUserResponse> | undefined;
            try {
                resp = await api<GetUserResponse>('getUser', { pathParams: { id: localStorage.getItem('id')! } });
            } catch (err) {
                console.error(err);
                message.error('获取用户信息出错！');
                return;
            }
            setFieldsValue({ name: resp.data.data.name });
        })();
    }, [setFieldsValue]);

    const updateProfile = async () => {
        const newProfile = (Object.entries(form.getFieldsValue()) as Array<[keyof FormFields, string]>).reduce<
            Partial<FormFields>
        >((pre, current) => {
            const value = current[1];
            pre[current[0]] = value === undefined ? '' : value.trim();
            return pre;
        }, {});

        try {
            await api<UpdateProfileResponse>('updateProfile', {
                pathParams: { id: localStorage.getItem('id')! },
                data: newProfile,
            });
        } catch (err) {
            console.error(err);
            message.error('修改用户信息出错！');
            return false;
        }

        message.success('修改成功！');
        return true;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields(async (validateError, values) => {
            if (!validateError) {
                const { password } = values;
                const isFilledPassword = password && password.trim() !== '';
                if (isFilledPassword) {
                    setVisible(true);
                } else {
                    updateProfile();
                }
            }
        });
    };

    const formLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };

    const handleModifyPwd = async () => {
        setVisible(false);

        const modifyPasswordSuccess = await updateProfile();
        if (modifyPasswordSuccess) {
            localStorage.removeItem('token');
            history.push('/login');
        }
    };

    const handleResetPwd = () => {
        setVisible(false);
        setFieldsValue({ password: '' });
    };

    const nameInput = getFieldDecorator('name', {
        rules: [{ required: true, message: '昵称不能为空！' }],
    })(<Input placeholder="输入新的昵称" />);

    const passwordInput = getFieldDecorator('password')(<Input.Password placeholder="输入新的密码" />);

    const modalTitle = (
        <div className="modal-title">
            <span className="title">确定要修改代码吗？</span>
        </div>
    );

    const modalFooter = (
        <div className="modal-footer">
            <Button type="ghost" onClick={() => setVisible(false)}>
                取消修改
            </Button>
            <Button type="primary" onClick={handleResetPwd}>
                清空密码
            </Button>
            <Button type="danger" onClick={handleModifyPwd}>
                修改密码
            </Button>
        </div>
    );

    return (
        <Form className="profile-form" onSubmit={handleSubmit} {...formLayout}>
            <Modal
                className="profile-modal"
                visible={modalVisible}
                title={modalTitle}
                bodyStyle={{
                    textAlign: 'center',
                }}
                closable={false}
                footer={modalFooter}
            >
                <p style={{ fontWeight: 'bold' }}>重要的事情说三遍！</p>
                <br /> 请确保你已经记住新密码！！！
                <br /> 请确保你已经记住新密码！！！
                <br /> 请确保你已经记住新密码！！！
            </Modal>
            <FormItem label="昵称">{nameInput}</FormItem>
            <FormItem label="密码">{passwordInput}</FormItem>
            <Button className="save-btn" type="primary" htmlType="submit">
                保存
            </Button>
        </Form>
    );
});

const EnhancedProfileForm = Form.create<ProfileFormProps>()(ProfileForm);

export default EnhancedProfileForm;
