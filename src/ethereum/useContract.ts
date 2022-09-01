/* eslint-disable no-console */
import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import contracts from '../contracts/contracts.json';
import { networks } from 'src/redux/collection.old/types';
import { ProviderProps } from './types';

const useContract = (contractName: string, chain: number, provider: ProviderProps) => {
	const [contract, setContract] = useState(null);

	const artifact = contracts?.[chain]?.[networks[chain].id]?.['contracts']?.[contractName];

	useEffect(() => {
		if (providers?.Provider?.isProvider(provider) && artifact?.abi) {
			try {
				const contract = new ethers.Contract(artifact?.address, artifact?.abi, provider);
				setContract(contract);
			} catch (error) {
				setContract(undefined);
				console.log('Error creating contract', error);
			}
		}
	}, [provider, artifact]);

	return contract;
};

export default useContract;
