import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectPayment = (state: AppState) => state.payment;

export const paymentSelector = createSelector(selectPayment, (state) => state);

export const selectBeneficiaries = (state: AppState) => state.payment.paymentSplitter;

export const beneficiariesSelector = createSelector(selectBeneficiaries, (state) => state);
