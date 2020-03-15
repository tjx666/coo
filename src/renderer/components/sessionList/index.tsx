import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import { RootState } from 'reducers';
import { Session } from 'reducers/sessions';

import SessionItem from './sessionItem';
import './style.scss';

/**
 * 显示所有会话信息的列表组件
 */
export default function SessionList() {
    const sessionList = useSelector((state: RootState) => state.sessions.sessionList);

    const renderItem = useCallback((item: Session) => {
        return <SessionItem session={item} />;
    }, []);

    return (
        <List
            className="session-list"
            dataSource={sessionList.map(item => item[1])}
            renderItem={renderItem}
            locale={{ emptyText: '暂时无会话' }}
        />
    );
}
