import { createReducer } from '@reduxjs/toolkit';
import { hideModal, replaceModal, showModal } from './actions';
import { ModalState } from './types';

const initialState: ModalState = {
	isOpen: false,
	modalType: '',
	props: null,
};

export const modalReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(showModal, (state, action) => {
			const { type, props } = action.payload;
			const newState = {
				...state,
				isOpen: true,
				modalType: type,
				props,
			};
			return newState;
		})
		.addCase(hideModal, (state) => {
			const newState = {
				...state,
				isOpen: false,
				modalType: '',
				props: null,
			};
			return newState;
		})
		.addCase(replaceModal, (state, action) => {
			const { type, props } = action.payload;
			const newState = {
				...state,
				isOpen: true,
				modalType: type,
				props: props,
			};
			return newState;
		});
});
