import React, { memo } from 'react';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';

interface MessageBoxHeaderProps {
    id: string;
    name: string;
    avatar: string | undefined;
}

function ChatHeader({ id, name, avatar }: MessageBoxHeaderProps) {
    return (
        <div className="chat-header">
            <Avatar src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR} size="large" />
            <div className="info-container">
                <h3 className="name">{name}</h3>
                <span className="id">{id}</span>
            </div>
        </div>
    );
}

export default memo(ChatHeader);
