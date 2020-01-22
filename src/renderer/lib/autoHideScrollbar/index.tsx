import React, { useState } from 'react';
import RSC, { ScrollbarProps } from 'react-scrollbars-custom';
import { merge } from 'lodash';

interface AutoHideScrollbarProps extends ScrollbarProps {
    autoHide?: boolean;
}

export default function AutoHideScrollbar({
    autoHide,
    trackXProps,
    trackYProps,
    onMouseEnter,
    onMouseLeave,
    children,
    ...props
}: AutoHideScrollbarProps) {
    const [inUse, setInUse] = useState(false);
    const commonTrackProps = { style: autoHide ? { display: inUse ? null : 'none' } : {} };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onMouseEnter && onMouseEnter(event);
        autoHide && setInUse(true);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onMouseLeave && onMouseLeave(event);
        autoHide && setInUse(false);
    };

    return (
        <RSC
            {...(props as any)}
            trackXProps={merge(trackXProps, commonTrackProps)}
            trackYProps={merge(trackYProps, commonTrackProps)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </RSC>
    );
}
