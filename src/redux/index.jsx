import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/auth.slice'

import { userApi, authApi } from './apis'
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'

const storageKey = import.meta.env.VITE_STORAGE_KEY



const persistConfig= {
    key: storageKey,
    storage,
    version: 1,
    whitelist: ['auth'],
};
  

const  rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)
// const persistedReducer = persistReducer<any, any>(persistConfig, reducers);


const AppStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>    
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(userApi.middleware, authApi.middleware),
});

const persistor = persistStore(AppStore)

export { AppStore, persistor}

