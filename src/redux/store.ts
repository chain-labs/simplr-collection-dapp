import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { userReducer } from './user/reducers';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
const state = store?.getState;

type Store = typeof state;

export type RootState = ReturnType<Store>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
