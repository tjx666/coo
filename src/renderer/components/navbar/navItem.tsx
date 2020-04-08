import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { IconFont } from 'lib';

interface NavItemProps {
    active: boolean;
    iconType: string;
    onClick?: (activated: boolean) => void;
    to: string;
}

export default function NavItem({ iconType, active, onClick, to }: NavItemProps) {
    const history = useHistory();
    const className = classNames('nav-item', { 'nav-item-active': active });

    const handleClick = () => {
        onClick && onClick(active);
        history.push(to);
    };

    return (
        <div className={className} onClick={handleClick}>
            <IconFont className="icon-font" type={iconType} />
        </div>
    );
}
