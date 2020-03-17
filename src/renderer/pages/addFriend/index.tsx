import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Avatar, message } from 'antd';

import { RootState } from 'reducers';
import { fetchFriends } from 'reducers/friends';
import api, { Response } from 'api';
import { SearchUserResponse, UserModel } from 'api/user';
import storage from 'utils/storage';
import { ASSETS_BASE_URL } from 'utils/constants';

import './style.scss';

const { Search } = Input;

export default function AddFriendSubPage() {
    const dispatch = useDispatch();

    const friends = useSelector((state: RootState) => state.friends.friendList);
    const [searchStatus, setSearchStatus] = useState<'initial' | 'success' | 'error'>('initial');
    const [searchResult, setSearchResult] = useState<UserModel | Object>({});

    const handleSearch = async (value: string) => {
        let resp: Response<SearchUserResponse> | undefined;
        try {
            resp = await api('searchUser', { params: { email: value } });
        } catch (error) {
            console.error(error);
            setSearchStatus('error');
            message.error('请求出错！');
            return;
        }
        const user = resp.data.data;
        setSearchResult(user);
        setSearchStatus('success');
    };

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

            dispatch(fetchFriends());
        },
        [dispatch],
    );

    const result = useMemo(() => {
        if (searchStatus === 'success') {
            if (Reflect.has(searchResult, 'id')) {
                const { id, name, avatar } = searchResult as UserModel;
                const isFriend = friends.some(friend => friend.id === id);
                return (
                    <div className="user-info">
                        <span className="name">{name}</span>
                        <Avatar size={48} src={`${ASSETS_BASE_URL}${avatar}`} />
                        {id !== storage.get('id') &&
                            (isFriend ? (
                                <span
                                    className="make-friends"
                                    style={{ color: 'red' }}
                                    onClick={() => removeFriend(id)}
                                >
                                    删除好友
                                </span>
                            ) : (
                                <span
                                    className="make-friends"
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
    }, [searchStatus, searchResult, friends, removeFriend, applyForFriend]);

    return (
        <div className="add-friend-sub-page">
            <Search
                className="search-box"
                placeholder="请输入用户邮箱"
                enterButton
                onSearch={handleSearch}
            />
            {result}
        </div>
    );
}
