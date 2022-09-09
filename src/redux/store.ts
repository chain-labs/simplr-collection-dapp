import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { collectionReducer } from './collection';
import { EditReducer } from './edit';
import { modalReducer } from './modal/reducers';
import { paymentReducer } from './payment';
import { pricingReducer } from './pricing';
import { saleReducer } from './sales';
import { userReducer } from './user/reducers';
import { validationReducer } from './validation';
import { withdrawReducer } from './withdraw/reducers';

const makeStore = () =>
	configureStore({
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
		devTools: true,
	});

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore);
