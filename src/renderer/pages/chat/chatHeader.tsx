import React from 'react';
import { Avatar } from 'antd';

import { BASE_URL } from 'utils/constants';

interface MessageBoxHeaderProps {
    name: string;
    avatar: string | undefined;
}

export default function ChatHeader({ name, avatar }: MessageBoxHeaderProps) {
    return (
        <div className="chat-header">
            <Avatar src={`${BASE_URL}${avatar}`} size="large" />
            <h3 className="name">{name}</h3>
        </div>
    );
}
