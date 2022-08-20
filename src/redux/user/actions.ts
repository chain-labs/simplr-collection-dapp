import { createAction } from '@reduxjs/toolkit';
import { ProviderProps, SignerProps } from 'src/ethereum/types';

export const setUser = createAction<string>('user/SET_USER');

export const removeUser = createAction('user/REMOVE_USER');
