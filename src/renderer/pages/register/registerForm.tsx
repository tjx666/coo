import React, { useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

import api, { Response } from 'api';
import { RegisterResponse } from 'api/user';
import storage from 'utils/storage';

const { Item: FormItem } = Form;

const InputsStyle: React.CSSProperties = {
    color: 'rgba(0,0,0,.25)',
};

export default function RegisterForm() {
    const history = useHistory();

    const handleSubmit = useCallback(
        async (values: any) => {
            const { email, name, password } = values;
            let resp: Response<RegisterResponse> | undefined;
            try {
                resp = await api<RegisterResponse>('register', {
                    data: { email, name, password },
                });
            } catch (error) {
                message.error('注册失败！');
                return;
            }

            const { token } = resp.data.data;
            storage.set('token', token);
            message.success('注册成功！');
            history.push('/message');
        },
        [history],
    );

    return (
        <Form className="register-form" onFinish={handleSubmit}>
            <FormItem name="email" rules={[{ required: true, message: '请输入邮箱！' }]}>
                <Input prefix={<MailOutlined style={InputsStyle} />} placeholder="邮箱" />
            </FormItem>
            <FormItem name="name" rules={[{ required: true, message: '请输入您的昵称！' }]}>
                <Input prefix={<UserOutlined style={InputsStyle} />} placeholder="昵称" />
            </FormItem>
            <FormItem name="password" rules={[{ required: true, message: '请输入您的密码！' }]}>
                <Input prefix={<LockOutlined style={InputsStyle} />} placeholder="密码" />
            </FormItem>
            <FormItem>
                <Button className="register-btn" type="primary" htmlType="submit">
                    注册
                </Button>
                <Link to="/login">登入</Link>
            </FormItem>
        </Form>
    );
}
