import React, { forwardRef, useImperativeHandle } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Modal, Avatar, Icon, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';
import store from 'utils/store';

import { BASE_URL, API_PREFIX } from 'utils/constants';
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

// const avatarSrc = `${BASE_URL}/public/images/avatar/${userId}`;

// eslint-disable-next-line react/display-name
const ProfileForm = forwardRef<Ref, ProfileFormProps>(({ form }: ProfileFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));
    const history = useHistory();
    const { getFieldDecorator, setFieldsValue } = form;

    const [modalVisible, setVisible] = React.useState(false);
    const [avatarSrc, setAvatarSrc] = React.useState('');

    const syncProfile = React.useCallback(async () => {
        let resp: AxiosResponse<GetUserResponse> | undefined;
        try {
            resp = await api<GetUserResponse>('getUser', {
                pathParams: { id: store.get('id')! },
            });
        } catch (err) {
            message.error('获取用户信息出错！');
            return;
        }
        setFieldsValue({ name: resp.data.data.name });
        const newAvatarSrc = `${BASE_URL}/public/images/avatar/${resp.data.data.avatar}`;
        setAvatarSrc(newAvatarSrc);
    }, [setFieldsValue]);

    React.useEffect(() => {
        syncProfile();
    }, [syncProfile]);

    const uploadProps = {
        name: 'avatar',
        action: `${API_PREFIX}users/${store.get('id')}/avatar`,
        headers: {
            Authorization: store.get('token'),
        },
        onChange(info: UploadChangeParam) {
            if (info.file.status === 'done') {
                syncProfile();
                message.success('上传头像成功！');
            } else if (info.file.status === 'error') {
                message.error(`上传头像失败！`);
            }
        },
        showUploadList: false,
    };

    const updateProfile = async () => {
        const newProfile = (Object.entries(form.getFieldsValue()) as Array<
            [keyof FormFields, string]
        >).reduce<Partial<FormFields>>((pre, current) => {
            const value = current[1];
            pre[current[0]] = value === undefined ? '' : value.trim();
            return pre;
        }, {});

        try {
            await api<UpdateProfileResponse>('updateProfile', {
                pathParams: { id: store.get('id')! },
                data: newProfile,
            });
        } catch (err) {
            message.error('修改用户信息出错！');
            return false;
        }

        message.success('修改成功，请重新登入');
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
            store.delete('token');
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

    const passwordInput = getFieldDecorator('password')(
        <Input.Password placeholder="输入新的密码" />,
    );

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
            <div className="avatar-container">
                <Avatar className="avatar" src={avatarSrc} size={60} />
                <div className="edit-overlay">
                    <Upload {...uploadProps}>
                        <Icon className="pen" theme="filled" type="edit" />
                    </Upload>
                </div>
            </div>
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
