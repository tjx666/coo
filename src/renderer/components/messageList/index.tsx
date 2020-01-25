import * as React from 'react';
import { List } from 'antd';
import faker from 'faker';

import MessageItem from './messageItem';
import './style.scss';

export default function MessageList() {
    const fakerData = [...Array(16)].map((_, index) => ({
        current: index === 2,
        avatarSrc: faker.image.avatar(),
        name: faker.name.findName(),
        digest: '在吗？',
    }));

    const renderItem = (item: any) => {
        return <MessageItem {...item} />;
    };

    return <List className="message-list" dataSource={fakerData} renderItem={renderItem} />;
}
