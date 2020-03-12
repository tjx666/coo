import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, List } from 'antd';
import { PlusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';

import { RootState } from 'reducers';
import { setActiveGroupInContactsPage } from 'reducers/status';
import { UserModel } from 'api/user';

import FriendItem from './friendItem';
import './style.scss';

const { Panel } = Collapse;

export default function ContactsGroup() {
    const dispatch = useDispatch();

    const { isLoading, friendList } = useSelector((state: RootState) => state.friends);
    const activeGroupInContactsPage = useSelector(
        (state: RootState) => state.status.activeGroupInContactsPage,
    );
    const [isHover, setIsHover] = useState(false);

    const handleChange = (key: string | string[]) => {
        if (Array.isArray(key)) {
            dispatch(setActiveGroupInContactsPage(key));
        }
    };

    return (
        <Collapse
            className="contacts-group"
            activeKey={activeGroupInContactsPage}
            onChange={handleChange}
        >
            <Panel header="好友" key="friends">
                <List
                    loading={isLoading}
                    dataSource={friendList}
                    renderItem={(friend: UserModel) => <FriendItem friend={friend} />}
                    locale={{ emptyText: '你还没有好友哦，点击最下方的按钮加好友吧！' }}
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
