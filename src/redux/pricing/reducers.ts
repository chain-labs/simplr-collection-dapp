import { createReducer } from '@reduxjs/toolkit';
import { addWhitelist, removeWhitelist, toggleAffiliable, togglePresale } from '.';
import { setPresaleDetails, setPricingDetails, setSaleDetails } from './actions';
import { IPresale, ISale, PricingState } from './types';

const intitalState: PricingState = {
	totalSupply: null,
	reserve_NFTs: null,
	presale: {
		enabled: false,
		maxTokens: null,
		price: null,
		perWallet: null,
		perSale: null,
		startTime: null,
		allowList: {
			name: '',
			list: [],
		},
	},
	sale: {
		price: null,
		startTime: null,
		perWallet: null,
		perSale: null,
	},
	isAffiliable: false,
};

export const pricingReducer = createReducer(intitalState, (builder) => {
	builder
		.addCase(setPricingDetails, (state, action) => {
			const updateState: PricingState = action.payload;
			const newState = { ...state, ...updateState };
			return newState;
		})
		.addCase(setPresaleDetails, (state, action) => {
			const updateState: IPresale = action.payload;
			state.presale = {
				...state.presale,
				...updateState,
			};
			return state;
		})
		.addCase(setSaleDetails, (state, action) => {
			const updateState: ISale = action.payload;
			state.sale = {
				...state.sale,
				...updateState,
			};
			return state;
		})
		.addCase(togglePresale, (state, action) => {
			state.presale.enabled = action.payload;
			return state;
		})
		.addCase(toggleAffiliable, (state, action) => {
			state.isAffiliable = action.payload;
			return state;
		})
		.addCase(addWhitelist, (state, action) => {
			state.presale.allowList.name = action.payload.name;
			state.presale.allowList.list = action.payload.list;
			return state;
		})
		.addCase(removeWhitelist, (state) => {
			state.presale.allowList.name = '';
			state.presale.allowList.list = [];
			return state;
		});
});
