import * as React from 'react';
import { IconFont } from 'lib';

import SidebarAvatar from './sidebarAvatar';
import MenuItem from './menuItem';
import './style.scss';

export default function Sidebar() {
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
        <aside className="sidebar">
            <SidebarAvatar onClick={handleClickAvatar} />
            <IconFont type="message1" />
            <MenuItem activated={activatedMenuItemIndex === 0} iconType="icon-message-" onClick={handleClickMessage} />
            <MenuItem
                activated={activatedMenuItemIndex === 1}
                iconType="icon-contacts-fill"
                onClick={handleClickContacts}
            />
        </aside>
    );
}
