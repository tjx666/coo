import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { List, Avatar } from 'antd';

import { addSession, Session, MessageSituation } from 'reducers/session';
import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';
import { UserModel, GroupModel } from 'typings/coo';

const { Item: ListItem } = List;

interface ContactItemProps {
    contact: UserModel | GroupModel;
    type: 'friend' | 'group';
}

export default function ContactItem({ contact, type }: ContactItemProps) {
    const { id, avatar, name } = contact;

    const history = useHistory();
    const dispatch = useDispatch();

    const jumpToChat = useCallback(() => {
        history.push(`/message/chat`);
        const newSession: Session = {
            id,
            name,
            avatar,
            situation: type === 'friend' ? MessageSituation.PRIVATE : MessageSituation.GROUP,
            latestMessage: '',
            updatedAt: Date.now(),
        };
        dispatch(addSession(newSession));
    }, [avatar, dispatch, history, id, name, type]);

    return (
        <ListItem className="contact-item" onClick={jumpToChat}>
            <Avatar
                className="contact-item-avatar"
                src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
            />
            {name}
        </ListItem>
    );
}
