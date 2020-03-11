import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Collapse, List } from 'antd';
import { PlusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import { RootState } from 'reducers';

import FriendItem from './friendItem';
import './style.scss';

const { Panel } = Collapse;

export default function ContactsGroup() {
    const { isLoading, friendList } = useSelector((state: RootState) => state.friends);
    const [isHover, setIsHover] = useState(false);

    return (
        <Collapse className="contacts-group">
            <Panel header="好友" key="1">
                <List
                    loading={isLoading}
                    dataSource={friendList}
                    renderItem={friend => {
                        return <FriendItem friend={friend} />;
                    }}
                    locale={{
                        emptyText: '你还没有好友哦，点击最下方的按钮加好友吧！',
                    }}
                />
            </Panel>
            <div className="add-friend-button">
                <Link
                    to="/contacts/add"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover ? <PlusCircleFilled /> : <PlusCircleOutlined />}
                </Link>
            </div>
        </Collapse>
    );
}
