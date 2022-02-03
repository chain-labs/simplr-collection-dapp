import { createReducer } from '@reduxjs/toolkit';
import { setNetwork } from '.';

import { setUser, removeUser } from './actions';

type UserState = {
	address: string;
	exists: boolean;
	network: {
		chain: number;
		name: string;
		id: string;
	};
};

const initialState: UserState = {
	address: '',
	exists: false,
	network: {
		chain: 0,
		name: '',
		id: '',
	},
};

export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setUser, (state, action) => {
			state.address = action.payload;
			if (action.payload.length >= 1) {
				state.exists = true;
			}
		})
		.addCase(removeUser, (state) => {
			state.address = '';
			state.exists = false;
		})
		.addCase(setNetwork, (state, action) => {
			const network = {
				chain: action.payload.chain,
				name: action.payload.name,
				id: action.payload.id,
			};
			const newState = {
				...state,
				network,
			};
			return newState;
		});
});
