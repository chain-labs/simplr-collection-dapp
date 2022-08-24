import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectSales = (state: AppState) => state.sales;

export const saleSelector = createSelector(selectSales, (state) => state);

export const selectPresaleWhitelist = (state: AppState) => state.sales.presaleable.presaleWhitelist;

export const presaleWhitelistSelector = createSelector(selectPresaleWhitelist, (state) => state);

export const selectPresaleableToggle = (state: AppState) => state.sales.presaleable.enabled;

export const presaleableToggleSelector = createSelector(selectPresaleableToggle, (state) => state);

export const selectRevealableToggle = (state: AppState) => state.sales.revealable.enabled;

export const revealableToggleSelector = createSelector(selectRevealableToggle, (state) => state);

export const selectAffiliableToggle = (state: AppState) => state.sales.isAffiliable;

export const affiliableToggleSelector = createSelector(selectAffiliableToggle, (state) => state);
