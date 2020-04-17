import React, { memo, useMemo } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import api, { Response } from 'api';
import { LoginResponse } from 'api/user';
import { updateProfile } from 'reducers/profile';
import storage from 'utils/storage';

const { Item: FormItem } = Form;
const formRules = {
    email: [{ required: true, message: '请输入邮箱！' }],
    password: [{ required: true, message: '请输入您的密码！' }],
};

function LoginForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = useMemo(
        () =>
            debounce(async (values: any) => {
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
                    const code = error?.response?.data?.code;
                    if (code === 1) {
                        message.error('邮箱不存在！');
                    } else if (code === 2) {
                        message.error('密码错误！');
                    } else {
                        message.error('登入失败！');
                    }
                    return;
                }

                const { user, token } = resp.data.data;
                dispatch(updateProfile(user));
                storage.set('token', token);
                storage.set('id', user.id);

                await message.success('登入成功！');
                history.push('/message');
            }, 200),
        [dispatch, history],
    );

    const prefixIcons = useMemo(() => ({ mail: <MailOutlined />, lock: <LockOutlined /> }), []);

    return (
        <Form className="login-form" onFinish={handleSubmit}>
            <FormItem name="email" rules={formRules.email}>
                <Input type="email" prefix={prefixIcons.mail} placeholder="邮箱" />
            </FormItem>
            <FormItem name="password" rules={formRules.password}>
                <Input type="password" prefix={prefixIcons.lock} placeholder="密码" />
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

export default memo(LoginForm);
