import React, { memo, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { IconFont } from 'lib';

interface NavItemProps {
    active: boolean;
    iconType: string;
    to: string;
    onClick?: (activated: boolean) => void;
}

function NavItem({ iconType, active, onClick, to }: NavItemProps) {
    const history = useHistory();

    const className = useMemo(() => classNames('nav-item', { 'nav-item-active': active }), [
        active,
    ]);

    const handleClick = useCallback(() => {
        onClick && onClick(active);
        history.push(to);
    }, [active, history, onClick, to]);

    return (
        <div className={className} onClick={handleClick}>
            <IconFont className="icon-font" type={iconType} />
        </div>
    );
}

export default memo(NavItem);
