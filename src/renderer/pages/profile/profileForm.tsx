import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

import api, { AxiosResponse } from '../../api';
import { GetUserResponse } from '../../dto';

const { Item: FormItem } = Form;

type Ref = FormComponentProps;
interface ProfileFormProps extends FormComponentProps {
    form: WrappedFormUtils<FormFields>;
}

interface FormFields {
    email: string;
    name: string;
    password: string;
}

const ProfileForm = forwardRef<Ref, ProfileFormProps>(({ form }: ProfileFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));
    const { getFieldDecorator, setFieldsValue } = form;

    const [profile, setProfile] = React.useState({ name: '', password: '' });
    React.useEffect(() => {
        (async function syncProfile() {
            let resp: AxiosResponse<GetUserResponse> | undefined;
            try {
                resp = await api<GetUserResponse>('getUser', { pathParams: { id: localStorage.getItem('id')! } });
            } catch (err) {
                console.error(err);
                message.error('获取用户信息出错！');
                return;
            }

            setProfile({
                ...profile,
                name: resp!.data.name,
            });
        })();
    }, [profile]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields(async (validateError, values) => {
            if (!validateError) {
                // ...
            }
        });
    };

    const formLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };

    const nameInput = getFieldDecorator('name', {
        rules: [{ required: true, message: '昵称不能为空！' }],
    })(<Input value={profile.name} placeholder="输入新的昵称" />);

    const passwordInput = getFieldDecorator('password', {
        rules: [{ required: true, message: '密码不能为空！' }],
    })(<Input type="password" value={profile.password} placeholder="输入新的密码" />);

    return (
        <Form className="profile-form" onSubmit={handleSubmit} {...formLayout}>
            <FormItem label="昵称">{nameInput}</FormItem>
            <FormItem label="密码">{passwordInput}</FormItem>
            <Button className="save-btn" type="primary" htmlType="submit">
                保存
            </Button>
        </Form>
    );
});

const EnhancedProfileForm = Form.create<ProfileFormProps>()(ProfileForm);

export default EnhancedProfileForm;
