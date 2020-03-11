import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ContactsGroups } from 'components';
import { fetchFriends } from 'reducers/friends';

import AddFriendSubPage from '../addFriend';
import './style.scss';

export default function ContactsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    return (
        <main className="contacts-page">
            <ContactsGroups />
            <Switch>
                <Route to="/contacts/addFriend" component={AddFriendSubPage} />
            </Switch>
        </main>
    );
}
