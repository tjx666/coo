import React, { useMemo } from 'react';
import { useLocation } from 'react-use';

import { IconFont } from 'lib';

import NavbarAvatar from './navbarAvatar';
import NavItem from './navItem';
import './style.scss';

export default function Navbar() {
    const location = useLocation();

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

    return (
        <aside className="navbar">
            <NavbarAvatar />
            <IconFont type="message1" />
            <NavItem to="/message" activated={activeIndex === 0} iconType="icon-message-" />
            <NavItem to="/contacts" activated={activeIndex === 1} iconType="icon-contacts-fill" />
        </aside>
    );
}
