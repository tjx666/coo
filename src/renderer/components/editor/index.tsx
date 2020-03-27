import React, { useCallback, useRef } from 'react';
import { Upload, message } from 'antd';
import { UploadChangeParam, UploadProps } from 'antd/lib/upload/interface';

import { IconFont } from 'lib';
import storage from 'utils/storage';

import './style.scss';

interface EditorProps {
    onEnter: (text: string) => void;
    onUploadImageSuccess: (response: any) => void;
    imageUploadAddress: string;
}

export default function Editor({ onEnter, imageUploadAddress, onUploadImageSuccess }: EditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const uploadImageProps: UploadProps = {
        name: 'messageImage',
        method: 'POST',
        action: imageUploadAddress,
        headers: {
            Authorization: storage.get('token'),
        },
        onChange(info: UploadChangeParam) {
            if (info.file.status === 'done') {
                onUploadImageSuccess(info.file.response);
            } else if (info.file.status === 'error') {
                message.error('发送图片失败！');
            }
        },
        showUploadList: false,
    };

    const handlePressEnter = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const editorDom = editorRef.current!;
            const content = editorDom.textContent!.trim();
            if (content !== '' && event.keyCode === 13) {
                event.preventDefault();
                editorDom.innerHTML = '';
                onEnter(content);
            }
        },
        [onEnter],
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
                <Upload className="toolbar-item image-upload" {...uploadImageProps}>
                    <IconFont type="icon-picture" title="选择图片" />
                </Upload>
            </div>
        </div>
    );
}
