import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

const { Item: FormItem } = Form;
const InputsStyle: React.CSSProperties = {
    color: 'rgba(0,0,0,.25)',
};

type RegisterFormProps = FormComponentProps;

type Ref = FormComponentProps;
const RegisterForm = forwardRef<Ref, RegisterFormProps>(({ form }: RegisterFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));

    const { getFieldDecorator } = form;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields(err => {
            if (err) {
                console.log('校验出错');
                console.error(err);
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
