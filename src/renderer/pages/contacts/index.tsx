import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ContactsGroups } from 'components';
import { RootState } from 'reducers';
import { fetchFriends } from 'reducers/friends';
import './style.scss';

export default function ContactsPage() {
    const dispatch = useDispatch();

    const { friendList } = useSelector((state: RootState) => state.friends);

    useEffect(() => {
        if (friendList.length === 0) {
            dispatch(fetchFriends());
        }
    }, [friendList, dispatch]);

    return (
        <main className="contacts-page">
            <ContactsGroups />
        </main>
    );
}
