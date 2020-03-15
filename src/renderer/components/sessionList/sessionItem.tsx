import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Avatar } from 'antd';

import { RootState } from 'reducers';
import { setCurrentSession, Session } from 'reducers/sessions';

interface SessionItemProps {
    session: Session;
}

/**
 * 会话项组件
 */
export default function SessionItem({ session }: SessionItemProps) {
    const dispatch = useDispatch();
    const currentSession = useSelector((state: RootState) => state.sessions.currentSession);

    const { id, name, avatar, digest } = session;
    const className = classNames('session-item', {
        'session-item-current': id === currentSession?.id,
    });

    const openSession = useCallback(() => {
        dispatch(setCurrentSession(id));
    }, [dispatch, id]);

    return (
        <div className={className} onClick={openSession}>
            <Avatar className="avatar" src={avatar} />
            <div className="session-item-main">
                <span className="name">{name}</span>
                <span className="digest">{digest}</span>
            </div>
        </div>
    );
}
