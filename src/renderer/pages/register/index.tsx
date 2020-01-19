import * as React from 'react';
import { useForm } from 'react-hook-form';

import './style.scss';

type FormData = {
    firstName: string;
    lastName: string;
};

export default function Register() {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const onSubmit = handleSubmit(({ firstName, lastName }) => {
        console.log(firstName, lastName);
    });

    return (
        <div className="register">
            <h2 className="title">用户注册</h2>
            <form className="register-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label>邮箱：</label>
                    <input name="firstName" ref={register} />
                </div>
                <div className="form-control">
                    <label>密码：</label>
                    <input name="lastName" ref={register} />
                </div>
                <input className="submit-btn" type="submit" />
            </form>
        </div>
    );
}
