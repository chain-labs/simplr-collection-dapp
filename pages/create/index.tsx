import CreateComp from 'containers/create';
import { ethers } from 'ethers';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useContract from 'src/ethereum/useContract';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector, userSelector } from 'src/redux/user';
import { SEAT_DISABLE } from 'src/utils/constants';
import tokensOfOwner from 'src/utils/tokenOwnership';

const CreatePage = () => {
	// const [provider] = useEthers();
	const collection = useAppSelector(collectionSelector);
	const network = useAppSelector(networkSelector);
	const user = useAppSelector(userSelector);
	const [tokens, setTokens] = useState({ value: [], loading: true });

	const CollectionFactory = useContract('CollectionFactoryV2', collection.type ?? network.chain, user.provider);

	useEffect(() => {
		if (CollectionFactory && user.address && !SEAT_DISABLE) {
			getSEATDetails();
		} else {
			setTokens({ value: [], loading: false });
		}
	}, [CollectionFactory, user.address]);

	const getSEATDetails = async () => {
		try {
			const abi = getContractDetails('Collection');
			const seatAddress = await CollectionFactory.callStatic.freePass();
			const SEATInstance = new ethers.Contract(`${seatAddress}`, abi, user.provider);
			const tokens = await tokensOfOwner(SEATInstance, user.address);
			setTokens({ value: tokens, loading: false });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Head>
				<title>Simplr | Create Collection</title>
			</Head>
			<CreateComp balance={tokens} />;
		</>
	);
};

export default CreatePage;
