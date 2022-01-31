import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { collectionReducer } from './collection';
import { dashboardReducer } from './dashboard';
import { paymentReducer } from './payment';
import { saleReducer } from './sales';
import { userReducer } from './user/reducers';

export const store = configureStore({
	reducer: {
		user: userReducer,
		collection: collectionReducer,
		sales: saleReducer,
		payment: paymentReducer,
		dashboard: dashboardReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
const state = store?.getState;

type Store = typeof state;

export type RootState = ReturnType<Store>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
