import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Avatar } from 'antd';
import dayjs from 'dayjs';

import { setCurrentSession, Session } from 'reducers/session';
import { ASSETS_BASE_URL } from 'utils/constants';

interface SessionItemProps {
    session: Session;
    active: boolean;
}

/**
 * 会话项组件
 */
function SessionItem({ session, active }: SessionItemProps) {
    const dispatch = useDispatch();

    const history = useHistory();
    const { id, name, avatar, latestMessage, situation, updatedAt } = session;
    const className = classNames('session-item', { 'session-item-current': active });

    const openSession = useCallback(() => {
        dispatch(setCurrentSession({ id, situation }));
        if (window.location.pathname !== '/message/chat') history.push(`/message/chat`);
    }, [dispatch, history, id, situation]);

    return (
        <div className={className} onClick={openSession}>
            <Avatar className="avatar" src={`${ASSETS_BASE_URL}${avatar}`} size={32} />
            <div className="session-item-preview">
                <div className="preview-header">
                    <div className="preview-header-name">
                        <p className="preview-header-name-text">{name}</p>
                    </div>
                    <p className="preview-header-time">
                        {dayjs(new Date(updatedAt)).format('YY-MM')}
                    </p>
                </div>
                <div className="preview-digest">
                    <span className="digest">{latestMessage}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(SessionItem);
