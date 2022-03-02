import { createAction } from '@reduxjs/toolkit';
import { PaymentState } from './types';

export const setPaymentDetails = createAction<PaymentState>('payment/SET_PAYMENT_DETAILS');

export const addBeneficiary = createAction<{ payee: string; shares: number }>('payment/ADD_BENEFICIARY');

export const removeBeneficiary = createAction<string>('payment/REMOVE_BENEFICIARY');

export const clearBeneficiaries = createAction('payment/CLEAR_BENEFICIARIES');
