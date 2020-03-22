import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, List } from 'antd';
import { PlusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import { useLocation } from 'react-use';

import { RootState } from 'reducers';
import { setActiveGroupsInContactsPage } from 'reducers/status';
import { UserModel } from 'api/user';

import FriendItem from './friendItem';
import './style.scss';

const { Panel } = Collapse;

export default function ContactsGroup() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { isLoading, friendList } = useSelector((state: RootState) => state.friend);
    const activeGroupInContactsPage = useSelector(
        (state: RootState) => state.status.activeGroupsInContactsPage,
    );
    const [isHover, setIsHover] = useState(false);

    const handleChange = (key: string | string[]) => {
        if (Array.isArray(key)) {
            dispatch(setActiveGroupsInContactsPage(key));
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
                    to={
                        location.pathname === '/contacts/addFriend'
                            ? '/contacts'
                            : '/contacts/addFriend'
                    }
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover ? <PlusCircleFilled /> : <PlusCircleOutlined />}
                </Link>
            </div>
        </Collapse>
    );
}
