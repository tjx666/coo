import * as React from 'react';
import { Avatar } from 'antd';
import classNames from 'classnames';

interface MessageItemProps {
    current: boolean;
    avatarSrc: string;
    name: string;
    digest: string;
}

/**
 * 会话项组件
 */
export default function SessionItem({ current, avatarSrc, name, digest }: MessageItemProps) {
    const className = classNames('session-item', { 'session-item-current': current });

    return (
        <div className={className}>
            <Avatar className="avatar" src={avatarSrc} />
            <div className="item-right">
                <span className="name">{name}</span>
                <span className="digest">{digest}</span>
            </div>
        </div>
    );
}
