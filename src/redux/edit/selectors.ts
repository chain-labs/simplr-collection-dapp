import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectEdit = (state: AppState) => state.edit;

export const editSelector = createSelector(selectEdit, (state) => state);
