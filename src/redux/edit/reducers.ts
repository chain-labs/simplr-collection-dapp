import { createReducer } from '@reduxjs/toolkit';
import { setEditDetails } from './actions';
import { EditState } from './types';

const intitalState: EditState = {
	type: '',
	label: '',
	placeholder: '',
	data: '',
	editable: '',
	editfield: '',
	metadata: {},
	contract: {},
	adminAddress: '',
};

export const EditReducer = createReducer(intitalState, (builder) => {
	builder.addCase(setEditDetails, (state, action) => {
		const updateState: EditState = action.payload;
		const newState = { ...state, ...updateState };
		return newState;
	});
});
