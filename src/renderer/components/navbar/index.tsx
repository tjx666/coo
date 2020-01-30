import * as React from 'react';
import { IconFont } from 'lib';

import NavbarAvatar from './navbarAvatar';
import NavItem from './navItem';
import './style.scss';

export default function Navbar() {
    const [activatedMenuItemIndex, setActivatedMenuItemIndex] = React.useState(-1);

    const handleClickAvatar = () => {
        setActivatedMenuItemIndex(-1);
    };

    const handleClickMessage = () => {
        setActivatedMenuItemIndex(0);
    };

    const handleClickContacts = () => {
        setActivatedMenuItemIndex(1);
    };

    return (
        <aside className="navbar">
            <NavbarAvatar onClick={handleClickAvatar} />
            <IconFont type="message1" />
            <NavItem activated={activatedMenuItemIndex === 0} iconType="icon-message-" onClick={handleClickMessage} />
            <NavItem
                activated={activatedMenuItemIndex === 1}
                iconType="icon-contacts-fill"
                onClick={handleClickContacts}
            />
        </aside>
    );
}
