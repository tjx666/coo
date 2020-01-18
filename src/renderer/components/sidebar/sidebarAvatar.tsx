import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'lib';

import avatarPath from 'assets/images/avatar.jpg';

interface SidebarAvatarProps {
    onClick: (event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export default function SidebarAvatar({ onClick }: SidebarAvatarProps) {
    const handleClick = () => {
        onClick();
    };

    return (
        <Link to="/login">
            <Avatar src={avatarPath} size={34} onClick={handleClick} />
        </Link>
    );
}
