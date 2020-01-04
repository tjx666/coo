import * as React from 'react';
import { Avatar as AntdAvatar } from 'antd';

import avatarSrc from '../../assets/images/girl.jpg';
import './style.scss';

function Avatar() {
    return (
        <AntdAvatar
            className="avatar"
            src={avatarSrc}
            shape="circle"
            size={36}
        />
    );
}

export default Avatar;
