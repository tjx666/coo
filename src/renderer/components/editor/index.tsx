import React, { useCallback, useRef } from 'react';

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
            // eslint-disable-next-line unicorn/prefer-text-content
            const content = editorDom.innerText!.trim();
            console.log(editorDom.innerHTML);
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
                <IconFont className="toolbar-item" type="icon-picture" />
                <IconFont className="toolbar-item" type="icon-video" />
            </div>
        </div>
    );
}
