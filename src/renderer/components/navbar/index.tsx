import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-use';

import { IconFont } from 'lib';
import { RootState } from 'reducers';
import { setLatestPathNameInContactsPage } from 'reducers/status';
import emitter from 'utils/emitter';

import NavbarAvatar from './navbarAvatar';
import NavItem from './navItem';
import './style.scss';

export default function Navbar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { avatar } = useSelector((state: RootState) => state.profile);
    const { currentSession } = useSelector((state: RootState) => state.session);
    const { latestPathNameInContactsPage } = useSelector((state: RootState) => state.status);

    useEffect(() => {
        const handleUrlChange = () => {
            if (location.pathname?.startsWith('/contacts')) {
                dispatch(setLatestPathNameInContactsPage(location.pathname));
            }
        };
        emitter.on('urlChange', handleUrlChange);
        return () => {
            emitter.off('urlChange', handleUrlChange);
        };
    }, [dispatch, location.href, location.pathname]);

    const activeIndex = useMemo(() => {
        const pathName = location.pathname;

        if (pathName?.startsWith('/message')) {
            return 0;
        }

        if (pathName?.startsWith('/contacts')) {
            return 1;
        }

        return -1;
    }, [location]);

    const chatUrl = useMemo(() => (currentSession ? '/message/chat' : '/message'), [
        currentSession,
    ]);

    return (
        <aside className="navbar">
            <NavbarAvatar avatar={avatar} />
            <IconFont type="message1" />
            <NavItem to={chatUrl} activated={activeIndex === 0} iconType="icon-message-" />
            <NavItem
                to={latestPathNameInContactsPage}
                activated={activeIndex === 1}
                iconType="icon-contacts-fill"
            />
        </aside>
    );
}
