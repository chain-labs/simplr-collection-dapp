/* eslint-disable no-console */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import useEthers from 'src/ethereum/useEthers';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setSaleDetails } from 'src/redux/pricing';
import { userSelector } from 'src/redux/user';
import Whitelists from './Whitelists';
import Airdrop from './Airdrop';
import axios from 'axios';
import { setCollectionDetails } from 'src/redux/collection';
import tokensOfOwner from 'src/utils/tokenOwnership';
import LoadingSection from './LoadingSection';
import OverviewSection, { IAdminCollection } from './OverviewSection';
import SalesSection from './SalesSection';
import URISection from './URISection';

const CollectionPage = ({ contract, metadata, ready }) => {
	const [provider] = useEthers();
	const [showModal, setShowModal] = useState(false);
	const [loadPercentage, setLoadPercentage] = useState(1);

	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const [collection, setCollection] = useState<IAdminCollection>({
		collectionName: '',
		maxTokens: '',
		adminAddress: '',
		reservedTokens: '',
		reservedTokensCount: [],
		price: '',
		presalePrice: '',
		totalSupply: 0,
		tokensCount: '',
		totalFunds: '',
		saleStartTime: 0,
		presaleStartTime: 0,
		paused: '',
		projectURI: '',
		revealed: false,
	});

	useEffect(() => {
		const getDetails = async () => {
			try {
				const COLLECTION_NAME = await contract.callStatic.CONTRACT_NAME();
				const maxTokens = await contract.callStatic.maximumTokens();
				const adminAddress = await contract.callStatic.owner();
				const reservedTokens = await contract.callStatic.reservedTokens();
				const reservedTokensCount =
					COLLECTION_NAME === 'CollectionA'
						? await tokensOfOwner(contract, adminAddress)
						: new Array(reservedTokens - (await contract.callStatic.reserveTokenCounter()));
				const price = await contract.callStatic.price();
				const balance = await provider?.getBalance(contract.address);
				const totalReleased = await contract.callStatic['totalReleased()']();
				const totalFunds = balance.add(totalReleased);
				let tokensCount;
				if (COLLECTION_NAME === 'Collection') {
					tokensCount = await contract.callStatic.tokensCount();
				} else {
					tokensCount = await contract.callStatic.totalSupply();
				}
				const saleStartTime = await contract.callStatic.publicSaleStartTime();
				const paused = await contract.callStatic.paused();
				const projectURI = await contract.callStatic.projectURI();
				const revealed = await contract.callStatic.isRevealed();
				const details = {
					collectionName: COLLECTION_NAME,
					maxTokens: ethers.utils.formatUnits(maxTokens, 0),
					adminAddress,
					reservedTokens: ethers.utils.formatUnits(reservedTokens, 0),
					reservedTokensCount,
					price: ethers.utils.formatUnits(price, 18),
					presalePrice: '-1',
					totalSupply: tokensCount,
					totalFunds: ethers.utils.formatUnits(totalFunds),
					tokensCount: `${parseInt(ethers.utils.formatUnits(tokensCount ?? '0', 0))}`,
					saleStartTime,
					presaleStartTime: 0,
					paused,
					projectURI,
					revealed,
				};

				const isPresaleable = await contract.callStatic.isPresaleAllowed();
				if (isPresaleable) {
					const presalePrice = await contract.callStatic.presalePrice();
					const presaleStartTime = await contract.callStatic.presaleStartTime();
					details.presalePrice = ethers.utils.formatUnits(presalePrice, 18);
					details.presaleStartTime = presaleStartTime;
					const isWhitelisted = await contract.callStatic.isPresaleWhitelisted();
					if (isWhitelisted) {
						const whitelistInfo = await contract.callStatic.getPresaleWhitelists();
						const whitelist = await axios.get('https://simplr.mypinata.cloud/ipfs/' + whitelistInfo.cid);
						dispatch(setSaleDetails({ presaleable: { presaleWhitelist: whitelist.data.addresses } }));
					}
				}
				setCollection(details);
				dispatch(setCollectionDetails({ name: metadata?.collectionDetails?.name }));
				return details;
			} catch (error) {
				console.log(error);
			}
		};

		if (contract && provider && ready) {
			setLoadPercentage(95);
			getDetails().then(() => {
				setLoadPercentage(100);
			});

			setInterval(getDetails, 15000);
		}
	}, [contract, provider, metadata, ready]);

	if (loadPercentage < 100) {
		return <LoadingSection loadPercentage={loadPercentage} />;
	} else {
		return (
			<Box overflow="visible">
				<Box mt="mxxxl" width="116.8rem" mx="auto">
					<Text as="h3" color="simply-blue">
						Overview:
					</Text>
					<OverviewSection collection={collection} showModal={showModal} setShowModal={setShowModal} />
					<Text as="h3" color="simply-blue" mt="wxl">
						Sales:
					</Text>
					<SalesSection collection={collection} showModal={showModal} setShowModal={setShowModal} />
					<Text as="h3" color="simply-blue" mt="wxl">
						URI:
					</Text>
					<URISection collection={collection} setShowModal={setShowModal} />
					<If
						condition={user.address === collection.adminAddress}
						then={<Airdrop contractName={collection.collectionName} />}
					/>
					<If
						condition={parseFloat(collection.presalePrice) >= 0 && collection.saleStartTime > Date.now() / 1000}
						then={<Whitelists admin={collection.adminAddress} />}
					/>
				</Box>
			</Box>
		);
	}
};

export default CollectionPage;
