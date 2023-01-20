import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {
  isAuthenticated: false,
  userInfo: {},
};

const authenSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = {};
    },
    // [ KEEP BELOW AS REFERENCE ]
    // updateUserInfo(state, action) {
    //   const payLoad = action.payload;
    //   const name = payLoad["name"];
    //   state.userCash = { ...state.userCash, [name]: payLoad };
    // },
    // deleteUserInfo(state, action) {
    //   const name = action.payload;
    //   delete state.userInvestments[name];
    // },
  },
});

const persistConfig = {
  // timeout: 0.2, //Set the timeout function > 0 to prevent the website from crashing
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authenSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const authActions = authenSlice.actions;
export default store;
