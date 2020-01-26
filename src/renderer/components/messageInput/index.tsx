import * as React from 'react';
import { Input } from 'antd';
import { IconFont } from 'lib';

import './style.scss';

const { TextArea } = Input;

export default function MessageInput() {
    return (
        <div className="message-input-container">
            <TextArea className="message-input" autoSize />
            <div className="media-icons">
                <IconFont type="icon-picture" />
                <IconFont type="icon-video1" />
            </div>
        </div>
    );
}
