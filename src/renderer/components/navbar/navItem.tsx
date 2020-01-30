import * as React from 'react';
import classNames from 'classnames';
import { IconFont } from 'lib';

interface NavItemProps {
    activated: boolean;
    iconType: string;
    onClick: (activated: boolean) => void;
}

function NavItem({ iconType, activated, onClick }: NavItemProps) {
    const className = classNames('nav-item', { 'nav-item-activated': activated });
    const handleClick = () => onClick(activated);

    return (
        <div className={className} onClick={handleClick}>
            <IconFont className="icon-font" type={iconType} />
        </div>
    );
}

export default NavItem;
