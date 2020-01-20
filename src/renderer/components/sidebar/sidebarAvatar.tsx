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
        <Link className="sidebar-avatar" to="/login" onClick={handleClick}>
            <Avatar src={avatarPath} size={34} />
        </Link>
    );
}
