import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';

interface NavbarAvatarProps {
    avatar: string;
    onClick?: () => void;
}

export default function NavbarAvatar({ avatar, onClick }: NavbarAvatarProps) {
    return (
        <Link className="navbar-avatar-link" to="/profile" onClick={onClick}>
            <div className="avatar-wrapper">
                <Avatar
                    className="navbar-avatar"
                    src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
                    size={36}
                />
            </div>
        </Link>
    );
}
