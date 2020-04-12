/* eslint-disable global-require */
import React from 'react';

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    const ReactRedux = require('react-redux');
    // !: Execute whyDidYouRender with React as its first argument before any React element is created.
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackExtraHooks: [[ReactRedux, 'useSelector']],
    });
}
