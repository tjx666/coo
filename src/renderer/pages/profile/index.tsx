import * as React from 'react';
import { Avatar } from 'antd';
import avatarPath from 'assets/images/avatar.jpg';

import './style.scss';

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <Avatar className="profile-avatar" src={avatarPath} size={60} />
        </div>
    );
}
