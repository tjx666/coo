import * as React from 'react';
import { List } from 'antd';
import faker from 'faker';

import SessionItem from './sessionItem';
import './style.scss';

/**
 * 显示所有会话信息的列表组件
 */
export default function SessionList() {
    const fakerData = [...new Array(16)].map((_, index) => ({
        current: index === 2,
        avatarSrc: faker.image.avatar(),
        name: faker.name.findName(),
        digest: '在吗？',
    }));

    const renderItem = (item: any) => {
        return <SessionItem {...item} />;
    };

    return <List className="session-list" dataSource={fakerData} renderItem={renderItem} />;
}
