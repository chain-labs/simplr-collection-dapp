import { createReducer } from '@reduxjs/toolkit';
import { addBeneficiary, clearBeneficiaries, removeBeneficiary } from '.';
import { setPaymentDetails, setValidation } from './actions';
import { PaymentState } from './types';

const intitalState: PaymentState = {
	collection: false,
	pricing: false,
	withdraw: false,
};

export const validationReducer = createReducer(intitalState, (builder) => {
	builder.addCase(setValidation, (state, action) => {
		const updateState: PaymentState = action.payload;
		const newState = { ...state, ...updateState };
		state = newState;
		return state;
	});
});
