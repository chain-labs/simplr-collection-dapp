import { createAction } from '@reduxjs/toolkit';

export const showModal = createAction<{ type: string; props: any }>('modal/SHOW_MODAL');

export const hideModal = createAction('modal/HIDE_MODAL');

export const replaceModal = createAction<{ type: string; props: any }>('modal/REPLACE_MODAL');
