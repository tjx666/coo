import * as React from 'react';
import { Navbar } from 'components';
import { Avatar } from 'antd';
import avatarPath from 'assets/images/avatar.jpg';

import './style.scss';

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <Navbar />
            <main className="profile">
                <Avatar className="profile-avatar" src={avatarPath} size={60} />
            </main>
        </div>
    );
}
