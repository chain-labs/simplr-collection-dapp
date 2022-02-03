import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction<string>('user/SET_USER');

export const removeUser = createAction('user/REMOVE_USER');

export const setNetwork = createAction<{ chain: number; name: string; id: string }>('user/SET_NETWORK');
