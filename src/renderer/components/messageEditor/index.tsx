import React from 'react';

import { IconFont } from 'lib';

import './style.scss';

export default function MessageEditor() {
    return (
        <div className="message-editor-container">
            <div className="message-editor" contentEditable />
            <div className="toolbar">
                <IconFont className="toolbar-item" type="icon-picture" />
                <IconFont className="toolbar-item" type="icon-video" />
            </div>
        </div>
    );
}
