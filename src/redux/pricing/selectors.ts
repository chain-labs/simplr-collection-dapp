import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPricing = (state: RootState) => state.pricing;

export const saleSelector = createSelector(selectPricing, (state) => state);

export const selectAllowList = (state: RootState) => state.pricing.presale.allowList;

export const allowListSelector = createSelector(selectAllowList, (state) => state);

export const selectPresaleToggle = (state: RootState) => state.pricing.presale.enabled;

export const presaleToggleSelector = createSelector(selectPresaleToggle, (state) => state);

export const selectAffiliableToggle = (state: RootState) => state.sales.isAffiliable;

export const affiliableToggleSelector = createSelector(selectAffiliableToggle, (state) => state);
