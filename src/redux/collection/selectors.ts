import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCollection = (state: RootState) => state.collection;

export const collectionSelector = createSelector(selectCollection, (state) => state);
