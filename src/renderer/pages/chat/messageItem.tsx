import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Avatar } from 'antd';

import { ASSETS_BASE_URL } from 'utils/constants';

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
    const avatar = useMemo(() => <Avatar src={`${ASSETS_BASE_URL}${avatarPath}`} />, [avatarPath]);

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
