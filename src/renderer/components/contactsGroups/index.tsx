import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, List, Popover } from 'antd';
import { PlusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';

import { RootState } from 'reducers';
import { setActiveGroupsInContactsPage } from 'reducers/status';
import { UserModel, GroupModel } from 'typings/coo';

import ContactItem from './contactItem';
import OperationsList from './operationsList';
import './style.scss';

const { Panel } = Collapse;

export default function ContactsGroup() {
    const dispatch = useDispatch();

    const isFriendsLoading = useSelector((state: RootState) => state.friend.isLoading);
    const friendList = useSelector((state: RootState) => state.friend.friendList);
    const isGroupsLoading = useSelector((state: RootState) => state.group.isLoading);
    const groupList = useSelector((state: RootState) => state.group.groupList);
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
                    loading={isFriendsLoading}
                    dataSource={friendList}
                    renderItem={(friend: UserModel) => (
                        <ContactItem contact={friend} type="friend" />
                    )}
                    locale={{ emptyText: '你还没有好友哦' }}
                />
            </Panel>
            <Panel header="群组" key="groups">
                <List
                    loading={isGroupsLoading}
                    dataSource={groupList}
                    renderItem={(group: GroupModel) => <ContactItem contact={group} type="group" />}
                    locale={{ emptyText: '你还没有加入任何群哦' }}
                />
            </Panel>
            <div className="add-contact-button">
                <Popover
                    overlayClassName="operations-popover"
                    content={<OperationsList />}
                    onVisibleChange={(visible: boolean) => {
                        setIsHover(visible);
                    }}
                >
                    {isHover ? <PlusCircleFilled /> : <PlusCircleOutlined />}
                </Popover>
            </div>
        </Collapse>
    );
}
