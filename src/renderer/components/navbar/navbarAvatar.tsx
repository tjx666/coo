import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import avatarPath from 'assets/images/avatar.jpg';

export default function NavbarAvatar() {
    return (
        <Link className="navbar-avatar-link" to="/profile">
            <div className="avatar-wrapper">
                <Avatar className="navbar-avatar" src={avatarPath} size={34} />
            </div>
        </Link>
    );
}
