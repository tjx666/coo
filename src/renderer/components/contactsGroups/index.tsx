import React from 'react';
import { useSelector } from 'react-redux';
import { Collapse, List } from 'antd';
import { RootState } from 'reducers';

import FriendItem from './friendItem';
import './style.scss';

const { Panel } = Collapse;

export default function ContactsGroup() {
    const { isLoading, friendList } = useSelector((state: RootState) => state.friends);

    return (
        <Collapse className="contacts-group">
            <Panel header="好友" key="1">
                <List
                    loading={isLoading}
                    dataSource={friendList}
                    renderItem={friend => {
                        return <FriendItem friend={friend} />;
                    }}
                />
            </Panel>
        </Collapse>
    );
}
