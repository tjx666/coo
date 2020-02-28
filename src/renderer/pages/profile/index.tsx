import * as React from 'react';

import ProfileForm from './profileForm';
import './style.scss';

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <h2 className="title">个人信息</h2>
            <ProfileForm />
        </div>
    );
}
