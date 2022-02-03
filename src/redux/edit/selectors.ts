import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectEdit = (state: RootState) => state.edit;

export const editSelector = createSelector(selectEdit, (state) => state);
