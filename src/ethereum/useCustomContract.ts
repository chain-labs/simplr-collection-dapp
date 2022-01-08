import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import contracts from '../contracts/contracts.json';
import { ProviderProps } from './types';

const useCustomContract = (contractName: string, contractAddress: string, provider: ProviderProps): any => {
	const [contract, setContract] = useState(null);

	const getContractDetails = (contractName) => {
		const network = contracts['4'];
		const contractDetails = network[Object.keys(network)[0]].contracts[contractName];
		return contractDetails.abi;
	};

	useEffect(() => {
		if (providers.Provider.isProvider(provider)) {
			try {
				const abi = getContractDetails(contractName);
				setContract(new ethers.Contract(contractAddress, abi, provider));
			} catch (error) {
				setContract(undefined);
				console.log('Error at useCustomContract', error);
				return error.message;
			}
		}
	}, [provider]);

	return contract;
};

export default useCustomContract;
