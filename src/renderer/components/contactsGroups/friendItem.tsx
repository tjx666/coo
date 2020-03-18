import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { List, Avatar } from 'antd';

import { UserModel } from 'api/user';
import { addSession, Session } from 'reducers/session';
import { ASSETS_BASE_URL } from 'utils/constants';

const { Item: ListItem } = List;

interface ContactItemProps {
    friend: UserModel;
}

export default function FriendItem({ friend: userModel }: ContactItemProps) {
    const { id, avatar, name } = userModel;

    const history = useHistory();
    const dispatch = useDispatch();

    const jumpToChat = useCallback(() => {
        history.push(`/message/${id}/chat`);
        const newSession: Session = {
            id,
            name,
            avatar,
        };
        dispatch(addSession(newSession));
    }, [avatar, dispatch, history, id, name]);

    return (
        <ListItem className="friend-item" onClick={jumpToChat}>
            <Avatar className="friend-item-avatar" src={`${ASSETS_BASE_URL}${avatar}`} />
            {name}
        </ListItem>
    );
}
