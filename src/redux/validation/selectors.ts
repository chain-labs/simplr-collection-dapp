import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectValidation = (state: AppState) => state.validation;

export const validationSelector = createSelector(selectValidation, (state) => state);
