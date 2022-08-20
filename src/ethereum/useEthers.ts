/* eslint-disable no-console */
import getEthers from './utils/getEthers';
import { useEffect, useState } from 'react';
import { ETH_REQUEST_ACCOUNT } from './utils/methods';
import { ProviderProps, UseEthersResult } from './types';
import { useAccount, useConnect, useProvider, useSigner } from 'wagmi';
import { useAppDispatch } from 'src/redux/hooks';
import { setUser } from 'src/redux/user';
import { connectAdvanced } from 'react-redux';

const useEthers = (): UseEthersResult => {
	const provider = useProvider();
	const { data: signer } = useSigner();
	const account = useAccount();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (account?.address) {
			dispatch(setUser(account?.address));
		}
	}, [account]);

	return [provider, signer];
};

export default useEthers;
