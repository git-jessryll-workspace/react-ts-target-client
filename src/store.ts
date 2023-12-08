import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { groupSlice, transactionSlice, userSlice } from "@/slices";

// Assuming `RootState` is defined in your slices
export type RootState = ReturnType<typeof rootReducer>;

const saveUserOnlyFilter = createFilter("user", ["user"]);

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
  group: groupSlice,
  transaction: transactionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck middleware
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
export const persistor = persistStore(store);
