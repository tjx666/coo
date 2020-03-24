import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Avatar, message, Select } from 'antd';
import debounce from 'lodash/debounce';

import api, { Response } from 'api';
import { SearchUserResponse } from 'api/user';
import { RootState } from 'reducers';
import { fetchFriends } from 'reducers/friend';
import { ASSETS_BASE_URL, DEFAULT_AVATAR } from 'utils/constants';
import storage from 'utils/storage';
import { UserModel } from 'typings/coo';

import './style.scss';

const { Search } = Input;
const { Option } = Select;

export default function AddContactsSubPage() {
    const dispatch = useDispatch();

    const friends = useSelector((state: RootState) => state.friend.friendList);
    const [searchStatus, setSearchStatus] = useState<'initial' | 'success' | 'error'>('initial');
    const [searchResult, setSearchResult] = useState<UserModel | Object>({});
    const [type, setType] = useState<'friend' | 'group'>('friend');

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
                const isFriend = friends.some((friend) => friend.id === id);
                return (
                    <div className="user-info">
                        <span className="name">{name}</span>
                        <Avatar
                            size={48}
                            src={avatar ? `${ASSETS_BASE_URL}${avatar}` : DEFAULT_AVATAR}
                        />
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
        <div className="add-contacts-sub-page">
            <Input.Group className="search-box" compact>
                <Select style={{ width: '20%' }} value={type} onChange={(value) => setType(value)}>
                    <Option value="friend">好友</Option>
                    <Option value="group">群</Option>
                </Select>
                <Search
                    style={{ width: '80%' }}
                    placeholder={type === 'friend' ? '请输入用户邮箱' : '请输入群 id'}
                    enterButton
                    onSearch={debounce(handleSearch, 200)}
                />
            </Input.Group>
            {result}
        </div>
    );
}
