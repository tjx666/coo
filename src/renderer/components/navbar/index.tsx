import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-use';

import { IconFont } from 'lib';
import { RootState } from 'reducers';

import NavbarAvatar from './navbarAvatar';
import NavItem from './navItem';
import './style.scss';

export default function Navbar() {
    const location = useLocation();
    const currentSession = useSelector((state: RootState) => state.sessions.currentSession);

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

    const chatUrl = useMemo(() => `/message/${currentSession?.id}/chat`, [currentSession]);

    return (
        <aside className="navbar">
            <NavbarAvatar />
            <IconFont type="message1" />
            <NavItem to={chatUrl} activated={activeIndex === 0} iconType="icon-message-" />
            <NavItem to="/contacts" activated={activeIndex === 1} iconType="icon-contacts-fill" />
        </aside>
    );
}
