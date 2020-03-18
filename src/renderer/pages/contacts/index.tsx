import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ContactsGroups } from 'components';
import { RootState } from 'reducers';
import { fetchFriends } from 'reducers/friend';
import { setIsFirstEnterContactsPage } from 'reducers/status';

import AddFriendSubPage from '../addFriend';
import './style.scss';

export default function ContactsPage() {
    const dispatch = useDispatch();
    const isFirstEnterContactsPage = useSelector(
        (state: RootState) => state.status.isFirstEnterContactsPage,
    );

    useEffect(() => {
        if (isFirstEnterContactsPage) {
            dispatch(fetchFriends());
            dispatch(setIsFirstEnterContactsPage(false));
        }
    }, [isFirstEnterContactsPage, dispatch]);

    return (
        <main className="contacts-page">
            <ContactsGroups />
            <Switch>
                <Route path="/contacts/addFriend" component={AddFriendSubPage} />
            </Switch>
        </main>
    );
}
