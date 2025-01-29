import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import pokemonReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedPokemonReducer = persistReducer(persistConfig, pokemonReducer);

export const store = configureStore({
  reducer: {
    pokemon: persistedPokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
