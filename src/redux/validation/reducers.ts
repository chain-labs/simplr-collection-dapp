import { createReducer } from '@reduxjs/toolkit';
import { setValidation } from './actions';
import { ValidationState } from './types';

const intitalState: ValidationState = {
	collection: false,
	pricing: false,
	withdraw: false,
};

export const validationReducer = createReducer(intitalState, (builder) => {
	builder.addCase(setValidation, (state, action) => {
		const updateState: ValidationState = action.payload;
		const newState = { ...state, ...updateState };
		state = newState;
		return state;
	});
});
