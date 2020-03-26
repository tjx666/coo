import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, message } from 'antd';

import api from 'api';
import { SearchUserResponseData } from 'api/user';
import { fetchFriends } from 'reducers/friend';
import { removePrivateSession } from 'reducers/session';
import { UserModel } from 'typings/coo';
import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';
import storage from 'utils/storage';

interface SearchFriendResultProps {
    searchStatus: 'initial' | 'success' | 'error';
    searchResult: SearchUserResponseData | undefined;
    friends: UserModel[];
}

export default function SearchFriendResult({
    searchStatus,
    searchResult,
    friends,
}: SearchFriendResultProps) {
    const dispatch = useDispatch();

    const applyForFriend = useCallback(
        async (friendId: string) => {
            try {
                await api('applyForFriend', {
                    pathParams: { id: storage.get('id') },
                    data: {
                        id: friendId,
                    },
                });
            } catch (error) {
                message.error('申请好友的请求失败！');
                console.error(error);
                return;
            }

            dispatch(fetchFriends());
        },
        [dispatch],
    );

    const removeFriend = useCallback(
        async (friendId: string) => {
            try {
                await api('removeFriend', {
                    pathParams: { id: storage.get('id') },
                    data: {
                        id: friendId,
                    },
                });
            } catch (error) {
                message.error('删除好友的请求失败！');
                console.error(error);
                return;
            }

            dispatch(removePrivateSession(friendId));
            dispatch(fetchFriends());
        },
        [dispatch],
    );

    if (searchStatus === 'success') {
        if (searchResult!.existed) {
            const { id, name, avatar } = searchResult!.user as UserModel;
            const isFriend = friends.some((friend) => friend.id === id);
            return (
                <div className="search-result user-info">
                    <span className="name">{name}</span>
                    <Avatar
                        size={48}
                        src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
                    />
                    {id !== storage.get('id') &&
                        (isFriend ? (
                            <span
                                className="operation"
                                style={{ color: 'red' }}
                                onClick={() => removeFriend(id)}
                            >
                                删除好友
                            </span>
                        ) : (
                            <span
                                className="operation"
                                style={{ color: window.theme.primaryColor }}
                                onClick={() => applyForFriend(id)}
                            >
                                加为好友
                            </span>
                        ))}
                </div>
            );
        }

        return <span className="search-result-text">未搜索到该用户</span>;
    }

    return <span className="search-result-text">{searchStatus === 'error' && '请求出错'}</span>;
}
