import * as React from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import './style.scss';

interface AvatarProps {
    className?: string;
    style?: React.CSSProperties;
    src?: string;
    shape?: 'square' | 'circular' | 'circle';
    size?: number | 'small' | 'default' | 'large';
    onClick?: (event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export default function Avatar({ className: clsProp, style: styleProp, src, shape, size, onClick }: AvatarProps) {
    const className = classNames('avatar', clsProp, {
        'avatar-circular': shape === 'circular',
        'avatar-circle': shape === 'circle',
    });

    const sizeMap = { small: 32, large: 64, default: 40 };
    let avatarSize = 40;
    if (size !== undefined) {
        avatarSize = typeof size === 'number' ? size : sizeMap[size];
    }

    const style = { ...styleProp, width: avatarSize, height: avatarSize, lineHeight: `${avatarSize}px` };
    const imageStyle = { width: avatarSize, height: avatarSize };

    const children = src ? (
        <img style={imageStyle} src={src} alt="avatar" />
    ) : (
        <Icon style={{ fontSize: avatarSize * 0.75 }} type="user" />
    );

    const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        onClick && onClick(event);
    };

    return (
        <span className={className} style={style} onClick={handleClick}>
            {children}
        </span>
    );
}
