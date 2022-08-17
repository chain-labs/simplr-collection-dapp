import { createReducer } from '@reduxjs/toolkit';
import { addPayee, addRoyaltyPayee, setWithdrawDetails, updatePayee, updateRoyaltyPayee } from './actions';
import { IPayee, WithdrawState } from './types';

const intitialState: WithdrawState = {
	useEarlyPass: true,
	paymentSplitter: [],
	royalties: [],
};

export const withdrawReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setWithdrawDetails, (state, action) => {
			const updateState: WithdrawState = action.payload;
			const newState = { ...state, ...updateState };
			state = newState;
			return state;
		})
		.addCase(addPayee, (state, action) => {
			state?.paymentSplitter?.push(action.payload);
			return state;
		})
		.addCase(updatePayee, (state, action) => {
			state.paymentSplitter = action.payload;
			return state;
		})
		.addCase(addRoyaltyPayee, (state, action) => {
			state?.royalties?.push(action.payload);
			return state;
		})
		.addCase(updateRoyaltyPayee, (state, action) => {
			state.royalties = action.payload;
			return state;
		});
});
