import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';

const useContract = (address, abi, provider) => {
	const [contract, setContract] = useState(null);

	useEffect(() => {
		if (providers.Provider.isProvider(provider) && abi) {
			try {
				const contract = new ethers.Contract(address, abi, provider);
				setContract(contract);
			} catch (error) {
				setContract(undefined);
				console.log('Error creating contract', error);
			}
		}
	}, [provider, abi]);

	return contract;
};

export default useContract;
