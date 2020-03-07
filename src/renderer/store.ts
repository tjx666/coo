import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState as TempRootState } from 'reducers';

const store = configureStore({
    reducer: rootReducer,
});
export default store;

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const newRootReducer = require('./reducers').default;
        store.replaceReducer(newRootReducer);
    });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = TempRootState;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
