import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import avatarPath from 'assets/images/avatar.jpg';

interface SidebarAvatarProps {
    onClick: (event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export default function SidebarAvatar({ onClick }: SidebarAvatarProps) {
    const handleClick = () => {
        onClick();
    };

    return (
        <Link className="sidebar-avatar-link" to="/login" onClick={handleClick}>
            <div className="avatar-wrapper">
                <Avatar className="sidebar-avatar" src={avatarPath} size={34} />
            </div>
        </Link>
    );
}
