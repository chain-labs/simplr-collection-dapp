import { createReducer } from '@reduxjs/toolkit';
import { setCollectionDetails } from './actions';
import { CollectionState } from './types';

const intitalState: CollectionState = {
	contract: null,
	network: null,
	name: '',
	symbol: '',
	collection_metadata: '',
	website_url: '',
	logo: null,
	banner: null,
	admin: '',
	delay_reveal: {
		enabled: false,
		metadata_uri: '',
	},
};

export const collectionReducer = createReducer(intitalState, (builder) => {
	builder.addCase(setCollectionDetails, (state, action) => {
		const updateState: CollectionState = action.payload;
		const newState = { ...state, ...updateState };
		return newState;
	});
});
