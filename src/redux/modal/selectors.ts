import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectModal = (state: AppState) => state.modal;

export const modalSelector = createSelector(selectModal, (state) => state);
