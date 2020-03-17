import React from 'react';

import RegisterForm from './registerForm';
import './style.scss';

export default function RegisterPage() {
    return (
        <main className="register-page">
            <span className="title">用户注册</span>
            <RegisterForm />
        </main>
    );
}
