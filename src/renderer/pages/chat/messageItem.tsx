import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';

interface MessageItemProps {
    name: string;
    avatar?: string;
    content: string;
    right?: boolean;
}

const MessageItem = ({ avatar: avatarPath, name, content, right }: MessageItemProps) => {
    const messageItemClassName = useMemo(
        () =>
            classNames('message-item', {
                'message-item-left': !right,
                'message-item-right': right,
            }),
        [right],
    );
    const avatar = useMemo(
        () => <Avatar src={avatarPath ? `${ASSETS_BASE_URL}${avatarPath}` : DEFAULT_AVATAR} />,
        [avatarPath],
    );

    return (
        <div className={messageItemClassName}>
            {!right && avatar}
            <div className="bubble-container">
                <span>{name}</span>
                <div className="bubble">{content}</div>
            </div>
            {right && avatar}
        </div>
    );
};

export default memo(MessageItem);
