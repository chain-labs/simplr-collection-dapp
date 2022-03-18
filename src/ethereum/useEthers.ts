import getEthers from './utils/getEthers';
import { useEffect, useState } from 'react';
import { ETH_REQUEST_ACCOUNT } from './utils/methods';
import { ProviderProps, UseEthersResult } from './types';

// To expose ethereum to the window object
declare let window: any;

export const requestAccount = async () => {
	if (process.browser) await window?.ethereum?.request({ method: ETH_REQUEST_ACCOUNT });
};

const useEthers = (): UseEthersResult => {
	const [provider, setProvider] = useState<ProviderProps>(null);
	const [ethers, setEthers] = useState<any>(null);

	useEffect(() => {
		const process = async () => {
			const { provider, ethers } = await getEthers();
			setProvider(provider as ProviderProps);
			setEthers(ethers);
		};
		process();
	}, []);

	const connectToEthereum = async () => {
		if (provider) {
			try {
				// await requestAccount();
			} catch (e) {
				console.log('Error at useEthers:', e);
			}
		}
	};

	useEffect(() => {
		connectToEthereum();
	});

	return [provider, setProvider, ethers];
};

export default useEthers;
