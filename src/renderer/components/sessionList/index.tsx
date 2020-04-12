import React, { useCallback, memo } from 'react';
import { List } from 'antd';

import { Session } from 'reducers/session';

import SessionItem from './sessionItem';
import './style.scss';

interface SessionListProps {
    sessions: Session[];
    activeItemId: string | undefined;
}

/**
 * 显示所有会话信息的列表组件
 */
function SessionList({ sessions, activeItemId }: SessionListProps) {
    const renderItem = useCallback(
        (item: Session) => {
            return <SessionItem session={item} active={item.id === activeItemId} />;
        },
        [activeItemId],
    );

    return (
        <List
            className="session-list"
            dataSource={sessions}
            renderItem={renderItem}
            locale={{ emptyText: '暂时无会话' }}
        />
    );
}

export default memo(SessionList);
