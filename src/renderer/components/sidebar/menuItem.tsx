import * as React from 'react';
import classNames from 'classnames';
import { IconFont } from 'lib';

interface MenuItemProps {
    activated: boolean;
    iconType: string;
    activatedIconType: string;
    onClick: (activated: boolean) => void;
}

function MenuItem({ iconType, activatedIconType, activated, onClick }: MenuItemProps) {
    const className = classNames('menu-item', { 'menu-item-activated': activated });
    const handleClick = () => onClick(activated);

    return <IconFont className={className} type={activated ? activatedIconType : iconType} onClick={handleClick} />;
}

export default MenuItem;
