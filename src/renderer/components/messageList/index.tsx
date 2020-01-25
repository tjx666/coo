import * as React from 'react';
import { List } from 'antd';
import faker from 'faker';
import RSC from 'react-scrollbars-custom';

import MessageItem from './messageItem';
import './style.scss';

export default function MessageList() {
    const fakerData = [...Array(30)].map((_, index) => ({
        current: index === 2,
        avatarSrc: faker.image.avatar(),
        name: faker.name.findName(),
        digest: '在吗？',
    }));

    const renderItem = (item: any) => {
        return <MessageItem {...item} />;
    };

    return (
        <RSC
            noScrollX
            style={{
                width: 290,
                height: '100vh',
                borderRight: '2px solid rgb(222, 224, 227)',
                boxSizing: 'content-box',
            }}
            wrapperProps={{
                style: {
                    minWidth: 282,
                },
            }}
            trackYProps={{
                style: {
                    top: 0,
                    width: 8,
                    height: '100%',
                    borderRadius: 0,
                    backgroundColor: 'white',
                },
            }}
            thumbYProps={{
                style: {
                    backgroundColor: 'rgb(221, 223, 225)',
                },
            }}
        >
            <List className="message-list" dataSource={fakerData} renderItem={renderItem} />
        </RSC>
    );
}
