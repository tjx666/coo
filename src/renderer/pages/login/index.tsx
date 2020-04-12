import React, { memo } from 'react';

import LoginForm from './LoginForm';
import './style.scss';

function LoginPage() {
    return (
        <main className="login-page">
            <span className="title">登入</span>
            <LoginForm />
        </main>
    );
}

export default memo(LoginPage);
