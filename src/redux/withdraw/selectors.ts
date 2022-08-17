import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectWithdraw = (state: RootState) => state.withdraw;

export const withdrawSelector = createSelector(selectWithdraw, (state) => state);

export const selectPayees = (state: RootState) => state.payment.paymentSplitter;

export const payeesSelector = createSelector(selectPayees, (state) => state);
