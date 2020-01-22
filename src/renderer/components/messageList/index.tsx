import * as React from 'react';
import { List } from 'antd';
import faker from 'faker';
import { AutoHideScrollbar } from 'lib';

import MessageItem from './messageItem';
import './style.scss';

export default function MessageList() {
    const fakerData = [...Array(20)].map((_, index) => ({
        current: index === 2,
        avatarSrc: faker.image.avatar(),
        name: faker.name.findName(),
        digest: '在吗？',
    }));

    const renderItem = (item: any) => {
        return <MessageItem {...item} />;
    };

    return (
        <AutoHideScrollbar
            autoHide
            noScrollX
            style={{
                width: 290,
                height: '100vh',
            }}
            trackYProps={{
                style: {
                    backgroundColor: 'white',
                },
            }}
            thumbYProps={{
                style: {
                    width: 8,
                    backgroundColor: 'rgb(221, 223, 225)',
                },
            }}
        >
            <List className="message-list" dataSource={fakerData} renderItem={renderItem} />
        </AutoHideScrollbar>
    );
}
