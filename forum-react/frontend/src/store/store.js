import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/user/userSlice";
import postReducer from "../components/post/postSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore(
	{
		reducer: {
			user: persistedReducer,
			post: postReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	},
	window?.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
