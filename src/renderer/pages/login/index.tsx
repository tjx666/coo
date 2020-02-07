import * as React from 'react';
import EnhancedLoginForm from './LoginForm';
import './style.scss';

export default function LoginPage() {
    return (
        <main className="login-page">
            <span className="title">登入</span>
            <EnhancedLoginForm />
        </main>
    );
}
