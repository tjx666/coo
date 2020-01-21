import * as React from 'react';
import LoginForm from './LoginForm';
import './style.scss';

export default function Register() {
    return (
        <div className="login">
            <span className="title">登入</span>
            <LoginForm />
        </div>
    );
}
