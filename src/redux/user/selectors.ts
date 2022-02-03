import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;

export const userSelector = createSelector(selectUser, (state) => state);

export const selectNetwork = (state: RootState) => state.user.network;

export const networkSelector = createSelector(selectNetwork, (state) => state);
