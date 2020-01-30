import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import avatarPath from 'assets/images/avatar.jpg';

interface NavbarAvatarProps {
    onClick: (event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export default function NavbarAvatar({ onClick }: NavbarAvatarProps) {
    const handleClick = () => {
        onClick();
    };

    return (
        <Link className="navbar-avatar-link" to="/login" onClick={handleClick}>
            <div className="avatar-wrapper">
                <Avatar className="navbar-avatar" src={avatarPath} size={34} />
            </div>
        </Link>
    );
}
