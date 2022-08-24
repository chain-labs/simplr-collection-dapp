/* eslint-disable no-console */
import { ethers } from 'ethers';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import { collectionSelector } from 'src/redux/collection';
import { editSelector } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector, setSaleDetails } from 'src/redux/sales';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getUnitByChainId } from 'src/utils/chains';
import tokensOfOwner from 'src/utils/tokenOwnership';
import WhitelistManagement from 'src/utils/WhitelistManager';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import Step2Modal from './CollectionPage/Step2Modal';
import Step3Modal from './CollectionPage/Step3Modal';

interface Props {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	data: string[];
	type: 'whitelist_add' | 'whitelist_remove' | 'airdrop';
	clearInput: () => void;
}

const getInfo = (type: 'whitelist_add' | 'whitelist_remove' | 'airdrop') => {
	switch (type) {
		case 'whitelist_add': {
			return {
				title: 'New Whitelist',
				confirmation: 'Do you want to add these addresses as whitelists?',
				yes: 'Add',
				no: 'No',
			};
		}
		case 'whitelist_remove': {
			return {
				title: 'Remove from Whitelist',
				confirmation: 'Do you want to remove this address from whitelist?',
				yes: 'Remove',
				no: 'No',
			};
		}
		case 'airdrop': {
			return {
				title: 'Confirm Airdrop',
				confirmation: 'Airdropping NFTs from your reserve to these addresses.',
				yes: 'Airdrop',
				no: 'Cancel',
			};
		}
	}
};

const getConfirmInfo = (type: 'whitelist_add' | 'whitelist_remove' | 'airdrop') => {
	switch (type) {
		case 'whitelist_add': {
			return {
				title: 'Added new whitelist addresses',
				confirmation:
					'Successfully added new whitelist addresses to the list. Changes might take a while to reflect on your dashboard.',
			};
		}
		case 'whitelist_remove': {
			return {
				title: 'Removed from Whitelist',
				confirmation:
					'Successfully removed  addresses from whitelist. Changes might take a while to reflect on your dashboard.',
			};
		}
		case 'airdrop': {
			return {
				title: 'Airdrop Successful',
				confirmation:
					'Successfully airdropped NFTs to the address list. Changes might take a while to reflect on your dashboard.',
			};
		}
	}
};

const EditModalv2 = ({ visible, setVisible, data, type, clearInput }: Props) => {
	const [step, setStep] = useState(0);
	const [info, setInfo] = useState(getInfo(type));
	const [fails, setFails] = useState(false);
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();

	const { contract } = useAppSelector(editSelector);
	const [gas, setGas] = useState('');
	const { chain } = useNetwork();
	const provider = useProvider();
	const { data: signer } = useSigner();

	const collection = useAppSelector(collectionSelector);
	const presaleWhitelist = useAppSelector(presaleWhitelistSelector);

	useEffect(() => {
		if (!visible) {
			setStep(0);
			setFails(false);
		}
	}, [visible]);

	useEffect(() => {
		if (step === 0) {
			setInfo(getInfo(type));
		} else if (step === 1) {
			setInfo({ ...info, yes: 'Commit Change', no: 'Cancel' });
		} else if (step === 2) {
			setInfo({ ...info, yes: 'Opening Metamask' });
		} else if (step === 3) {
			setInfo({ ...info, ...getConfirmInfo(type), yes: 'Return to Dashboard' });
		}
	}, [step]);

	useEffect(() => {
		setInfo(getInfo(type));
	}, [type]);

	useEffect(() => {
		let interval;
		const getGasPrice = async () => {
			try {
				const CONTRACT_NAME = await contract.callStatic.CONTRACT_NAME();
				const isERC721 = CONTRACT_NAME === 'Collection';
				const fees = await provider.getGasPrice();
				if (type === 'whitelist_add') {
					const whitelistManager = new WhitelistManagement(presaleWhitelist);
					whitelistManager.addWhitelist(data);
					const newPresaleWhitelistConfig = {
						root: whitelistManager.getRoot(),
						cid: await whitelistManager.getCid(collection.name),
					};
					const gas = await contract.connect(signer).estimateGas.updateWhitelist(newPresaleWhitelistConfig);
					setGas(ethers.utils.formatUnits(gas.mul(fees)));
				} else if (type === 'whitelist_remove') {
					const whitelistManager = new WhitelistManagement(presaleWhitelist);
					whitelistManager.removeWhitelist(data);
					const newPresaleWhitelistConfig = {
						root: whitelistManager.getRoot(),
						cid: await whitelistManager.getCid(collection.name),
					};
					const gas = await contract.connect(signer).estimateGas.updateWhitelist(newPresaleWhitelistConfig);
					setGas(ethers.utils.formatUnits(gas.mul(fees)));
				} else if (type === 'airdrop') {
					if (isERC721) {
						const gas = await contract.connect(signer).estimateGas.transferReservedTokens(data);
						setGas(ethers.utils.formatUnits(gas.mul(fees)));
					} else {
						const tokenIds = await tokensOfOwner(contract, user.address);
						const gas = await contract
							.connect(signer)
							.estimateGas['safeTransferFrom(address,address,uint256)'](user.address, data[0], parseInt(tokenIds[0]));
						setGas(ethers.utils.formatUnits(gas.mul(fees)));
					}
				}
			} catch (err) {
				console.log(err);
				setFails(true);
			}
		};
		const getGasDetails = async () => {
			getGasPrice();
			interval = setInterval(async () => {
				if (step < 2) {
					getGasPrice();
				}
			}, 4000);
		};
		if (step > 0 && signer) getGasDetails();
		return () => {
			clearInterval(interval);
		};
	}, [step]);

	const addWhitelist = async () => {
		try {
			const whitelistManager = new WhitelistManagement(presaleWhitelist);
			whitelistManager.addWhitelist(data);
			const newPresaleWhitelistConfig = {
				root: whitelistManager.getRoot(),
				cid: await whitelistManager.getCid(collection.name),
			};
			const transaction = await contract.connect(signer).updateWhitelist(newPresaleWhitelistConfig);
			if (transaction) {
				setInfo({ ...info, yes: 'Processing Transaction' });
			}
			const event = (await transaction.wait())?.events?.filter((event) => event.event === 'WhitelistUpdated')[0]?.args;
			return event;
		} catch (err) {
			console.log(err);
			toast.error('An unexpected error occured.');
			setVisible(false);
			setStep(0);
			setGas(null);
			setFails(false);
		}
	};

	const removeWhitelist = async () => {
		try {
			const whitelistManager = new WhitelistManagement(presaleWhitelist);
			whitelistManager.removeWhitelist(data);
			const newPresaleWhitelistConfig = {
				root: whitelistManager.getRoot(),
				cid: await whitelistManager.getCid(collection.name),
			};
			const transaction = await contract.connect(signer).updateWhitelist(newPresaleWhitelistConfig);
			if (transaction) {
				setInfo({ ...info, yes: 'Processing Transaction' });
			}
			const event = (await transaction.wait())?.events?.filter((event) => event.event === 'WhitelistUpdated')[0]?.args;
			return event;
		} catch (err) {
			console.log(err);
			toast.error('An unexpected error occured.');
			setVisible(false);
			setStep(0);
			setGas(null);
			setFails(false);
		}
	};

	const airdrop = async () => {
		try {
			const CONTRACT_NAME = await contract.callStatic.CONTRACT_NAME();
			const isERC721 = CONTRACT_NAME === 'Collection';
			if (isERC721) {
				const transaction = await contract.connect(signer).transferReservedTokens(data);
				if (transaction) {
					setInfo({ ...info, yes: 'Processing Transaction' });
				}
				const event = (await transaction.wait())?.events?.filter((event) => event.event === 'Airdrop')[0]?.args;
				return event;
			} else {
				const tokenIds = await tokensOfOwner(contract, user.address);
				const transaction = await contract
					.connect(signer)
					['safeTransferFrom(address,address,uint256)'](user.address, data[0], parseInt(tokenIds[0]));
				if (transaction) {
					setInfo({ ...info, yes: 'Processing Transaction' });
				}
				const event = (await transaction.wait())?.events?.filter((event) => event.event === 'Airdrop')[0]?.args;
				return event;
			}
		} catch (err) {
			console.log(err);
			toast.error('An unexpected error occured.');
			setStep(0);
			setGas(null);
			setFails(false);
			setVisible(false);
		}
	};

	const handleYes = () => {
		if (step === 0) {
			setStep(1);
		} else if (step === 1) {
			if (type === 'whitelist_add') {
				addWhitelist().then(() => {
					const arr = [...presaleWhitelist, ...data];
					dispatch(setSaleDetails({ presaleable: { presaleWhitelist: arr } }));
					setStep(3);
					clearInput();
				});
			} else if (type === 'whitelist_remove') {
				removeWhitelist().then(() => {
					const arr = [...presaleWhitelist].filter((item) => !data.includes(item));
					dispatch(setSaleDetails({ presaleable: { presaleWhitelist: arr } }));
					setStep(3);
					clearInput();
				});
			} else if (type === 'airdrop') {
				airdrop().then(() => {
					setStep(3);
					clearInput();
				});
			}
			setStep(2);
		} else if (step === 3) {
			setStep(0);
			setVisible(false);
			setGas(null);
		}
	};

	if (!visible) return null;
	return ReactDom.createPortal(
		<Modal visible={visible}>
			<Box
				className="absolute-center"
				p="mxl"
				bg="simply-white"
				borderRadius="16px"
				boxShadow="shadow-400"
				maxWidth="38rem"
			>
				<If
					condition={step === 0 || step === 3}
					then={
						<>
							<Text as="h4">{info?.title}</Text>
							<Box height="0.1rem" bg={`${theme.colors['simply-black']}33`} width="100%" my="mxl" />
							<Text as="h6" color="#52575c" mb="mxl">
								{info?.confirmation}
							</Text>
							<Box width="100%" overflowY="auto" maxHeight="9rem">
								{step === 0 ? (
									data.map((item, index) => (
										<Text key={`${type}-${index}`} color="simply-blue" as="c2" mb="mxs">
											{item}
										</Text>
									))
								) : (
									<If
										condition={fails}
										then={
											<Text as="c1" color="red-50" textTransform="uppercase">
												This transaction is Likely to fail due to constant change in gas prices. proceed at your own
												risk.
											</Text>
										}
										else={
											<Text as="c1" color="gray-00" display="flex">
												ESTIMATED GAS COSTS :{' '}
												<Text as="c1" color="simply-blue">
													{gas ? `${gas} ${getUnitByChainId(chain?.id)}` : 'Fetching...'}
												</Text>
											</Text>
										}
									/>
								)}
							</Box>
						</>
					}
					else={step === 1 ? <Step2Modal gas={gas} fails={fails} /> : <Step3Modal />}
				/>
				<Box mt="mxl">
					<ButtonComp
						bg="primary"
						disable={step === 2 || (step === 1 && !gas && !fails)}
						height="36px"
						width="100%"
						onClick={() => handleYes()}
						row
						center
					>
						{info?.yes}
						<If
							condition={step === 2}
							then={
								<Box ml="mxs" center className="spin">
									<CircleNotch size="20" color={theme.colors['simply-gray']} />
								</Box>
							}
						/>
					</ButtonComp>
					<If
						condition={step < 2}
						then={
							<ButtonComp
								bg="secondary"
								mt="mm"
								height="36px"
								width="100%"
								onClick={() => {
									setVisible(false);
									clearInput();
									setGas(null);
									setStep(0);
								}}
							>
								{info?.no}
							</ButtonComp>
						}
					/>
				</Box>
			</Box>
		</Modal>,
		document.getElementById('portal')
	);
};

export default EditModalv2;
