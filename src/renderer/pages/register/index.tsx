import * as React from 'react';
import RegisterForm from './registerForm';
import './style.scss';

export default function Register() {
    return (
        <div className="register">
            <span className="title">用户注册</span>
            <RegisterForm />
        </div>
    );
}
