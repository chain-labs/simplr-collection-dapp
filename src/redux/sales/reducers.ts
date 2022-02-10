import { createReducer } from '@reduxjs/toolkit';
import { addWhitelist, removeWhitelist, toggleAffiliable, togglePresale, toggleRevealable } from '.';
import { setSaleDetails } from './actions';
import { SaleState } from './types';

const intitalState: SaleState = {
	maximumTokens: null,
	maxPurchase: null,
	maxHolding: null,
	price: null,
	reserveTokens: null,
	publicSaleStartTime: null,
	presaleable: {
		enabled: false,
		presaleReservedTokens: null,
		presalePrice: null,
		presaleMaxHolding: null,
		presaleWhitelist: [],
		presaleStartTime: null,
	},
	revealable: {
		enabled: false,
		loadingImageUrl: '',
	},
	isAffiliable: false,
	salesDetails_validated: false,
};

export const saleReducer = createReducer(intitalState, (builder) => {
	builder
		.addCase(setSaleDetails, (state, action) => {
			const updateState: SaleState = action.payload;
			const newState = { ...state, ...updateState };
			state = newState;
			return state;
		})
		.addCase(togglePresale, (state, action) => {
			state.presaleable.enabled = action.payload;
			return state;
		})
		.addCase(toggleRevealable, (state, action) => {
			state.revealable.enabled = action.payload;
			return state;
		})
		.addCase(toggleAffiliable, (state, action) => {
			state.isAffiliable = action.payload;
			return state;
		})
		.addCase(addWhitelist, (state, action) => {
			state.presaleable.presaleWhitelist.push(action.payload);
			return state;
		})
		.addCase(removeWhitelist, (state, action) => {
			state.presaleable.presaleWhitelist = state.presaleable.presaleWhitelist.filter(
				(address) => address !== action.payload
			);
			return state;
		});
});
