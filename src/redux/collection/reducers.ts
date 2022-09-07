import { createReducer } from '@reduxjs/toolkit';
import { setCollectionDetails } from './actions';
import { CollectionState } from './types';

const intitalState: CollectionState = {
	type: 1,
	name: '',
	symbol: '',
	project_uri: '',
	website_url: '',
	logo_url: null,
	banner_url: null,
	contact_email: '',
	admin: '',
	collection_validated: false,
};

export const collectionReducer = createReducer(intitalState, (builder) => {
	builder.addCase(setCollectionDetails, (state, action) => {
		const updateState: CollectionState = action.payload;
		const newState = { ...state, ...updateState };
		return newState;
	});
});
