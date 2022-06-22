import { createReducer } from '@reduxjs/toolkit';
import { addBeneficiary, clearBeneficiaries, removeBeneficiary } from '.';
import { setPaymentDetails } from './actions';
import { PaymentState } from './types';

const intitalState: PaymentState = {
	useEarlyPass: true,
	royalties: {
		receiver: null,
		royaltyFraction: null,
	},
	paymentSplitter: {
		payees: [],
		shares: [],
	},
	paymentDetails_validated: false,
};

export const paymentReducer = createReducer(intitalState, (builder) => {
	builder
		.addCase(setPaymentDetails, (state, action) => {
			const updateState: PaymentState = action.payload;
			const newState = { ...state, ...updateState };
			state = newState;
			return state;
		})
		.addCase(addBeneficiary, (state, action) => {
			state?.paymentSplitter?.payees?.push(action.payload.payee);
			state?.paymentSplitter?.shares?.push(action.payload.shares);
			return state;
		})
		.addCase(removeBeneficiary, (state, action) => {
			const index = state?.paymentSplitter?.payees?.indexOf(action.payload);
			if (index !== -1) {
				state?.paymentSplitter?.payees?.splice(index, 1);
				state?.paymentSplitter?.shares?.splice(index, 1);
			}
			return state;
		})
		.addCase(clearBeneficiaries, (state) => {
			state.paymentSplitter.payees = [];
			state.paymentSplitter.shares = [];
			return state;
		});
});
