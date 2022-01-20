import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectPayment = (state: RootState) => state.payment;

export const paymentSelector = createSelector(selectPayment, (state) => state);

export const selectBeneficiaries = (state: RootState) => state.payment.paymentSplitter;

export const beneficiariesSelector = createSelector(selectBeneficiaries, (state) => state);
