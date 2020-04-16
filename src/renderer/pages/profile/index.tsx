import React, { memo } from 'react';

import ProfileForm from './profileForm';
import './style.scss';

function ProfilePage() {
    return (
        <div className="profile-page">
            <span className="title">个人信息</span>
            <ProfileForm />
        </div>
    );
}

export default memo(ProfilePage);
