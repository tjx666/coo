import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';

interface NavbarAvatarProps {
    src: string;
    onClick?: () => void;
}

function NavbarAvatar({ src, onClick }: NavbarAvatarProps) {
    return (
        <Link className="navbar-avatar-link" to="/profile" onClick={onClick}>
            <div className="avatar-wrapper">
                <Avatar
                    className="navbar-avatar"
                    src={src ? `${ASSETS_BASE_URL}${src}` : DEFAULT_AVATAR}
                    size={36}
                />
            </div>
        </Link>
    );
}

export default memo(NavbarAvatar);
