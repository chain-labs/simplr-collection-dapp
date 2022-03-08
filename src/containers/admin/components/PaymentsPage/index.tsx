import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';
import RoyaltyEditModal from './RoyaltyEditModal';
import WithdrawModal from './WithdrawModal';

const PaymentsPage = ({ contract, metadata, ready }) => {
	const [payees, setPayees] = useState<string[]>([]);
	const [shares, setShares] = useState<number[]>([]);
	const [simplrShares, setSimplrShares] = useState<number>(0);
	const [userShare, setUserShare] = useState('');
	const [pendingPayment, setPendingPayment] = useState('');
	const [totalFunds, setTotalFunds] = useState('');
	const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(0);
	const [admin, setAdmin] = useState('');

	const [provider] = useEthers();
	const [signer] = useSigner(provider);

	const user = useAppSelector(userSelector);

	useEffect(() => {
		const getDetails = async () => {
			const simplrShares = await contract.callStatic.SIMPLR_SHARES();
			setSimplrShares(simplrShares);
		};
		if (contract && ready) {
			getDetails();
		}
	}, [contract, ready]);

	useEffect(() => {
		const hydrate = () => {
			try {
				if (metadata) {
					const getPayment = async (share) => {
						if (provider) {
							const balance = await provider?.getBalance(contract.address);
							const totalReleased = await contract.callStatic['totalReleased()']();
							const totalFunds = balance.add(totalReleased);
							const totalShares = await contract.callStatic.totalShares();
							const released = await contract.callStatic['released(address)'](user.address);
							const userShare = ethers.utils.parseUnits(share.toString(), 16);
							const pendingPayment = totalFunds.mul(userShare).div(totalShares).sub(released);
							setTotalFunds(ethers.utils.formatUnits(totalFunds));
							setPendingPayment(ethers.utils.formatUnits(pendingPayment));
							const admin = await contract.callStatic.owner();
							setAdmin(admin);
						}
					};
					const { tokenDetails } = metadata;
					const payees: string[] = tokenDetails.paymentSplitter.payees;
					const shares = tokenDetails.paymentSplitter.shares;
					setPayees(payees);
					setShares(shares);
					const index = payees.findIndex((payee) => payee === user.address);
					if (index !== -1) {
						const share = shares[index];

						setUserShare(share.toString());
						if (contract) {
							getPayment(share);
						}
					}
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (isWithdrawModalOpen === 0 && ready) hydrate();
	}, [metadata, user, provider, isWithdrawModalOpen]);

	const withdraw = async () => {
		toast.loading('Transaction is processing!', {
			duration: Infinity,
		});

		const transaction = await contract
			.connect(signer)
			['release(address)'](user.address)
			.catch(() => setIsWithdrawModalOpen(2));
		const getEvent = async (transaction) => {
			const event = (await transaction.wait())?.events?.filter((event) => event.event === 'PaymentReleased')[0]?.args;
			return event;
		};
		getEvent(transaction)
			.then(() => {
				setIsWithdrawModalOpen(1);
				toast.dismiss();
			})
			.catch(() => {
				setIsWithdrawModalOpen(2);
				toast.dismiss();
			});
	};

	const getShare = (share) => {
		const shares = parseFloat(ethers.utils.formatUnits(share, 16));
		if (shares > 0.01) return shares;
		else return 0;
	};

	return (
		<Box mt="6rem" width="116.8rem" mx="auto">
			<WithdrawModal isOpen={isWithdrawModalOpen} setIsOpen={setIsWithdrawModalOpen} pendingPayment={pendingPayment} />
			<Box row between alignItems="flex-start">
				<Box width="55.2rem">
					<Box between mb="mm">
						<Text as="h6">Beneficiaries</Text>
					</Box>
					<Box row overflow="visible" mb="ms">
						<TextInput value="Simplr" type="text" width="45.2rem" disabled disableValidation fontSize="1.4rem" />
						<Box ml="mxs" />
						<TextInput
							value={`${getShare(simplrShares)}%`}
							type="text"
							width="9.2rem"
							disabled
							disableValidation
							fontSize="1.4rem"
						/>
					</Box>
					{payees.slice(0, payees.length - 1).map((payee, index) => (
						<Box row overflow="visible" mb="ms" key={payee.substr(-4)}>
							<TextInput
								value={null}
								placeholder={payee}
								type="text"
								width="45.2rem"
								fontSize="1.4rem"
								disableValidation
								disabled
							/>
							<Box ml="mxs" />
							<TextInput
								value={null}
								placeholder={`${shares[index]}%`}
								type="number"
								width="9.2rem"
								disableValidation
								fontSize="1.4rem"
								disabled
							/>
						</Box>
					))}
					<Box mt="mxxl" />
				</Box>
				<Box width="55.2rem">
					<Text as="h6" mb="mm">
						Withdraw Funds:
					</Text>
					<Box bg="white-00" p="mm" borderRadius="8px">
						<Box row alignItems="center" mb="mxl">
							<Text as="h5" width="16.5rem" mr="mm">
								Wallet Address:
							</Text>
							<Text as="h6" color="simply-blue">
								{user.address}
							</Text>
						</Box>
						<Box row alignItems="center" mb="mxl">
							<Text as="h5" width="16.5rem" mr="mm">
								Share:
							</Text>
							<Text as="h6" color="simply-blue">
								{`${userShare}%`}
							</Text>
						</Box>
						<Box row alignItems="center" mb="mxl">
							<Text as="h5" width="16.5rem" mr="mm">
								Total funds collected:
							</Text>
							<Text as="h6" color="simply-blue">
								{`${totalFunds} ${getUnitByChainId(user.network.chain)}`}
							</Text>
						</Box>
						<Box row alignItems="center">
							<Text as="h5" width="16.5rem" mr="mm">
								Funds you will receive:
							</Text>
							<Text as="h6" color="simply-blue">
								{`${pendingPayment} ${getUnitByChainId(user.network.chain)}`}
							</Text>
						</Box>
					</Box>
					<Box row justifyContent="flex-end" mt="mm">
						<ButtonComp bg="primary" height="40px" px="mxl" onClick={() => withdraw()}>
							Withdraw
						</ButtonComp>
					</Box>
				</Box>
			</Box>
			<Royalties {...{ contract, admin, signer, ready }} />
		</Box>
	);
};

export default PaymentsPage;

const Royalties = ({ admin, contract, signer, ready }) => {
	const [edit, setEdit] = useState(false);
	const user = useAppSelector(userSelector);
	const [address, setAddress] = useState('');
	const [percentage, setPercentage] = useState(0);
	const [royalty, setRoyalty] = useState({
		account: '',
		value: 0,
	});
	const [isRoyaltyModalOpen, setIsRoyaltyModalOpen] = useState(false);

	const editRoyalties = async () => {
		if (!ethers.utils.isAddress(address)) {
			toast.error('Invalid Address');
		} else if (percentage > 10) {
			toast.error('Value must be max upto 10%');
		} else if (royalty.account !== address || royalty.value !== percentage) {
			contract
				.connect(signer)
				.setRoyalties({ account: address, value: percentage * 100 })
				.then(() => {
					toast.success('Updated');
					setEdit(false);
					setIsRoyaltyModalOpen(true);
				})
				.catch((err) => {
					console.error(err);
					toast.error('Something Went Wrong');
					setIsRoyaltyModalOpen(false);
					setEdit(false);
				});
		}
	};

	useEffect(() => {
		const getRoyalty = async () => {
			const r = await contract.callStatic.royalties();
			setRoyalty({ account: r[0], value: parseInt(r[1].toString()) / 100 });
			setAddress(royalty.account);
			setPercentage(royalty.value / 100);
		};
		if (contract && ready) {
			getRoyalty();
		}
	}, [contract, ready]);
	return (
		<Box width="55.2rem" mt="wxl" mb="wxl">
			<Text as="h3" color="simply-blue" mb="mxxxl">
				Royalties
			</Text>
			<Box between mb="mm">
				<Text as="h6">Royalties</Text>
				<Text
					display={admin !== user.address || edit ? 'none' : 'block'}
					as="h6"
					color="simply-blue"
					textDecoration="underline"
					onClick={() => setEdit(true)}
					cursor="pointer"
				>
					Edit
				</Text>
			</Box>
			<If
				condition={!edit}
				then={
					<Box row overflow="visible" mb="ms">
						<TextInput
							value={royalty.account}
							type="text"
							width="45.2rem"
							disableValidation
							disabled
							fontSize="1.4rem"
						/>
						<Box ml="mxs" />
						<TextInput
							value={`${royalty.value}%`}
							type="text"
							width="9.2rem"
							disabled
							disableValidation
							fontSize="1.4rem"
						/>
					</Box>
				}
				else={
					<Box>
						<Box row overflow="visible" mb="ms">
							<TextInput
								value={address}
								setValue={setAddress}
								type="text"
								width="45.2rem"
								disableValidation
								fontSize="1.4rem"
							/>
							<Box ml="mxs" />
							<TextInput
								value={percentage}
								setValue={setPercentage}
								max="10"
								min="0"
								type="number"
								width="9.2rem"
								disableValidation
								fontSize="1.4rem"
							/>
						</Box>
						<Box row justifyContent="space-between">
							<Text as="b1" color="simply-gray" mt="mxs" mb="16rem">
								Maximum 10%
							</Text>
							<ButtonComp bg="primary" height="40px" px="mxl" onClick={() => editRoyalties()}>
								Update
							</ButtonComp>
						</Box>
					</Box>
				}
			/>
			<RoyaltyEditModal
				visible={isRoyaltyModalOpen}
				setVisible={setIsRoyaltyModalOpen}
				data={royalty}
				setData={setRoyalty}
				{...{ address, percentage }}
			/>
		</Box>
	);
};
