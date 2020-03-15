import React from 'react';

import { MessageList, MessageEditor } from 'components';

import './style.scss';

export default function chatSubPage() {
    return (
        <div className="chat-sub-page">
            <MessageList />
            <MessageEditor />
        </div>
    );
}
