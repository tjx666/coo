import React, { memo } from 'react';

import ProfileForm from './profileForm';
import './style.scss';

function ProfilePage() {
    return (
        <div className="profile-page">
            <h2 className="title">个人信息</h2>
            <ProfileForm />
        </div>
    );
}

export default memo(ProfilePage);
