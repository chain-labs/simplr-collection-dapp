import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { collectionReducer } from './collection';
import { EditReducer } from './edit';
import { modalReducer } from './modal/reducers';
import { paymentReducer } from './payment';
import { pricingReducer } from './pricing';
import { saleReducer } from './sales';
import { userReducer } from './user/reducers';
import { validationReducer } from './validation';
import { withdrawReducer } from './withdraw/reducers';

export const store = configureStore({
	reducer: {
		user: userReducer,
		collection: collectionReducer,
		sales: saleReducer,
		pricing: pricingReducer,
		payment: paymentReducer,
		withdraw: withdrawReducer,
		validation: validationReducer,
		edit: EditReducer,
		modal: modalReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
const state = store?.getState;

type Store = typeof state;

export type RootState = ReturnType<Store>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
