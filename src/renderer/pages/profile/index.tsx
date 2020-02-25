import * as React from 'react';
import { Avatar } from 'antd';
import avatarPath from 'assets/images/avatar.jpg';

import EnhancedProfileForm from './profileForm';

import './style.scss';

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <h2 className="title">个人信息</h2>
            <div className="avatar-container">
                <Avatar className="avatar" src={avatarPath} size={60} />
                <div className="edit-overlay">修改</div>
            </div>
            <EnhancedProfileForm />
        </div>
    );
}
