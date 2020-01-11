import * as React from 'react';
import classNames from 'classnames';

interface AvatarProps {
    className?: string;
    shape: 'square' | 'circular' | 'circle';
}

export default function Avatar({ shape, className: classNameProp }: AvatarProps) {
    const className = classNames('avatar', classNameProp, {
        'avatar-circular': shape === 'circular',
        'avatar-circle': shape === 'circle',
    });

    return <div className={className} />;
}
