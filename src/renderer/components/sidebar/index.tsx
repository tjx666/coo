import * as React from 'react';

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
            <MenuItem
                activated={activatedMenuItemIndex === 0}
                iconType="message1"
                activatedIconType="valentine_-message-love-bubble-talk"
                onClick={handleClickMessage}
            />
            <MenuItem
                activated={activatedMenuItemIndex === 1}
                iconType="contacts-line"
                activatedIconType="contacts-fill"
                onClick={handleClickContacts}
            />
        </aside>
    );
}
