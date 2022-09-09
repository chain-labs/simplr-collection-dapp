import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectPricing = (state: AppState) => state.pricing;

export const pricingSelector = createSelector(selectPricing, (state) => state);

export const selectAllowList = (state: AppState) => state.pricing.presale.allowList;

export const allowListSelector = createSelector(selectAllowList, (state) => state);

export const selectPresaleToggle = (state: AppState) => state.pricing.presale.enabled;

export const presaleToggleSelector = createSelector(selectPresaleToggle, (state) => state);

export const selectAffiliableToggle = (state: AppState) => state.pricing.isAffiliable;

export const affiliableToggleSelector = createSelector(selectAffiliableToggle, (state) => state);
