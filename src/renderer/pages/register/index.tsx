import React, { memo } from 'react';

import RegisterForm from './registerForm';
import './style.scss';

function RegisterPage() {
    return (
        <main className="register-page">
            <span className="title">用户注册</span>
            <RegisterForm />
        </main>
    );
}

export default memo(RegisterPage);
