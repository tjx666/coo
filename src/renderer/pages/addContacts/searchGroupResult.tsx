import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, message } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import api from 'api';
import { SearchGroupResponseData, ApplyForGroupResponse } from 'api/group';
import { GroupModel } from 'typings/coo';
import { fetchGroups } from 'reducers/group';
import { removeGroupSession } from 'reducers/session';
import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';
import storage from 'utils/storage';

interface SearchGroupResultProps {
    searchStatus: 'initial' | 'success' | 'error';
    searchResult: SearchGroupResponseData | undefined;
    joinedGroups: GroupModel[];
    onDisbandGroup: () => void;
}

export default function SearchGroupResult({
    searchStatus,
    searchResult,
    joinedGroups,
    onDisbandGroup,
}: SearchGroupResultProps) {
    const dispatch = useDispatch();

    const applyForGroup = async () => {
        try {
            await api<ApplyForGroupResponse>('applyForGroup', {
                data: {
                    userId: storage.get('id'),
                    groupId: (searchResult!.group as GroupModel).id,
                },
            });
        } catch (error) {
            console.error(error);
            message.error('申请加群失败！');
        }

        dispatch(fetchGroups());
    };

    const exitGroup = async () => {
        try {
            await api<ApplyForGroupResponse>('exitGroup', {
                data: {
                    userId: storage.get('id'),
                    groupId: (searchResult!.group as GroupModel).id,
                },
            });
        } catch (error) {
            console.error(error);
            message.error('退群失败！');
        }

        dispatch(fetchGroups());
    };

    const disbandGroup = async () => {
        const groupId = (searchResult!.group as GroupModel).id;
        try {
            await api<ApplyForGroupResponse>('disbandGroup', {
                data: {
                    master: storage.get('id'),
                    groupId,
                },
            });
        } catch (error) {
            console.error(error);
            message.error('解散失败！');
        }

        onDisbandGroup();
        dispatch(removeGroupSession(groupId));
        dispatch(fetchGroups());
    };

    if (searchStatus === 'success') {
        if (searchResult!.existed) {
            const { id, master, name, avatar, count } = searchResult!.group as GroupModel;
            const joined = joinedGroups.some((group) => group.id === id);
            return (
                <div className="search-result group-info">
                    <span className="name">{name}</span>
                    <Avatar
                        size={48}
                        src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
                    />
                    <span className="count">
                        <TeamOutlined className="count-icon" />
                        {count}
                    </span>
                    {(() => {
                        if (master === storage.get('id')) {
                            return (
                                <span
                                    className="operation"
                                    style={{ color: 'red' }}
                                    onClick={disbandGroup}
                                >
                                    解散该群
                                </span>
                            );
                        }

                        if (joined) {
                            return (
                                <span
                                    className="operation"
                                    style={{ color: 'red' }}
                                    onClick={exitGroup}
                                >
                                    退出该群
                                </span>
                            );
                        }

                        return (
                            <span
                                className="operation"
                                style={{ color: window.theme.primaryColor }}
                                onClick={applyForGroup}
                            >
                                加入该群
                            </span>
                        );
                    })()}
                </div>
            );
        }

        return <span className="search-result-text">未搜索到该群</span>;
    }

    return <span className="search-result-text">{searchStatus === 'error' && '请求出错'}</span>;
}
