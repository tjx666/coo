import React, { forwardRef, useImperativeHandle } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

import api, { AxiosResponse } from '../../api';
import { LoginResponse } from '../../dto';

const { Item: FormItem } = Form;

type Ref = FormComponentProps;
interface LoginFormProps extends FormComponentProps {
    form: WrappedFormUtils<FormFields>;
}

interface FormFields {
    email: string;
    password: string;
}

const InputsStyle: React.CSSProperties = {
    color: 'rgba(0,0,0,.25)',
};

const LoginForm = forwardRef<Ref, LoginFormProps>(({ form }: LoginFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));

    const history = useHistory();
    const { getFieldDecorator } = form;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields(async (validateError, values) => {
            if (!validateError) {
                const { email, password } = values;
                let resp: AxiosResponse<LoginResponse> | undefined;

                try {
                    resp = await api('login', {
                        data: {
                            email,
                            password,
                        },
                    });
                } catch (err) {
                    console.error(err);
                    message.error('登入失败！');
                    return;
                }

                const { code, msg, data: jwt } = resp.data;
                if (code === 0) {
                    message.success('登入成功！');
                    localStorage.setItem('jwt', jwt);
                    history.push('/message');
                } else {
                    console.error(msg);
                    message.error(msg);
                }
            }
        });
    };

    const emailInput = getFieldDecorator('email', {
        rules: [{ required: true, message: '请输入邮箱！' }],
    })(<Input type="email" prefix={<Icon type="mail" style={InputsStyle} />} placeholder="邮箱" />);

    const passwordInput = getFieldDecorator('password', {
        rules: [{ required: true, message: '请输入您的密码！' }],
    })(<Input type="password" prefix={<Icon type="lock" style={InputsStyle} />} placeholder="密码" />);

    return (
        <Form id="login-form" onSubmit={handleSubmit}>
            <FormItem>{emailInput}</FormItem>
            <FormItem>{passwordInput}</FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    登入
                </Button>
            </FormItem>
        </Form>
    );
});

const EnhancedLoginForm = Form.create<LoginFormProps>()(LoginForm);

export default EnhancedLoginForm;
