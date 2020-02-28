import * as React from 'react';

import LoginForm from './LoginForm';
import './style.scss';

export default function LoginPage() {
    return (
        <main className="login-page">
            <span className="title">登入</span>
            <LoginForm />
        </main>
    );
}
