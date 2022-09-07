import { createReducer } from '@reduxjs/toolkit';
import { setCollectionDetails, setCollectionNetwork, setCollectionType } from './actions';
import { CollectionState } from './types';

const intitalState: CollectionState = {
	contract: null,
	network: 'Ethereum',
	name: '',
	symbol: '',
	collection_metadata: '',
	website_url: '',
	email: '',
	logo: null,
	banner: null,
	admin: '',
	delay_reveal: {
		enabled: false,
		metadata_uri: '',
	},
};

export const collectionReducer = createReducer(intitalState, (builder) => {
	builder
		.addCase(setCollectionDetails, (state, action) => {
			const updateState: CollectionState = action.payload;
			const newState = { ...state, ...updateState };
			return newState;
		})
		.addCase(setCollectionType, (state, action) => {
			const newState = { ...state, contract: action.payload };
			return newState;
		})
		.addCase(setCollectionNetwork, (state, action) => {
			const newState = { ...state, network: action.payload };
			return newState;
		});
});
