import * as React from 'react';
import { SessionList, MessageList, MessageEditor } from 'components';

import './style.scss';

export default function MessagePage() {
    return (
        <main className="message-page">
            <SessionList />
            <div className="message-page-main">
                <MessageList />
                <MessageEditor />
            </div>
        </main>
    );
}
