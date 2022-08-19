import { createAction } from '@reduxjs/toolkit';
import { PricingState } from './types';

export const setPricingDetails = createAction<PricingState>('pricing/SET_PRICING_DETAILS');
export const togglePresale = createAction<boolean>('pricing/TOGGLE_PRESALE');
export const toggleAffiliable = createAction<boolean>('pricing/TOGGLE_AFFILIABLE');

export const addWhitelist = createAction<{ name: string; list: string[] }>('pricing/ADD_WHITELIST');
export const removeWhitelist = createAction('pricing/REMOVE_WHITELIST');