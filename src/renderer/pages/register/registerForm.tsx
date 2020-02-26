import React, { forwardRef, useImperativeHandle } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';
import store from 'utils/store';

import api, { AxiosResponse } from '../../api';
import { RegisterResponse } from '../../dto';

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

// eslint-disable-next-line react/display-name
const RegisterForm = forwardRef<Ref, RegisterFormProps>(({ form }: RegisterFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));

    const history = useHistory();
    const { getFieldDecorator } = form;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields(async (validateError, values) => {
            if (!validateError) {
                const { email, name, password } = values;
                let resp: AxiosResponse<RegisterResponse> | undefined;

                try {
                    resp = await api<RegisterResponse>('register', {
                        data: { email, name, password },
                    });
                } catch (err) {
                    message.error('注册失败！');
                    return;
                }

                const {
                    code,
                    msg,
                    data: { token },
                } = resp.data;
                if (code === 0) {
                    message.success('注册成功！');
                    store.set('token', token);
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

    const nameInput = getFieldDecorator('name', {
        rules: [{ required: true, message: '请输入您的昵称！' }],
    })(<Input prefix={<Icon type="user" style={InputsStyle} />} placeholder="昵称" />);

    const passwordInput = getFieldDecorator('password', {
        rules: [{ required: true, message: '请输入您的密码！' }],
    })(
        <Input
            type="password"
            prefix={<Icon type="lock" style={InputsStyle} />}
            placeholder="密码"
        />,
    );

    return (
        <Form className="register-form" onSubmit={handleSubmit}>
            <FormItem>{emailInput}</FormItem>
            <FormItem>{nameInput}</FormItem>
            <FormItem>{passwordInput}</FormItem>
            <FormItem>
                <Button className="register-btn" type="primary" htmlType="submit">
                    注册
                </Button>
                <Link to="/login">登入</Link>
            </FormItem>
        </Form>
    );
});

const EnhancedRegisterForm = Form.create<RegisterFormProps>()(RegisterForm);

export default EnhancedRegisterForm;
