import { createAction } from '@reduxjs/toolkit';
import { DashboardState } from '.';

export const setDashboardInfo = createAction<Pick<DashboardState, 'collection'>>('dashboard/SET_COLLECTION_DETAILS');
