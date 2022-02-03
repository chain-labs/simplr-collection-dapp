import { ethers } from 'ethers';
import { CurrencyEth, DotsThreeOutlineVertical, ImageSquare, Timer, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';

const CollectionPage = ({ contract }) => {
	const dispatch = useAppDispatch();
	const [collectionUri, setCollectionURI] = useState('');
	const [isEditableCollectionUri, setIsEditableCollectionUri] = useState(false);
	const [airdropAddress, setAirdropAddress] = useState('');
	const [edited, setEdited] = useState(false);
	const [adminAddress, setAdminAddress] = useState('0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d');
	const [collection, setCollection] = useState({
		maxTokens: '',
		adminAddress: '',
		reservedTokens: '',
		price: '',
		revealTime: '',
		presalePrice: '',
	});

	useEffect(() => {
		const getDetails = async () => {
			const maxTokens = await contract.callStatic.maximumTokens();
			const adminAddress = await contract.callStatic.owner();
			const reservedTokens = await contract.callStatic.reservedTokens();
			const price = await contract.callStatic.price();
			const revealTime = await contract.callStatic.revealAfterTimestamp();
			const presalePrice = await contract.callStatic.presalePrice();

			const details = {
				maxTokens: ethers.utils.formatUnits(maxTokens, 0),
				adminAddress,
				reservedTokens: ethers.utils.formatUnits(reservedTokens, 0),
				price: ethers.utils.formatUnits(price, 18),
				revealTime: ethers.utils.formatUnits(revealTime, 0),
				presalePrice: ethers.utils.formatUnits(presalePrice, 18),
			};
			setCollection(details);
		};

		if (contract) {
			getDetails();
		}
	}, [contract]);

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
				<DashboardCard Icon={ImageSquare} text="Reserved Tokens" data={collection.reservedTokens} editable="number" />
				<DashboardCard Icon={CurrencyEth} text="Price per NFT (Pre-sale)" data={`${collection.presalePrice} ETH`} />
				<DashboardCard Icon={Timer} text="NFTs reveal in" data="17:00:00" editable="time" />
				<DashboardCard Icon={CurrencyEth} text="Price per NFT (Public sale)" data={`${collection.price} ETH`} />
			</Box>
			<Text as="h3" color="simply-blue" mt="wxl">
				Sales:
			</Text>
			<Box row flexWrap="wrap" between mt="mxxxl">
				<DashboardCard Icon={Timer} text="Pre-sale" status="Paused" editable="status" />
				<DashboardCard Icon={Timer} text="Public-sale goes live in" data="12:00:59" editable="time" />
				<DashboardCard Icon={ImageSquare} text="NFTs sold" data="6100" />
				<DashboardCard Icon={ImageSquare} text="NFTs remaining" data="3900" />
				<DashboardCard Icon={CurrencyEth} text="Funds Collected" data="400 ETH" />
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
			<Box center mb="14rem">
				<ButtonComp bg={edited ? 'primary' : 'tertiary'} width="64rem" height="56px" mx="auto">
					<Text as="h4">Save Changes</Text>
				</ButtonComp>
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

const DashboardCard = ({ text, data, setData, editable, status, Icon }: DashboardCardProps) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(data);

	const handleAction = () => {
		if (editable === 'address' || editable === 'number') {
			setDrawerOpen(false);
			setEditing(true);
		}
	};

	useEffect(() => {
		setValue(data);
	}, [data]);

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
			<Box row between ml="mm" width="40rem">
				<Text as="h5">{text}</Text>
				<If
					condition={!!status}
					then={
						<Text as="h4" color={status === 'Live' || status === 'Sold Out' ? 'green-60' : 'red-50'}>
							{status}
						</Text>
					}
					else={
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
						>
							{!editing ? (
								<Text as="h4" color="simply-blue">
									{editable === 'address' ? getData(value) : data}
								</Text>
							) : null}
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
