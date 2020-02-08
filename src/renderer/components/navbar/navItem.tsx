import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { IconFont } from 'lib';

interface NavItemProps {
    activated: boolean;
    iconType: string;
    onClick: (activated: boolean) => void;
    to: string;
}

function NavItem({ iconType, activated, onClick, to }: NavItemProps) {
    const className = classNames('nav-item', { 'nav-item-activated': activated });
    const handleClick = () => onClick(activated);

    return (
        <div className={className} onClick={handleClick}>
            <Link to={to}>
                <IconFont className="icon-font" type={iconType} />
            </Link>
        </div>
    );
}

export default NavItem;
