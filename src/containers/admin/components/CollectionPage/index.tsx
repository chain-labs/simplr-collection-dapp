import { ethers } from 'ethers';
import { CurrencyEth, ImageSquare, Timer, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import useEthers from 'src/ethereum/useEthers';
import DashboardCard from './DashboardCard';

import { format } from 'date-fns';
import { formatDate } from 'src/utils/time';

const CollectionPage = ({ contract, metadata }) => {
	const [provider] = useEthers();
	const [collectionUri, setCollectionURI] = useState('');
	const [isEditableCollectionUri, setIsEditableCollectionUri] = useState(false);
	const [airdropAddress, setAirdropAddress] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [adminAddress, setAdminAddress] = useState('');
	const [edit, setEdit] = useState('');
	const [collection, setCollection] = useState({
		maxTokens: '',
		adminAddress: '',
		reservedTokens: '',
		price: '',
		presalePrice: '',
		totalSupply: 0,
		tokensCount: '',
		totalFunds: '',
		saleStartTime: 0,
		presaleStartTime: 0,
	});

	useEffect(() => {
		const getDetails = async () => {
			const maxTokens = await contract.callStatic.maximumTokens();
			const adminAddress = await contract.callStatic.owner();
			const reservedTokens = await contract.callStatic.reservedTokens();
			const price = await contract.callStatic.price();
			const totalSupply = await contract.callStatic.totalSupply();
			const balance = await provider?.getBalance(contract.address);
			const totalReleased = await contract.callStatic['totalReleased()']();
			const totalFunds = balance.add(totalReleased);
			const tokensCount = await contract.callStatic.tokensCount();
			const saleStartTime = await contract.callStatic.publicSaleStartTime();
			const details = {
				maxTokens: ethers.utils.formatUnits(maxTokens, 0),
				adminAddress,
				reservedTokens: ethers.utils.formatUnits(reservedTokens, 0),
				price: ethers.utils.formatUnits(price, 18),
				presalePrice: '-1',
				totalSupply,
				totalFunds: ethers.utils.formatUnits(totalFunds),
				tokensCount: `${parseInt(ethers.utils.formatUnits(tokensCount, 0))}`,
				saleStartTime,
				presaleStartTime: 0,
			};

			const isPresaleable = await contract.callStatic.isPresaleAllowed();
			if (isPresaleable) {
				const presalePrice = await contract.callStatic.presalePrice();
				const presaleStartTime = await contract.callStatic.presaleStartTime();
				details.presalePrice = ethers.utils.formatUnits(presalePrice, 18);
				details.presaleStartTime = presaleStartTime;
			}
			setCollection(details);
		};

		if (contract && provider) {
			getDetails();

			setInterval(getDetails, 150000);
		}
	}, [contract, provider, metadata]);

	if (!collection.price) {
		return (
			<Box center mt="mxxxl">
				<Text as="h1">Loading...</Text>
			</Box>
		);
	}
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
						setData={setAdminAddress}
						editable="address"
						type="string"
						setShowModal={setShowModal}
						showModal={showModal}
						edit={edit}
						setEdit={setEdit}
						placeholder="new_admin_address"
					/>
					<If
						condition={collection.presalePrice !== '-1'}
						then={
							<DashboardCard
								Icon={ImageSquare}
								text="Reserved Tokens"
								data={collection.reservedTokens}
								editable="number"
								type="number"
								setShowModal={setShowModal}
								showModal={showModal}
								edit={edit}
								setEdit={setEdit}
								placeholder="Reserved Tokens"
							/>
						}
					/>
					<If
						condition={collection.presalePrice !== '-1'}
						then={
							<DashboardCard
								Icon={CurrencyEth}
								text="Price per NFT (Pre-sale)"
								data={`${collection.presalePrice} ETH`}
							/>
						}
					/>

					<DashboardCard
						Icon={Timer}
						text="NFTs reveal in"
						data="17:00:00"
						editable="time"
						type="time"
						setShowModal={setShowModal}
						showModal={showModal}
						edit={edit}
						setEdit={setEdit}
					/>

					<DashboardCard Icon={CurrencyEth} text="Price per NFT (Public sale)" data={`${collection.price} ETH`} />
				</Box>
				<Text as="h3" color="simply-blue" mt="wxl">
					Sales:
				</Text>
				<Box row flexWrap="wrap" between mt="mxxxl">
					<If
						condition={collection.presalePrice !== '-1'}
						then={<DashboardCard Icon={Timer} text="Pre-sale" status="Live" editable="status" />}
					/>
					<DashboardCard
						Icon={Timer}
						text="Public-sale goes live in"
						data="12:00:59"
						editable="time"
						type="time"
						setShowModal={setShowModal}
						showModal={showModal}
						edit={edit}
						setEdit={setEdit}
					/>
					<DashboardCard Icon={ImageSquare} text="NFTs sold" data="6100" />
					<DashboardCard
						Icon={ImageSquare}
						text="NFTs remaining"
						data={`${parseInt(collection.maxTokens) - collection.totalSupply}`}
					/>
					<DashboardCard Icon={CurrencyEth} text="Funds Collected" data="400 ETH" />
				</Box>
				<Text as="h3" color="simply-blue" mt="wxl">
					URI:
				</Text>
				<Box row between mt="mxxxl">
					<Box flex={1}>
						<Box row between mb="mxs">
							<Text as="h6">Collection URI</Text>
							<Text
								as="h6"
								color="simply-blue"
								textDecoration="underline"
								onClick={() => setIsEditableCollectionUri(true)}
							>
								Edit
							</Text>
						</Box>
						<TextInput
							placeholder="https://gdrive.com/***"
							value={collectionUri}
							setValue={setCollectionURI}
							disableValidation
							disabled={!isEditableCollectionUri}
							width="100%"
						/>
					</Box>
				</Box>
				<If
					condition={collection.presalePrice !== '-1'}
					then={
						<DashboardCard Icon={CurrencyEth} text="Price per NFT (Pre-sale)" data={`${collection.presalePrice} ETH`} />
					}
				/>
				{/* <DashboardCard Icon={Timer} text="NFTs reveal in" data="17:00:00" editable="time" /> */}
				<DashboardCard Icon={CurrencyEth} text="Price per NFT (Public sale)" data={`${collection.price} ETH`} />
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
								/>
							}
							else={
								<DashboardCard
									Icon={Timer}
									text="Pre-Sale"
									status={collection.saleStartTime > Date.now() / 1000 ? 'Live' : 'Ended'}
									editable="status"
								/>
							}
						/>
					}
				/>
				<If
					condition={collection.saleStartTime > Date.now() / 1000}
					then={
						<DashboardCard
							Icon={Timer}
							text="Public-sale goes live in"
							data={`${collection.saleStartTime}`}
							editable="time"
						/>
					}
					else={<DashboardCard Icon={Timer} text="Sale" status={'Live'} editable="status" />}
				/>
				<DashboardCard Icon={ImageSquare} text="NFTs sold" data={collection.tokensCount} />
				<DashboardCard
					Icon={ImageSquare}
					text="NFTs remaining"
					data={`${parseInt(collection.maxTokens) - collection.totalSupply}`}
				/>
				<DashboardCard Icon={CurrencyEth} text="Funds Collected" data={`${collection.totalFunds} ETH`} />
			</Box>
			<Text as="h3" color="simply-blue" mt="wxl">
				URI:
			</Text>
			<Box row between mt="mxxxl">
				<Box flex={1}>
					<Box row between mb="mxs">
						<Text as="h6">Collection URI</Text>
						<Text as="h6" color="simply-blue" textDecoration="underline">
							Edit
						</Text>
					</Box>
				</Box>
				<Text as="h3" color="simply-blue" mt="wxl">
					Airdrop:
				</Text>
				<Box mt="mxl" width="55.2rem">
					<LabelledTextInput
						value={airdropAddress}
						setValue={setAirdropAddress}
						placeholder="Enter a valid wallet address"
						label="Airdrop NFTs:"
						helperText="Airdrop an NFT from your reserve to any wallet address."
						disableValidation
						width="100%"
					/>
					<Box row justifyContent="flex-end" mt="mxl" mb="wm">
						<ButtonComp bg="tertiary" height="40px" width="9.2rem" disable={!airdropAddress}>
							<Text as="h6">Airdrop</Text>
						</ButtonComp>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default CollectionPage;
