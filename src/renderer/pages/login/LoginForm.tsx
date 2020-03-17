import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import api, { Response } from 'api';
import { LoginResponse } from 'api/user';
import { updateUser } from 'reducers/user';
import storage from 'utils/storage';

const { Item: FormItem } = Form;

export default function LoginForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (values: any) => {
        const { email, password } = values;

        let resp: Response<LoginResponse> | undefined;
        try {
            resp = await api('login', {
                data: {
                    email,
                    password,
                },
            });
        } catch (error) {
            console.error(error);
            message.error('登入失败！');
            return;
        }

        const { user, token } = resp.data.data;
        message.success('登入成功！');
        dispatch(updateUser(user));
        storage.set('token', token);
        storage.set('id', user.id);
        history.push('/message');
    };

    const InputsStyle: React.CSSProperties = {
        color: 'rgba(0,0,0,.25)',
    };

    return (
        <Form className="login-form" onFinish={handleSubmit}>
            <FormItem name="email" rules={[{ required: true, message: '请输入邮箱！' }]}>
                <Input
                    type="email"
                    prefix={<MailOutlined style={InputsStyle} />}
                    placeholder="邮箱"
                />
            </FormItem>
            <FormItem name="password" rules={[{ required: true, message: '请输入您的密码！' }]}>
                <Input
                    type="password"
                    prefix={<LockOutlined style={InputsStyle} />}
                    placeholder="密码"
                />
            </FormItem>
            <FormItem>
                <Button className="login-btn" type="primary" htmlType="submit">
                    登入
                </Button>
                <Link to="/register">注册</Link>
            </FormItem>
        </Form>
    );
}
