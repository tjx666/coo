import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { IconFont } from 'lib';

interface NavItemProps {
    activated: boolean;
    iconType: string;
    onClick?: (activated: boolean) => void;
    to: string;
}

function NavItem({ iconType, activated, onClick, to }: NavItemProps) {
    const history = useHistory();
    const className = classNames('nav-item', { 'nav-item-activated': activated });

    const handleClick = () => {
        onClick && onClick(activated);
        history.push(to);
    };

    return (
        <div className={className} onClick={handleClick}>
            <IconFont className="icon-font" type={iconType} />
        </div>
    );
}

export default NavItem;
