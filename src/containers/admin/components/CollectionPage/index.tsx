import { ethers } from 'ethers';
import { CurrencyEth, ImageSquare, Timer, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import useEthers from 'src/ethereum/useEthers';
import { setEditDetails } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setSaleDetails } from 'src/redux/sales';
import { userSelector } from 'src/redux/user';
import DashboardCard from './DashboardCard';
import Whitelists from './Whitelists';
import Airdrop from './Airdrop';
import { getUnitByChainId } from 'src/utils/chains';
import axios from 'axios';
import { setCollectionDetails } from 'src/redux/collection';
import tokensOfOwner from 'src/utils/tokenOwnership';
import WhitelistManagement from 'src/utils/WhitelistManager';

const CollectionPage = ({ contract, metadata, ready }) => {
	const [provider] = useEthers();
	const [collectionUri, setCollectionURI] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [adminAddress, setAdminAddress] = useState('');
	const [loadPercentage, setLoadPercentage] = useState(1);

	const [edit, setEdit] = useState('');
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const [collection, setCollection] = useState({
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

	const handleAction = (editData, type, placeholder, valueData) => {
		setShowModal(true);
		const editableData = {
			type: type,
			label: editData,
			placeholder: placeholder,
			data: valueData,
			editable: type,
			editfield: editData,
			adminAddress: collection.adminAddress,
		};
		dispatch(setEditDetails(editableData));
	};

	if (loadPercentage < 100) {
		return (
			<Box center my="mxxxl" column>
				<Text as="b1">Fetching collection information...</Text>
				<Box mt="mm">
					<Box height="0.4rem" width="10rem" bg="#c4c4c4" borderRadius="16px">
						<Box
							height="100%"
							borderRadius="16px"
							width={`${loadPercentage}%`}
							css={`
								transition: width ${loadPercentage > 95 ? '0.5s' : '7s'} ease-in-out;
							`}
							bg="simply-blue"
						/>
					</Box>
				</Box>
			</Box>
		);
	} else {
		return (
			<Box overflow="visible">
				<Box mt="mxxxl" width="116.8rem" mx="auto">
					<Text as="h3" color="simply-blue">
						Overview:
					</Text>
					<Box row flexWrap="wrap" between mt="mxxxl">
						<DashboardCard Icon={ImageSquare} text="Total NFTs" data={collection.maxTokens} />
						<DashboardCard
							Icon={User}
							text="Admin Wallet Address"
							data={collection.adminAddress}
							editable="address"
							type="string"
							setShowModal={setShowModal}
							showModal={showModal}
							edit={edit}
							setEdit={setEdit}
							placeholder="new_admin_address"
							editfield="wallet address"
							admin={collection.adminAddress}
						/>
						<If
							condition={parseInt(collection.reservedTokens) > 0}
							then={
								<DashboardCard
									Icon={ImageSquare}
									text="Reserved Tokens"
									data={collection.reservedTokens}
									editable={parseInt(collection.tokensCount) < 1 ? 'number' : null}
									type="number"
									setShowModal={setShowModal}
									showModal={showModal}
									edit={edit}
									setEdit={setEdit}
									placeholder="Reserved Tokens"
									editfield="reserve tokens"
									admin={collection.adminAddress}
								/>
							}
						/>
						<If
							condition={collection.presalePrice !== '-1'}
							then={
								<DashboardCard
									Icon={CurrencyEth}
									text="Price per NFT (Pre-sale)"
									data={`${collection.presalePrice} ${getUnitByChainId(user.network.chain)}`}
								/>
							}
						/>
						{!collection.revealed ? (
							<DashboardCard
								Icon={Timer}
								text="Reveal NFTS"
								editfield="Reveal"
								showModal={showModal}
								type="url"
								setShowModal={setShowModal}
								placeholder="https://"
								data={collection.projectURI}
							/>
						) : (
							''
						)}
						<DashboardCard
							Icon={CurrencyEth}
							text="Price per NFT (Public sale)"
							data={`${collection.price} ${getUnitByChainId(user.network.chain)}`}
						/>
					</Box>
					<Text as="h3" color="simply-blue" mt="wxl">
						Sales:
					</Text>
					<Box row flexWrap="wrap" between mt="mxxxl">
						<If
							condition={collection.presalePrice !== '-1'}
							then={
								<If
									condition={collection.presaleStartTime > Date.now() / 1000}
									then={
										<DashboardCard
											Icon={Timer}
											text="Pre-sale goes live in"
											data={`${collection.presaleStartTime}`}
											editable="time"
											showModal={showModal}
											setShowModal={setShowModal}
											admin={collection.adminAddress}
											timeType="presale"
										/>
									}
									else={
										<DashboardCard
											Icon={Timer}
											text="Pre-Sale"
											status={collection.saleStartTime > Date.now() / 1000 ? 'Live' : 'Ended'}
											editable="status"
											showModal={showModal}
											setShowModal={setShowModal}
											admin={collection.adminAddress}
										/>
									}
								/>
							}
						/>
						<If
							condition={
								collection.presaleStartTime > Date.now() / 1000 || collection.saleStartTime > Date.now() / 1000
							}
							then={
								<DashboardCard
									Icon={Timer}
									text="Public-sale goes live in"
									data={`${collection.saleStartTime}`}
									editable="time"
									admin={collection.adminAddress}
									timeType="sale"
								/>
							}
							else={
								<DashboardCard
									Icon={Timer}
									admin={collection.adminAddress}
									text="Sale"
									status={
										collection.saleStartTime < Date.now() / 1000 && !collection.paused
											? 'Live'
											: collection.paused
											? 'Paused'
											: 'Ended'
									}
									data={`${collection.saleStartTime}`}
									editable="status"
									showModal={showModal}
									setShowModal={setShowModal}
								/>
							}
						/>
						<DashboardCard
							Icon={ImageSquare}
							text="NFTs sold"
							data={
								collection.collectionName === 'CollectionA'
									? `${collection.totalSupply - parseInt(collection.reservedTokens)}`
									: `${collection.totalSupply}`
							}
						/>
						<DashboardCard
							Icon={ImageSquare}
							text="NFTs remaining"
							data={
								collection.collectionName === 'CollectionA'
									? `${parseInt(collection.maxTokens) - collection.totalSupply}`
									: `${parseInt(collection.maxTokens) - collection.totalSupply - parseInt(collection.reservedTokens)}`
							}
						/>
						<DashboardCard
							Icon={CurrencyEth}
							text="Funds Collected"
							data={`${collection.totalFunds} ${getUnitByChainId(user.network.chain)}`}
						/>
						<DashboardCard
							Icon={ImageSquare}
							text="Reserved Tokens remaining"
							data={`${collection.reservedTokensCount.length}`}
						/>
					</Box>

					<Text as="h3" color="simply-blue" mt="wxl">
						URI:
					</Text>
					<Box row between mt="mxxxl" mb="wxl">
						<Box>
							<Box row between mb="mxs">
								<Text as="h6">Collection URI</Text>

								<Text
									as="h6"
									color="simply-blue"
									textDecoration="underline"
									cursor={collection.adminAddress === user.address ? 'pointer' : 'not-allowed'}
									onClick={
										collection.adminAddress === user.address
											? () => handleAction('Collection URI', 'url', 'https://', collectionUri)
											: () => setAdminAddress(adminAddress)
									}
								>
									Edit
								</Text>
							</Box>
							<TextInput
								placeholder="https://gdrive.com/***"
								value={''}
								setValue={setCollectionURI}
								disableValidation
								width="100%"
								disabled
							/>
							<Text as="b1" mt="mxs" color="gray-00">
								Collection URI is the URL where your NFT media and metadata are stored.{' '}
							</Text>
						</Box>
						<Box ml="wm" />
						<If
							condition={!collection.revealed}
							then={
								<Box flex={1}>
									<Text as="h6" mb="mxs">
										Loading Image URI
									</Text>
									<TextInput
										placeholder="https://gdrive.com/somethingurl"
										value={collection.projectURI}
										disableValidation
										disabled
										width="100%"
									/>
									<Text as="b1" mt="mxs" color="gray-00">
										Placeholder image that will be displayed until the set reveal time.
									</Text>
								</Box>
							}
						/>
					</Box>
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
