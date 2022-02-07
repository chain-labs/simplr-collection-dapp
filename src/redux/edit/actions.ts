import { createAction } from '@reduxjs/toolkit';
import { EditState } from './types';

export const setEditDetails = createAction<EditState>('collection/SET_EDIT_DETAILS');
