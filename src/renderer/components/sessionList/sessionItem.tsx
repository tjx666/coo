import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Avatar } from 'antd';

import { setCurrentSession, Session } from 'reducers/session';
import { ASSETS_BASE_URL } from 'utils/constants';

interface SessionItemProps {
    session: Session;
    active: boolean;
}

/**
 * 会话项组件
 */
const SessionItem = ({ session, active }: SessionItemProps) => {
    const { id, name, avatar, digest, situation } = session;
    const className = classNames('session-item', { 'session-item-current': active });

    const dispatch = useDispatch();
    const history = useHistory();

    const openSession = useCallback(() => {
        dispatch(setCurrentSession({ id, situation }));
        history.push(`/message/chat`);
    }, [dispatch, history, id, situation]);

    return (
        <div className={className} onClick={openSession}>
            <Avatar className="avatar" src={`${ASSETS_BASE_URL}${avatar}`} />
            <div className="session-item-main">
                <span className="name">{name}</span>
                <span className="digest">{digest}</span>
            </div>
        </div>
    );
};

export default memo(SessionItem);
