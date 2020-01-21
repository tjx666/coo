import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

import api, { AxiosResponse } from '../../api';
import { UserRegisterResponse } from '../../dto/user';

const { Item: FormItem } = Form;

type Ref = FormComponentProps;
interface RegisterFormProps extends FormComponentProps {
    form: WrappedFormUtils<FormFields>;
}

interface FormFields {
    email: string;
    name: string;
    password: string;
}

const InputsStyle: React.CSSProperties = {
    color: 'rgba(0,0,0,.25)',
};

const RegisterForm = forwardRef<Ref, RegisterFormProps>(({ form }: RegisterFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));

    const { getFieldDecorator } = form;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields(async (validateErr, values) => {
            if (!validateErr) {
                const { email, name, password } = values;
                let resp: AxiosResponse<UserRegisterResponse> | undefined;

                try {
                    resp = await api<UserRegisterResponse>('registerUser', {
                        data: { email, name, password },
                    });
                } catch (err) {
                    console.error(err);
                    message.error('注册失败！');
                    return;
                }

                const { code, msg, data } = resp.data;
                if (code === 0) {
                    message.success('注册成功！');
                    localStorage.setItem('jwt', data);
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

    const nameInput = getFieldDecorator('name', {
        rules: [{ required: true, message: '请输入您的昵称！' }],
    })(<Input prefix={<Icon type="user" style={InputsStyle} />} placeholder="昵称" />);

    const passwordInput = getFieldDecorator('password', {
        rules: [{ required: true, message: '请输入您的密码！' }],
    })(<Input type="password" prefix={<Icon type="lock" style={InputsStyle} />} placeholder="密码" />);

    return (
        <Form id="register-form" onSubmit={handleSubmit}>
            <FormItem>{emailInput}</FormItem>
            <FormItem>{nameInput}</FormItem>
            <FormItem>{passwordInput}</FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    注册
                </Button>
            </FormItem>
        </Form>
    );
});

const EnhancedRegisterForm = Form.create<RegisterFormProps>()(RegisterForm);

export default EnhancedRegisterForm;
