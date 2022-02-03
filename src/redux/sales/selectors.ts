import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectSales = (state: RootState) => state.sales;

export const saleSelector = createSelector(selectSales, (state) => state);

export const selectPresaleWhitelist = (state: RootState) => state.sales.presaleable.presaleWhitelist;

export const presaleWhitelistSelector = createSelector(selectPresaleWhitelist, (state) => state);

export const selectPresaleableToggle = (state: RootState) => state.sales.presaleable.enabled;

export const presaleableToggleSelector = createSelector(selectPresaleableToggle, (state) => state);

export const selectRevealableToggle = (state: RootState) => state.sales.revealable.enabled;

export const revealableToggleSelector = createSelector(selectRevealableToggle, (state) => state);

export const selectAffiliableToggle = (state: RootState) => state.sales.isAffiliable;

export const affiliableToggleSelector = createSelector(selectAffiliableToggle, (state) => state);
