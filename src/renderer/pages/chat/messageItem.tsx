import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Avatar } from 'antd';

import { BASE_URL } from 'utils/constants';

interface MessageItemProps {
    name: string;
    avatar?: string;
    content: string;
    right?: boolean;
}

export default function MessageItem({ avatar, name, content, right }: MessageItemProps) {
    const messageItemClassName = useMemo(
        () =>
            classNames('message-item', {
                'message-item-left': !right,
                'message-item-right': right,
            }),
        [right],
    );

    return (
        <div className={messageItemClassName}>
            {!right && <Avatar src={avatar} />}
            <div className="bubble-container">
                <span>{name}</span>
                <div className="bubble">{content}</div>
            </div>
            {right && <Avatar src={`${BASE_URL}${avatar}`} />}
        </div>
    );
}
