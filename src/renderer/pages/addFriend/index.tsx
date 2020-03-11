import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Input, Avatar, message } from 'antd';

import { RootState } from 'reducers';
import api, { Response } from 'api';
import { SearchUserResponse, UserModel } from 'api/user';

import './style.scss';

const { Search } = Input;

export default function AddFriendSubPage() {
    const [searchStatus, setSearchStatus] = useState<'initial' | 'success' | 'error'>('initial');
    // eslint-disable-next-line @typescript-eslint/ban-types
    const [searchResult, setSearchResult] = useState<UserModel | Object>({});
    const friends = useSelector((state: RootState) => state.friends.friendList);

    const handleSearch = async (value: string) => {
        let resp: Response<SearchUserResponse> | undefined;
        try {
            resp = await api('searchUser', { params: { email: value } });
        } catch (error) {
            setSearchStatus('error');
            message.error('请求出错！');
            console.error(error);
            return;
        }
        const user = resp.data.data;
        setSearchResult(user);
        setSearchStatus('success');
    };

    const result = useMemo(() => {
        if (searchStatus === 'success') {
            if (Reflect.has(searchResult, 'id')) {
                const { id, name, avatar } = searchResult as UserModel;
                return (
                    <div className="user-info">
                        <span className="name">{name}</span>
                        <Avatar size={48} src={avatar} />
                        <span className="make-friends">
                            {friends.some(friend => friend.id === id) ? '已经是好友' : '加为好友'}
                        </span>
                    </div>
                );
            }
            return <span className="search-result-text">未搜索到该用户</span>;
        }

        return (
            <span className="search-result-text">
                {searchStatus === 'initial' ? '' : '请求出错'}
            </span>
        );
    }, [searchStatus, searchResult, friends]);

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
