import { createReducer } from '@reduxjs/toolkit';
import { setCollectionDetails } from './actions';
import { CollectionState } from './types';

const intitalState: CollectionState = {
	type: null,
	name: '',
	symbol: '',
	project_uri: '',
	website_url: '',
	logo_url: '',
	banner_url: '',
	contact_email: '',
	admin: '',
};

export const collectionReducer = createReducer(intitalState, (builder) => {
	builder.addCase(setCollectionDetails, (state, action) => {
		const updateState: CollectionState = action.payload;
		const newState = { ...state, ...updateState };
		return newState;
	});
});
