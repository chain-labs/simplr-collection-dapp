/* eslint-disable no-console */
import { UseEthersResult } from './types';
import { useConnect, useProvider, useSigner } from 'wagmi';
import { useEffect } from 'react';

const useEthers = (): UseEthersResult => {
	const provider = useProvider();
	const { data: signer } = useSigner();

	return [provider, signer];
};

export default useEthers;
