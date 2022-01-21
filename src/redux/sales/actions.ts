import { createAction } from '@reduxjs/toolkit';
import { SaleState } from './types';

export const setSaleDetails = createAction<SaleState>('sale/SET_SALE_DETAILS');
export const togglePresale = createAction<boolean>('sale/TOGGLE_PRESALE');
export const toggleRevealable = createAction<boolean>('sale/TOGGLE_REVEALABLE');
export const toggleAffiliable = createAction<boolean>('sale/TOGGLE_AFFILIABLE');

export const addWhitelist = createAction<string>('sale/ADD_WHITELIST');
export const removeWhitelist = createAction<string>('sale/REMOVE_WHITELIST');
