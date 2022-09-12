import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectWithdraw = (state: AppState) => state.withdraw;

export const withdrawSelector = createSelector(selectWithdraw, (state) => state);

export const selectPayees = (state: AppState) => state.withdraw.paymentSplitter;

export const payeesSelector = createSelector(selectPayees, (state) => state);
