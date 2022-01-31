import { createReducer } from '@reduxjs/toolkit';
import { DashboardState } from './types';
import { setDashboardInfo } from './actions';

const initialState: DashboardState = {
	collection: {
		maxTokens: null,
		adminAddress: '',
		reservedTokens: null,
		price: '',
		revealTime: null,
		presalePrice: '',
	},
};

export const dashboardReducer = createReducer(initialState, (builder) => {
	builder.addCase(setDashboardInfo, (state, action) => {
		const updateState: DashboardState = action.payload;
		const newState = { ...state, ...updateState };
		return newState;
	});
});
