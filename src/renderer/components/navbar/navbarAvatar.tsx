import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL } from 'utils/constants';

interface NavbarAvatarProps {
    avatar: string;
    onClick?: () => void;
}

export default function NavbarAvatar({ avatar, onClick }: NavbarAvatarProps) {
    return (
        <Link className="navbar-avatar-link" to="/profile" onClick={onClick}>
            <div className="avatar-wrapper">
                <Avatar className="navbar-avatar" src={`${ASSETS_BASE_URL}${avatar}`} size={34} />
            </div>
        </Link>
    );
}
