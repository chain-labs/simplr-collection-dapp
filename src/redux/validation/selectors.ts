import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectValidation = (state: RootState) => state.validation;

export const validationSelector = createSelector(selectValidation, (state) => state);
