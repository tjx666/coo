import React from 'react';
import { Avatar } from 'antd';

interface MessageBoxHeaderProps {
    name: string;
    avatar: string | undefined;
}

export default function ChatHeader({ name, avatar }: MessageBoxHeaderProps) {
    return (
        <div className="chat-header">
            <Avatar src={avatar} size="large" />
            <h3 className="name">{name}</h3>
        </div>
    );
}
