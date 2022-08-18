import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectModal = (state: RootState) => state.modal;

export const modalSelector = createSelector(selectModal, (state) => state);
