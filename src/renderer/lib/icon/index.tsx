import * as React from 'react';
import classNames from 'classnames';

import 'assets/js/iconfont';
import './style.scss';

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
    type: string;
    onClick?: () => void;
}

export default function Icon({ className: clsProp, style, type, onClick }: IconProps) {
    const className = classNames('icon', clsProp);
    const handleClick = () => {
        onClick && onClick();
    };

    return (
        <svg className={className} style={style} aria-hidden="true" onClick={handleClick}>
            <use xlinkHref={`#icon-${type}`} />
        </svg>
    );
}
