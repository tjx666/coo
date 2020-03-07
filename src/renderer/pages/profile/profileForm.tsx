import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Modal, Avatar, Upload, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';

import { RootState } from '@/store';
import { updateUser } from 'reducers/user';
import storage from '@/utils/storage';
import { API_PREFIX } from 'utils/constants';
import api, { AxiosResponse } from 'api';
import { GetUserResponse, UpdateProfileResponse } from 'api/user';

const { Item: FormItem } = Form;

export default function ProfileForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [modalVisible, setVisible] = React.useState(false);
    const avatar = useSelector((state: RootState) => state.user.avatar);

    const syncProfile = React.useCallback(async () => {
        let resp: AxiosResponse<GetUserResponse> | undefined;
        try {
            resp = await api<GetUserResponse>('getUser', {
                pathParams: { id: storage.get('id')! },
            });
        } catch (error) {
            message.error('获取用户信息出错！');
            return;
        }

        const { name, avatar: newAvatar } = resp.data.data;
        form.setFieldsValue({ name });
        dispatch(updateUser({ avatar: newAvatar }));
    }, [form, dispatch]);

    const uploadProps = {
        name: 'avatar',
        action: `${API_PREFIX}users/${storage.get('id')}/avatar`,
        headers: {
            Authorization: storage.get('token'),
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
        const newProfile = Object.entries(form.getFieldsValue()).reduce((pre: any, current) => {
            const value = current[1];
            pre[current[0]] = value === undefined ? '' : value.trim();
            return pre;
        }, {});

        try {
            await api<UpdateProfileResponse>('updateProfile', {
                pathParams: { id: storage.get('id')! },
                data: newProfile,
            });
        } catch (error) {
            message.error('修改用户信息出错！');
            return false;
        }

        return true;
    };

    const handleSubmit = (values: any) => {
        const { password } = values;
        const isFilledPassword = password && password.trim() !== '';

        if (isFilledPassword) {
            setVisible(true);
        } else {
            updateProfile();
            message.success('修改成功！');
        }
    };

    const handleModifyPwd = async () => {
        setVisible(false);

        const modifyPasswordSuccess = await updateProfile();
        if (modifyPasswordSuccess) {
            message.success('修改成功，请重新登入');
            storage.delete('token');
            history.push('/login');
        }
    };

    const handleResetPwd = () => {
        setVisible(false);
        form.setFieldsValue({ password: '' });
    };

    const formLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };

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
        <Form className="profile-form" form={form} onFinish={handleSubmit} {...formLayout}>
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
                <Avatar className="avatar" src={avatar} size={60} />
                <div className="edit-overlay">
                    <Upload {...uploadProps}>
                        <EditOutlined className="pen" />
                    </Upload>
                </div>
            </div>
            <FormItem
                label="昵称"
                name="name"
                rules={[{ required: true, message: '昵称不能为空！' }]}
            >
                <Input placeholder="输入新的昵称" />
            </FormItem>
            <FormItem label="密码" name="password">
                <Input.Password placeholder="输入新的密码" />
            </FormItem>
            <Button className="save-btn" type="primary" htmlType="submit">
                保存
            </Button>
        </Form>
    );
}
