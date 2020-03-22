import React, { useCallback, useRef } from 'react';
import { Upload } from 'antd';

import { IconFont } from 'lib';

import './style.scss';

interface EditorProps {
    onEnter: (text: string) => void;
}

export default function Editor({ onEnter: onSendTextMessage }: EditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const handlePressEnter = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const editorDom = editorRef.current!;
            const content = editorDom.textContent!.trim();
            if (content !== '' && event.keyCode === 13) {
                event.preventDefault();
                editorDom.innerHTML = '';
                onSendTextMessage(content);
            }
        },
        [onSendTextMessage],
    );

    const handlePaste = useCallback((event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, text);
    }, []);

    return (
        <div className="editor-container">
            <div
                ref={editorRef}
                className="editor"
                contentEditable
                onKeyDown={handlePressEnter}
                onPaste={handlePaste}
            />
            <div className="toolbar">
                <Upload className="image-upload">
                    <IconFont className="toolbar-item" type="icon-picture" title="选择图片" />
                </Upload>
                <IconFont className="toolbar-item" type="icon-video" title="选择视频" />
            </div>
        </div>
    );
}
