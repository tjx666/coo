import React from 'react';
import { List, Avatar } from 'antd';

import { UserModel } from 'api/user';

const { Item: ListItem } = List;

interface ContactItemProps {
    friend: UserModel;
}

export default function FriendItem({ friend: userModel }: ContactItemProps) {
    const { avatar, name } = userModel;
    return (
        <ListItem className="friend-item">
            <Avatar className="friend-item-avatar" src={avatar} />
            {name}
        </ListItem>
    );
}
