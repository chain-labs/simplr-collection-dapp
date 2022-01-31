import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectDashboardInfo = (state: RootState) => state.dashboard.collection;

export const dashboardSelector = createSelector(selectDashboardInfo, (state) => state);
