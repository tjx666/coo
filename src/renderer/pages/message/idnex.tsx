import * as React from 'react';
import { Sidebar, MessageList } from 'components';

import './style.scss';

export default function MessagePage() {
    return (
        <div className="message">
            <Sidebar />
            <MessageList />
        </div>
    );
}
