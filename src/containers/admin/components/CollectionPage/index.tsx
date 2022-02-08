import { ethers } from 'ethers';
import { CurrencyEth, ImageSquare, Timer, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import WhitelistModal from 'src/containers/create/components/SalesPage/WhitelistModal';
import useEthers from 'src/ethereum/useEthers';
import { setEditDetails } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector, setSaleDetails } from 'src/redux/sales';
import { userSelector } from 'src/redux/user';
import EditModalv2 from '../EditModalv2';
import DashboardCard from './DashboardCard';

const CollectionPage = ({ contract, metadata }) => {
	const [provider] = useEthers();
	const [collectionUri, setCollectionURI] = useState('');
	const [isEditableCollectionUri, setIsEditableCollectionUri] = useState(false);
	const [airdropAddress, setAirdropAddress] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [adminAddress, setAdminAddress] = useState('');
	const [edit, setEdit] = useState('');
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
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
			try {
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

				const whitelist = await contract.callStatic.getPresaleWhitelists();
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
					dispatch(setSaleDetails({ presaleable: { presaleWhitelist: whitelist } }));
				}
				setCollection(details);
			} catch (err) {
				console.log(err);
			}
		};

		if (contract && provider) {
			getDetails();

			setInterval(getDetails, 15000);
		}
	}, [contract, provider, metadata]);

	if (!collection.price) {
		return (
			<Box center mt="mxxxl">
				<Text as="h1">Loading...</Text>
			</Box>
		);
	}

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
								data={`${collection.presalePrice} ETH`}
							/>
						}
					/>
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
										showModal={showModal}
										setShowModal={setShowModal}
										admin={collection.adminAddress}
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
						condition={collection.saleStartTime > Date.now() / 1000}
						then={
							<DashboardCard
								Icon={Timer}
								text="Public-sale goes live in"
								data={`${collection.saleStartTime}`}
								editable="time"
								admin={collection.adminAddress}
							/>
						}
						else={
							<DashboardCard
								Icon={Timer}
								admin={collection.adminAddress}
								text="Sale"
								status={'Live'}
								editable="status"
							/>
						}
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
				<If
					condition={!!collection.presalePrice && collection.saleStartTime > Date.now() / 1000}
					then={<Whitelists admin={collection.adminAddress} />}
				/>
			</Box>
		</Box>
	);
};

export default CollectionPage;

const Whitelists = ({ admin }) => {
	const [whitelist, setWhitelist] = useState('');
	const [whitelistRemove, setWhitelistRemove] = useState('');
	const [whitelistModalOpen, setWhitelistModalOpen] = useState(false);
	const [whitelistArray, setWhitelistArray] = useState([]);
	const [addModal, setAddModal] = useState(false);
	const [removeModal, setRemoveModal] = useState(false);
	const dispatch = useAppDispatch();
	const presaleWhitelist = useAppSelector(presaleWhitelistSelector);
	const user = useAppSelector(userSelector);

	const handleAdd = () => {
		const whitelistString = whitelist.replace(/\s+/g, '');
		const whitelistsArray = whitelistString.split(',');
		const list = [...whitelistsArray, ...presaleWhitelist];
		let err = false;

		whitelistsArray.every((address, index) => {
			if (!ethers.utils.isAddress(address)) {
				toast.error('Please check if all addresses are valid.');
				err = true;
				return false;
			} else if (list.lastIndexOf(address) !== index) {
				toast.error('Please remove duplicate addresses found in the list.');
				err = true;
				return false;
			}
			return true;
		});

		if (!err) {
			setAddModal(true);
			setWhitelistArray(whitelistsArray);
			dispatch(setEditDetails({ data: whitelistsArray }));
		}
	};

	const handleRemove = () => {
		if (!presaleWhitelist.includes(whitelistRemove)) {
			toast.error('Address not found in whitelist.');
		} else if (!ethers.utils.isAddress(whitelistRemove)) {
			toast.error('Please check if the address is valid.');
		} else {
			setRemoveModal(true);
			dispatch(setEditDetails({ data: [...presaleWhitelist] }));
		}
	};

	return (
		<Box>
			<Text as="h3" color="simply-blue" mt="wxl">
				Whitelists:
			</Text>
			<Box mt="mxl" width="55.2rem">
				<LabelledTextInput
					value={whitelist}
					setValue={setWhitelist}
					placeholder="Enter a valid wallet address"
					label="Add new Whitelist:"
					helperText="You can add multiple addresses seperated by a comma ( , )."
					disableValidation
					width="100%"
					disabled={admin !== user.address}
				/>
				<Box row justifyContent="flex-end" mt="mxl" mb="wm">
					<ButtonComp bg="tertiary" height="40px" px="mxl" onClick={() => setWhitelistModalOpen(true)} mr="mxs">
						<Text as="h6">View Whitelist</Text>
					</ButtonComp>
					<ButtonComp
						bg="primary"
						height="40px"
						px="mxl"
						disable={!whitelist}
						onClick={() => handleAdd()}
						display={admin === user.address ? 'block' : 'none'}
					>
						<Text as="h6">Add</Text>
					</ButtonComp>
					<WhitelistModal visible={whitelistModalOpen} setVisible={setWhitelistModalOpen} readOnly />
					<EditModalv2
						visible={addModal}
						setVisible={setAddModal}
						data={[...whitelistArray, ...presaleWhitelist]}
						type="whitelist_add"
					/>
				</Box>
			</Box>
			<Box mt="mxl" width="55.2rem" display={admin === user.address ? 'block' : 'none'}>
				<LabelledTextInput
					value={whitelistRemove}
					setValue={setWhitelistRemove}
					placeholder="Enter a valid wallet address"
					label="Remove from Whitelist:"
					helperText="You can add multiple addresses seperated by a comma ( , )."
					disableValidation
					width="100%"
				/>
				<Box row justifyContent="flex-end" mt="mxl" mb="wm">
					<ButtonComp bg="secondary" height="40px" px="mxl" disable={!whitelistRemove} onClick={() => handleRemove()}>
						<Text as="h6">Remove</Text>
					</ButtonComp>
					<EditModalv2
						visible={removeModal}
						setVisible={setRemoveModal}
						data={[whitelistRemove]}
						type="whitelist_remove"
					/>
				</Box>
			</Box>
		</Box>
	);
};
