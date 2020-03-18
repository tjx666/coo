import React from 'react';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';

interface MessageBoxHeaderProps {
    name: string;
    avatar: string | undefined;
}

export default function ChatHeader({ name, avatar }: MessageBoxHeaderProps) {
    return (
        <div className="chat-header">
            <Avatar src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR} size="large" />
            <h3 className="name">{name}</h3>
        </div>
    );
}
