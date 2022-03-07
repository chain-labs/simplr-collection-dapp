import CreateComp from 'containers/create';
import { ethers } from 'ethers';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useContract from 'src/ethereum/useContract';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector, userSelector } from 'src/redux/user';

const CreatePage = () => {
	const [provider] = useEthers();
	const collection = useAppSelector(collectionSelector);
	const network = useAppSelector(networkSelector);
	const user = useAppSelector(userSelector);
	const [balance, setBalance] = useState({ value: 0, loading: true });

	const CollectionFactory = useContract('CollectionFactoryV2', collection.type ?? network.chain, provider);

	useEffect(() => {
		if (CollectionFactory && user.address) {
			getSEATDetails();
		}
	}, [CollectionFactory, user.address]);

	const getSEATDetails = async () => {
		try {
			const abi = getContractDetails('AffiliateCollection');
			const seatAddress = await CollectionFactory.callStatic.freePass();
			const SEATInstance = new ethers.Contract(`${seatAddress}`, abi, provider);
			const balance = await SEATInstance.callStatic['balanceOf(address)'](user.address);

			setBalance({ value: parseInt(balance.toString()), loading: false });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Head>
				<title>Simplr | Create Collection</title>
			</Head>
			<CreateComp balance={balance} />;
		</>
	);
};

export default CreatePage;
