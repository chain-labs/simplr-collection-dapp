import { createAction } from '@reduxjs/toolkit';
import { ValidationState } from './types';

export const setValidation = createAction<ValidationState>('validation/SET_VALIDATION');
