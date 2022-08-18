import { createAction } from '@reduxjs/toolkit';
import { IPayee, IRoyalty, WithdrawState } from './types';

export const setWithdrawDetails = createAction<WithdrawState>('withdraw/SET_WITHDRAW_DETAILS');

export const addPayee = createAction<IPayee>('withdraw/ADD_PAYEE');

export const updatePayee = createAction<IPayee[]>('withdraw/UPDATE_PAYEE');

export const addRoyaltyPayee = createAction<IRoyalty>('withdraw/ADD_ROYALTY_PAYEE');

export const updateRoyaltyPayee = createAction<IRoyalty[]>('withdraw/UPDATE_ROYALTY_PAYEE');
