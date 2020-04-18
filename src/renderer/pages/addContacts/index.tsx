import React, { memo, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, message, Select } from 'antd';
import debounce from 'lodash/debounce';

import api, { Response } from 'api';
import { SearchUserResponse, SearchUserResponseData } from 'api/user';
import { SearchGroupResponse, SearchGroupResponseData } from 'api/group';
import { RootState } from 'reducers';
import { fetchFriends } from 'reducers/friend';
import { fetchGroups } from 'reducers/group';
import { removeGroupSession, removePrivateSession } from 'reducers/session';
import { GroupModel } from 'typings/coo';

import SearchUserResult from './searchUserResult';
import SearchGroupResult from './searchGroupResult';
import { SearchStatus } from './types';
import './style.scss';

const { Search } = Input;
const { Option } = Select;

export type SearchType = 'friend' | 'group';

function AddContactsSubPage() {
    const dispatch = useDispatch();

    const friends = useSelector((state: RootState) => state.friend.friendList);
    const joinedGroups = useSelector((state: RootState) => state.group.groupList);

    const [searchStatus, setSearchStatus] = useState<SearchStatus>('initial');
    const [searchType, setSearchType] = useState<SearchType>('friend');
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchUserResult, setSearchUserResult] = useState<SearchUserResponseData>();
    const [searchGroupResult, setSearchGroupResult] = useState<SearchGroupResponseData>();

    const handleChangeSearchType = useCallback((value) => {
        setSearchType(value);
        setSearchStatus('initial');
        setSearchValue('');
    }, []);

    const handleChangeSearchValue = useCallback((event) => setSearchValue(event.target.value), []);

    const searchFriend = useCallback(async (value: string) => {
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
    }, []);

    const searchGroup = useCallback(async (value: string) => {
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
    }, []);

    const handleSearch = useMemo(
        () =>
            debounce(
                async (value: string) =>
                    searchType === 'friend' ? searchFriend(value) : searchGroup(value),
                200,
            ),
        [searchFriend, searchGroup, searchType],
    );

    const handleApplyForFriendSuccess = useCallback(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    const handleRemoveFriendSuccess = useCallback(
        (friendId: string) => {
            dispatch(fetchFriends());
            dispatch(removePrivateSession(friendId));
        },
        [dispatch],
    );

    const handleDisbandGroupSuccess = useCallback(
        (groupId: string) => {
            setSearchStatus('initial');
            setSearchGroupResult(undefined);
            dispatch(fetchGroups());
            dispatch(removeGroupSession(groupId));
        },
        [dispatch],
    );

    const handleApplyForGroupSuccess = useCallback(() => {
        const result = searchGroupResult!;
        setSearchGroupResult({
            ...result,
            group: {
                ...result.group,
                count: (result.group as GroupModel).count + 1,
            },
        });
        dispatch(fetchGroups());
    }, [dispatch, searchGroupResult]);

    const handleExitGroupSuccess = useCallback(
        (groupId: string) => {
            const result = searchGroupResult!;
            setSearchGroupResult({
                ...result,
                group: {
                    ...result.group,
                    count: (result.group as GroupModel).count - 1,
                },
            });
            dispatch(fetchGroups());
            dispatch(removeGroupSession(groupId));
        },
        [dispatch, searchGroupResult],
    );

    const searchResult = useMemo(
        () =>
            searchType === 'friend' ? (
                <SearchUserResult
                    searchResult={searchUserResult}
                    searchStatus={searchStatus}
                    friends={friends}
                    onApplyForFriendSuccess={handleApplyForFriendSuccess}
                    onRemoveFriendSuccess={handleRemoveFriendSuccess}
                />
            ) : (
                <SearchGroupResult
                    searchStatus={searchStatus}
                    searchResult={searchGroupResult}
                    joinedGroups={joinedGroups}
                    onDisbandGroupSuccess={handleDisbandGroupSuccess}
                    onApplyForGroupSuccess={handleApplyForGroupSuccess}
                    onExitGroupSuccess={handleExitGroupSuccess}
                />
            ),
        [
            handleApplyForFriendSuccess,
            handleApplyForGroupSuccess,
            handleDisbandGroupSuccess,
            handleExitGroupSuccess,
            handleRemoveFriendSuccess,
            friends,
            joinedGroups,
            searchGroupResult,
            searchStatus,
            searchType,
            searchUserResult,
        ],
    );

    return (
        <div className="add-contacts-sub-page">
            <Input.Group className="search-box" compact>
                <Select value={searchType} onChange={handleChangeSearchType}>
                    <Option value="friend">好友</Option>
                    <Option value="group">群</Option>
                </Select>
                <Search
                    value={searchValue}
                    placeholder={searchType === 'friend' ? '请输入用户邮箱' : '请输入群 id'}
                    enterButton
                    onChange={handleChangeSearchValue}
                    onSearch={handleSearch}
                />
            </Input.Group>
            {searchResult}
        </div>
    );
}

export default memo(AddContactsSubPage);
