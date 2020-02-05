import * as React from 'react';
import { Navbar, SessionList, MessageList, MessageEditor } from 'components';

import './style.scss';

export default function MessagePage() {
    return (
        <div className="message-page">
            <Navbar />
            <SessionList />
            <main>
                <MessageList />
                <MessageEditor />
            </main>
        </div>
    );
}
