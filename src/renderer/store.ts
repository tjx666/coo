import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    PersistConfig,
} from 'redux-persist';

import rootReducer, { RootState } from 'reducers';
import persistStorage from 'utils/persistStorage';

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage: persistStorage,
    blacklist: ['status'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
const persistor = persistStore(store);

export default store;
export { persistor };

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const nextRootReducer = require('./reducers').default;
        const nextPersistedReducer = persistReducer(persistConfig, nextRootReducer);
        store.replaceReducer(nextPersistedReducer as any);
    });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
