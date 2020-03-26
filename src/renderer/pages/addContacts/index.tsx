import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, message, Select } from 'antd';
import debounce from 'lodash/debounce';

import api, { Response } from 'api';
import { SearchUserResponse, SearchUserResponseData } from 'api/user';
import { SearchGroupResponse, SearchGroupResponseData } from 'api/group';
import { RootState } from 'reducers';

import SearchUserResult from './searchUserResult';
import SearchGroupResult from './searchGroupResult';
import './style.scss';

const { Search } = Input;
const { Option } = Select;

export default function AddContactsSubPage() {
    const friends = useSelector((state: RootState) => state.friend.friendList);
    const joinedGroups = useSelector((state: RootState) => state.group.groupList);

    const [searchStatus, setSearchStatus] = useState<'initial' | 'success' | 'error'>('initial');
    const [type, setType] = useState<'friend' | 'group'>('friend');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchUserResult, setSearchUserResult] = useState<SearchUserResponseData>();
    const [searchGroupResult, setSearchGroupResult] = useState<SearchGroupResponseData>();

    const searchFriend = async (value: string) => {
        let resp: Response<SearchUserResponse> | undefined;
        try {
            resp = await api('searchUser', { data: { email: value } });
        } catch (error) {
            console.error(error);
            setSearchStatus('error');
            message.error('请求出错！');
            return;
        }
        const user = resp?.data?.data;
        setSearchUserResult(user);
        setSearchStatus('success');
    };

    const searchGroup = async (value: string) => {
        let resp: Response<SearchGroupResponse> | undefined;
        try {
            resp = await api<SearchGroupResponse>('searchGroup', { data: { master: value } });
        } catch (error) {
            console.error(error);
            setSearchStatus('error');
            message.error('请求出错！');
            return;
        }
        const result = resp?.data?.data;
        setSearchGroupResult(result);
        setSearchStatus('success');
    };

    const handleSearch = async (value: string) => {
        if (type === 'friend') {
            searchFriend(value);
        } else {
            searchGroup(value);
        }
    };

    return (
        <div className="add-contacts-sub-page">
            <Input.Group className="search-box" compact>
                <Select
                    style={{ width: '20%' }}
                    value={type}
                    onChange={(value) => {
                        setType(value);
                        setSearchStatus('initial');
                        setSearchValue('');
                    }}
                >
                    <Option value="friend">好友</Option>
                    <Option value="group">群</Option>
                </Select>
                <Search
                    value={searchValue}
                    style={{ width: '80%' }}
                    placeholder={type === 'friend' ? '请输入用户邮箱' : '请输入群 id'}
                    enterButton
                    onChange={(event) => setSearchValue(event.target.value)}
                    onSearch={debounce(handleSearch, 200)}
                />
            </Input.Group>
            {type === 'friend' ? (
                <SearchUserResult
                    searchResult={searchUserResult}
                    searchStatus={searchStatus}
                    friends={friends}
                />
            ) : (
                <SearchGroupResult
                    searchStatus={searchStatus}
                    searchResult={searchGroupResult}
                    joinedGroups={joinedGroups}
                    onDisbandGroup={() => {
                        setSearchStatus('initial');
                        setSearchGroupResult(undefined);
                    }}
                />
            )}
        </div>
    );
}
