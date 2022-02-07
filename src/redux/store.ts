import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { collectionReducer } from './collection';
import { EditReducer } from './edit';
import { paymentReducer } from './payment';
import { saleReducer } from './sales';
import { userReducer } from './user/reducers';

export const store = configureStore({
	reducer: {
		user: userReducer,
		collection: collectionReducer,
		sales: saleReducer,
		payment: paymentReducer,
		edit: EditReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
const state = store?.getState;

type Store = typeof state;

export type RootState = ReturnType<Store>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
