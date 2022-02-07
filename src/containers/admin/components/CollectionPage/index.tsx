import { ethers } from 'ethers';
import { CurrencyEth, DotsThreeOutlineVertical, ImageSquare, Timer, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import useEthers from 'src/ethereum/useEthers';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';

import { format } from 'date-fns';
import { formatDate } from 'src/utils/time';

const CollectionPage = ({ contract, metadata }) => {
	const dispatch = useAppDispatch();
	const [provider] = useEthers();
	const [collectionUri, setCollectionURI] = useState('');
	const [isEditableCollectionUri, setIsEditableCollectionUri] = useState(false);
	const [airdropAddress, setAirdropAddress] = useState('');
	const [adminAddress, setAdminAddress] = useState('');
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
				/>
				<If
					condition={collection.presalePrice !== '-1'}
					then={
						<DashboardCard
							Icon={ImageSquare}
							text="Reserved Tokens"
							data={collection.reservedTokens}
							editable="number"
						/>
					}
				/>
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
					<TextInput
						placeholder="https://gdrive.com/***"
						value={collectionUri}
						setValue={setCollectionURI}
						disableValidation
						disabled={!isEditableCollectionUri}
						width="100%"
					/>
					<Text as="b1" mt="mxs" color="gray-00">
						Collection URI is the URL where your NFT media and metadata are stored.{' '}
					</Text>
				</Box>
				<Box ml="wm" />
				<Box flex={1}>
					<Text as="h6" mb="mxs">
						Loading Image URI
					</Text>
					<TextInput
						placeholder="https://gdrive.com/somethingurl"
						value="https://gdrive.com/somethingurl"
						disableValidation
						disabled
						width="100%"
					/>
					<Text as="b1" mt="mxs" color="gray-00">
						Placeholder image that will be displayed until the set reveal time.
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
	);
};

export default CollectionPage;

interface DashboardCardProps {
	Icon: React.ReactNode;
	text: string;
	data?: string;
	editable?: 'address' | 'time' | 'number' | 'status';
	status?: 'Live' | 'Paused' | 'Sold Out' | 'Ended';
	setData?: (any) => void;
}

const DAY_SECONDS = 86400;
const HOUR_SECONDS = 3600;
const MINUTE_SECONDS = 60;

const DashboardCard = ({ text, data, setData, editable, status, Icon }: DashboardCardProps) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(data);
	const [tooltipView, setTooltipView] = useState(false);

	const handleAction = () => {
		if (editable === 'address' || editable === 'number') {
			setDrawerOpen(false);
			setEditing(true);
		}
	};

	useEffect(() => {
		setValue(data);
		if (editable === 'time') {
			const time = parseInt(data);

			setInterval(() => {
				const now = Date.now() / 1000;
				const remaining = time - now;
				if (remaining > DAY_SECONDS) {
					const days = Math.floor(remaining / DAY_SECONDS);
					const hours = Math.floor((remaining - DAY_SECONDS * days) / HOUR_SECONDS);
					const minutes = Math.floor((remaining - DAY_SECONDS * days - hours * HOUR_SECONDS) / MINUTE_SECONDS);
					const seconds = Math.floor(remaining - DAY_SECONDS * days - hours * HOUR_SECONDS - minutes * MINUTE_SECONDS);
					const countdown = `${days < 10 ? 0 : ''}${days}:${hours < 10 ? 0 : ''}${hours}:${
						minutes < 10 ? 0 : ''
					}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
					setValue(countdown);
				} else {
					const hours = Math.floor(remaining / HOUR_SECONDS);
					const minutes = Math.floor((remaining - hours * HOUR_SECONDS) / MINUTE_SECONDS);
					const seconds = Math.floor(remaining - hours * HOUR_SECONDS - minutes * MINUTE_SECONDS);
					const countdown = `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
					setValue(countdown);
				}
			}, 1000);
		}
	}, [data, setValue]);

	const getData = (data) => {
		if (editable === 'address') {
			if (data.length > 10) {
				return `${value.substr(0, 4)}...${value.substr(-4)}`;
			}
			return data;
		}
	};

	return (
		<Box
			row
			width="55.2rem"
			height="7.2rem"
			alignItems="center"
			border="1px solid"
			borderColor="#DCDCE880"
			borderRadius="8px"
			px="mxl"
			mb="mm"
		>
			<Box center width="4.8rem" height="4.8rem" borderRadius="50%" bg="blue-00">
				{/* @ts-expect-error Icon as props */}
				<Icon color={theme.colors['simply-blue']} size="20" weight="bold" />
			</Box>
			<Box row between ml="mm" width="40rem" position="relative">
				<Text as="h5">{text}</Text>
				<If
					condition={!!status}
					then={
						<Text as="h4" color={status === 'Live' || status === 'Sold Out' ? 'green-60' : 'red-50'}>
							{status}
						</Text>
					}
					else={
						<Box>
							<If
								condition={editable === 'time'}
								then={
									<Box
										position="absolute"
										width="auto"
										top="0"
										right="0"
										display={tooltipView ? 'block' : 'none'}
										bg="white-00"
										border={`1px solid ${theme.colors['white-20']}`}
										borderRadius="4px"
										boxShadow="shadow-100"
										px="ms"
										py="mxs"
									>
										<Text as="c3">{`Goes Live on ${formatDate(data)}`}</Text>
									</Box>
								}
							/>
							<Box
								bg={editable === 'address' ? (editing ? 'simply-white' : 'blue-00') : 'transparent'}
								borderRadius="8px"
								border={editing ? '1px solid' : 'none'}
								borderColor={editing ? '#dcdce8' : 'transparent'}
								outline="none"
								px={editable === 'address' || editable === 'number' ? (editing ? 'mxs' : 'mxl') : '0'}
								py={editable === 'address' || editable === 'number' ? 'mxs' : '0'}
								as={editing ? 'input' : null}
								type={editing && editable === 'number' ? 'number' : 'text'}
								value={value}
								onChange={(e) => setValue(e.target.value)}
								fontFamily="inherit"
								fontSize="1.4rem"
								onMouseOver={() => setTooltipView(true)}
								onMouseOut={() => setTimeout(() => setTooltipView(false), 3000)}
							>
								{!editing ? (
									<Text as="h4" color="simply-blue">
										{editable === 'address' ? getData(value) : editable === 'time' ? value : data}
									</Text>
								) : null}
							</Box>
						</Box>
					}
				/>
			</Box>
			<If
				condition={!!editable && (status === 'Sold Out' || status !== 'Ended')}
				then={
					<Box position="relative" onMouseLeave={() => setTimeout(() => setDrawerOpen(false), 1000)} cursor="pointer">
						<Box ml="mxl" center onClick={() => setDrawerOpen(true)}>
							<DotsThreeOutlineVertical color={theme.colors['gray-00']} size="20" weight="fill" />
						</Box>
						<If
							condition={drawerOpen}
							then={
								<Box
									px="mm"
									py="mxs"
									bg="white-00"
									border="1px solid"
									borderColor="white-20"
									boxShadow="0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)"
									borderRadius="4px"
									position="absolute"
									left="25px"
									cursor="pointer"
									onClick={handleAction}
								>
									<Text as="c3">{status === 'Live' ? 'Pause' : status === 'Paused' ? 'Resume' : 'Edit'}</Text>
								</Box>
							}
						/>
					</Box>
				}
			/>
		</Box>
	);
};
