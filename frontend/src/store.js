import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";

const rootReducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
