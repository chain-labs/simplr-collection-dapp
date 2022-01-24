import { CurrencyEth, DotsThreeOutlineVertical, ImageSquare, Timer, User } from 'phosphor-react';
import { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import theme from 'src/styleguide/theme';

const CollectionPage = () => {
	const [collectionUri, setCollectionURI] = useState('');
	const [isEditableCollectionUri, setIsEditableCollectionUri] = useState(false);
	const [airdropAddress, setAirdropAddress] = useState('');
	const [edited, setEdited] = useState(false);

	return (
		<Box mt="mxxxl" width="116.8rem" mx="auto">
			<Text as="h3" color="simply-blue">
				Overview:
			</Text>
			<Box row flexWrap="wrap" between mt="mxxxl">
				<DashboardCard Icon={ImageSquare} text="Total NFTs" data="10,000" />
				<DashboardCard Icon={User} text="Admin Wallet Address" data="0xa4c...abd" editable="address" />
				<DashboardCard Icon={ImageSquare} text="Reserved Tokens" data="6000" editable="number" />
				<DashboardCard Icon={CurrencyEth} text="Price per NFT (Pre-sale)" data="0.08 ETH" />
				<DashboardCard Icon={Timer} text="NFTs reveal in" data="17:00:00" editable="time" />
				<DashboardCard Icon={CurrencyEth} text="Price per NFT (Public sale)" data="0.01 ETH" />
			</Box>
			<Text as="h3" color="simply-blue" mt="wxl">
				Sales:
			</Text>
			<Box row flexWrap="wrap" between mt="mxxxl">
				<DashboardCard Icon={Timer} text="Pre-sale" status="Live" editable="status" />
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
}

const DashboardCard = ({ text, data, editable, status, Icon }: DashboardCardProps) => {
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
						<Text as="h4" color="simply-blue">
							{data}
						</Text>
					}
				/>
			</Box>
			<If
				condition={!!editable}
				then={
					<Box ml="mxl" center>
						<DotsThreeOutlineVertical color={theme.colors['gray-00']} size="20" weight="fill" />
					</Box>
				}
			/>
		</Box>
	);
};
