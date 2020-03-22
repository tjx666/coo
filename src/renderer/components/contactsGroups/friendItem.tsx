import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { List, Avatar } from 'antd';

import { UserModel } from 'api/user';
import { addSession, Session, MessageSituation } from 'reducers/session';
import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';

const { Item: ListItem } = List;

interface ContactItemProps {
    friend: UserModel;
}

export default function FriendItem({ friend: userModel }: ContactItemProps) {
    const { id, avatar, name } = userModel;

    const history = useHistory();
    const dispatch = useDispatch();

    const jumpToChat = useCallback(() => {
        history.push(`/message/chat`);
        const newSession: Session = {
            id,
            name,
            avatar,
            situation: MessageSituation.PRIVATE,
            digest: '',
            updatedAt: Date.now(),
        };
        dispatch(addSession(newSession));
    }, [avatar, dispatch, history, id, name]);

    return (
        <ListItem className="friend-item" onClick={jumpToChat}>
            <Avatar
                className="friend-item-avatar"
                src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
            />
            {name}
        </ListItem>
    );
}
