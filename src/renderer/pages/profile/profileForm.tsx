import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Modal, Avatar, Upload, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadProps } from 'antd/lib/upload/interface';
import debounce from 'lodash/debounce';

import api from 'api';
import { UpdateProfileResponse } from 'api/user';
import { RootState } from 'reducers';
import { fetchProfile } from 'reducers/profile';
import { API_PREFIX, ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';
import storage from 'utils/storage';

const { Item: FormItem } = Form;

const formLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const nameInputRules = [{ required: true, message: '昵称不能为空！' }];

function ProfileForm() {
    const dispatch = useDispatch();

    const history = useHistory();
    const [form] = Form.useForm();
    const name = useSelector((state: RootState) => state.profile.name);
    const avatar = useSelector((state: RootState) => state.profile.avatar);
    const [modalVisible, setVisible] = useState(false);

    useEffect(() => {
        form.setFieldsValue({ name });
    }, [form, name]);

    const uploadProps: UploadProps = useMemo(() => {
        return {
            name: 'avatar',
            method: 'PUT',
            action: `${API_PREFIX}/users/${storage.get('id')}/avatar`,
            headers: {
                Authorization: storage.get('token'),
            },
            onChange(info: UploadChangeParam) {
                if (info.file.status === 'done') {
                    dispatch(fetchProfile());
                    message.success('上传头像成功！');
                } else if (info.file.status === 'error') {
                    message.error(`上传头像失败！`);
                }
            },
            showUploadList: false,
        };
    }, [dispatch]);

    const updateProfile = useCallback(async () => {
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
            console.error(error);
            message.error('修改用户信息出错！');
            return false;
        }

        message.success('修改成功！');
        return true;
    }, [form]);

    const cancelModify = useCallback(() => setVisible(false), []);

    const resetPwd = useCallback(() => {
        setVisible(false);
        form.setFieldsValue({ password: '' });
    }, [form]);

    const modifyPwd = useCallback(async () => {
        const modifyPasswordSuccess = await updateProfile();
        if (modifyPasswordSuccess) {
            setVisible(false);
            message.success('修改成功，请重新登入');
            storage.delete('token');
            history.push('/login');
        }
    }, [updateProfile, history]);

    const submit = useMemo(
        () =>
            debounce((values: any) => {
                const { password } = values;
                const isFilledPassword = password && password.trim() !== '';
                if (isFilledPassword) {
                    setVisible(true);
                } else {
                    updateProfile();
                }
            }, 200),
        [updateProfile],
    );

    const modalTitle = useMemo(
        () => (
            <div className="modal-title">
                <span className="title">确定要修改代码吗？</span>
            </div>
        ),
        [],
    );

    const modalFooter = useMemo(
        () => (
            <div className="modal-footer">
                <Button type="ghost" onClick={cancelModify}>
                    取消修改
                </Button>
                <Button type="primary" onClick={resetPwd}>
                    清空密码
                </Button>
                <Button danger onClick={modifyPwd}>
                    修改密码
                </Button>
            </div>
        ),
        [cancelModify, resetPwd, modifyPwd],
    );

    return (
        <Form className="profile-form" form={form} onFinish={submit} {...formLayout}>
            <Modal
                className="profile-modal"
                title={modalTitle}
                footer={modalFooter}
                visible={modalVisible}
                closable={false}
            >
                <h3 className="warning-title">重要的事情说三遍！</h3>
                请确保你已经记住新密码！！！
                <br /> 请确保你已经记住新密码！！！
                <br /> 请确保你已经记住新密码！！！
            </Modal>
            <div className="avatar-container">
                <Avatar
                    className="avatar"
                    src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
                    size={60}
                />
                <div className="edit-overlay">
                    <Upload {...uploadProps}>
                        <EditOutlined className="pen" />
                    </Upload>
                </div>
            </div>
            <FormItem label="昵称" name="name" rules={nameInputRules}>
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

export default memo(ProfileForm);
