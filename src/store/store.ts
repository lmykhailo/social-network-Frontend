import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import authReducer from './reducers/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import userBackEndReducer from './reducers/userBackend/userBackEndSlice'
import themeReducer from './reducers/theme/themeSlice'
import followingReducer from './reducers/following/followingSlice'
import chatsReducer from './reducers/chats/chatsSlice'
import messagesReducer from './reducers/messages/messagesSlice'
import chatUserDetailsReducer from './reducers/chatUserDetails/chatUserDetailsSlice'
import notificationsReducer from './reducers/notifications/notificationsSlice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  userInformation: userBackEndReducer,
  following: followingReducer,
  theme: themeReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  chatUserDetails: chatUserDetailsReducer,
  notifications: notificationsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  let persistor = persistStore(store)

  return { store, persistor }
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['store']['dispatch']
