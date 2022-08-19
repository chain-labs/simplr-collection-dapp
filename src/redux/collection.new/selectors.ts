import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectCollection = (state: AppState) => state.collection;

export const collectionSelector = createSelector(selectCollection, (state) => state);
