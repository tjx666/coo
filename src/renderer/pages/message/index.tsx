import * as React from 'react';
import { Sidebar, SessionList, MessageInput } from 'components';

import './style.scss';

export default function MessagePage() {
    return (
        <div className="message">
            <Sidebar />
            <SessionList />
            <main>
                <MessageInput />
            </main>
        </div>
    );
}
