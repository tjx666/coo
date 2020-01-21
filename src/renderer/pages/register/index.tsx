import * as React from 'react';
import RegisterForm from './registerForm';
import './style.scss';

export default function RegisterPage() {
    return (
        <main className="register">
            <span className="title">用户注册</span>
            <RegisterForm />
        </main>
    );
}
