import * as React from 'react';
import classNames from 'classnames';
import { IconFont } from 'lib';

interface MenuItemProps {
    activated: boolean;
    iconType: string;
    onClick: (activated: boolean) => void;
}

function MenuItem({ iconType, activated, onClick }: MenuItemProps) {
    const className = classNames('menu-item', { 'menu-item-activated': activated });
    const handleClick = () => onClick(activated);

    return (
        <div className={className} onClick={handleClick}>
            <IconFont className="icon-font" type={iconType} />
        </div>
    );
}

export default MenuItem;
