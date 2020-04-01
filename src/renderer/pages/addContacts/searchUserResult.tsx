import React from 'react';
import { Avatar, message } from 'antd';

import api from 'api';
import { SearchUserResponseData } from 'api/user';
import { UserModel } from 'typings/coo';
import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';
import storage from 'utils/storage';

interface SearchFriendResultProps {
    searchStatus: 'initial' | 'success' | 'error';
    searchResult: SearchUserResponseData | undefined;
    friends: UserModel[];
    onApplyForFriendSuccess: () => void;
    onRemoveFriendSuccess: (friendId: string) => void;
}

export default function SearchFriendResult({
    searchStatus,
    searchResult,
    friends,
    onApplyForFriendSuccess,
    onRemoveFriendSuccess,
}: SearchFriendResultProps) {
    const applyForFriend = async (friendId: string) => {
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

        onApplyForFriendSuccess();
    };

    const removeFriend = async (friendId: string) => {
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

        onRemoveFriendSuccess(friendId);
    };

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
                                style={{ color: window.COO.theme.primaryColor }}
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
