import React, { useMemo } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import api from 'api';
import { RegisterResponse } from 'api/user';

const { Item: FormItem } = Form;
const formRules = {
    email: [{ required: true, message: '请输入邮箱！' }],
    name: [{ required: true, message: '请输入您的昵称！' }],
    password: [{ required: true, message: '请输入您的密码！' }],
};

export default function RegisterForm() {
    const history = useHistory();

    const handleSubmit = useMemo(
        () =>
            debounce(async (values: any) => {
                const { email, name, password } = values;
                try {
                    await api<RegisterResponse>('register', {
                        data: { email, name, password },
                    });
                } catch (error) {
                    console.error(error);
                    if (error?.response?.data?.code === 1) {
                        message.error(`邮箱 ${email} 已经被注册！`);
                    } else {
                        message.error('注册失败！');
                    }
                    return;
                }

                await message.success('注册成功！');
                history.push('/login');
            }, 200),
        [history],
    );

    const prefixIcons = useMemo(
        () => ({
            mail: <MailOutlined />,
            user: <UserOutlined />,
            lock: <LockOutlined />,
        }),
        [],
    );

    return (
        <Form className="register-form" onFinish={handleSubmit}>
            <FormItem name="email" rules={formRules.email}>
                <Input prefix={prefixIcons.mail} placeholder="邮箱" />
            </FormItem>
            <FormItem name="name" rules={formRules.password}>
                <Input prefix={prefixIcons.user} placeholder="昵称" />
            </FormItem>
            <FormItem name="password" rules={formRules.name}>
                <Input type="password" prefix={prefixIcons.lock} placeholder="密码" />
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
