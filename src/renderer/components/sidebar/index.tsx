import * as React from 'react';
import { Avatar } from 'lib';

import avatarPath from 'assets/images/avatar.jpg';
import './style.scss';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <Avatar src={avatarPath} size={34} />
        </aside>
    );
}
