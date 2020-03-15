import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

import { RootState } from 'reducers';

interface NavbarAvatarProps {
    onClick?: () => void;
}

export default function NavbarAvatar({ onClick }: NavbarAvatarProps) {
    const avatar = useSelector((state: RootState) => state.user.avatar);

    return (
        <Link className="navbar-avatar-link" to="/profile" onClick={onClick}>
            <div className="avatar-wrapper">
                <Avatar className="navbar-avatar" src={avatar} size={34} />
            </div>
        </Link>
    );
}
