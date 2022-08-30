import { createReducer } from '@reduxjs/toolkit';
import { setCollectionDetails } from './actions';
import { CollectionState } from './types';

const intitalState: CollectionState = {
	type: 1,
	name: '',
	symbol: '',
	project_uri: 'https://angelred.tech/api/v1',
	website_url: 'https://angelred.tech',
	logo_url: null,
	banner_url: null,
	contact_email: 'ngllakra@gmail.com',
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
