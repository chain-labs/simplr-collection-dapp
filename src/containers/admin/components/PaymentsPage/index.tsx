import { ethers } from 'ethers';
import { XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import useEthers from 'src/ethereum/useEthers';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';

const PaymentsPage = ({ contract, metadata }) => {
	const [payees, setPayees] = useState<string[]>([]);
	const [shares, setShares] = useState<number[]>([]);
	const [simplrShares, setSimplrShares] = useState<number>(0);
	const [editRoyalties, setEditRoyalties] = useState(false);
	const [royaltyAddress, setRoyaltyAddress] = useState('0x363b616d72F433B41E48cF863f7CcB8c930b8682');
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(10);
	const [userShare, setUserShare] = useState('');
	const [pendingPayment, setPendingPayment] = useState('');
	const [totalFunds, setTotalFunds] = useState('');
	const [royalties, setRoyalties] = useState<any>();

	const [provider] = useEthers();

	const user = useAppSelector(userSelector);

	useEffect(() => {
		const getDetails = async () => {
			const simplrShares = await contract.callStatic.SIMPLR_SHARES();
			setSimplrShares(simplrShares);
			const royalties = await contract.callStatic.royaltyInfo();
			setRoyalties(royalties);
		};
		if (contract) {
			getDetails();
		}
	}, [contract]);

	useEffect(() => {
		if (metadata) {
			const { tokenDetails } = metadata;
			const payees: string[] = tokenDetails.paymentSplitter.payees;
			const shares = tokenDetails.paymentSplitter.shares;
			setPayees(payees);
			setShares(shares);
			const index = payees.findIndex((payee) => payee === user.address);
			if (index !== -1) {
				const share = shares[index];

				setUserShare(share.toString());
			}

			const getPayment = async () => {
				const pendingPayment = await contract?.callStatic?.pendingPayment(user.address);
				console.log({ pendingPayment, user: user.address });

				setPendingPayment(ethers.utils.formatUnits(pendingPayment, 18));
				if (provider) {
					const balance = await provider?.getBalance(contract.address);
					const totalReleased = await contract?.callStatic?.totalReleased();
					const totalFunds = balance.add(totalReleased);
					setTotalFunds(ethers.utils.formatUnits(totalFunds));
				}
			};

			if (contract) {
				getPayment();
			}
		}
	}, [metadata, user, provider]);

	return (
		<Box mt="6rem" width="116.8rem" mx="auto">
			<Box row between alignItems="flex-start">
				<Box width="55.2rem">
					<Box between mb="mm">
						<Text as="h6">Beneficiaries</Text>
					</Box>
					<Box row overflow="visible" mb="ms">
						<TextInput value="Simplr" type="text" width="45.2rem" disabled disableValidation fontSize="1.4rem" />
						<Box ml="mxs" />
						<TextInput
							value={`${parseFloat(ethers.utils.formatUnits(simplrShares, 16))}%`}
							type="text"
							width="9.2rem"
							disabled
							disableValidation
							fontSize="1.4rem"
						/>
					</Box>
					{payees.map((payee, index) => (
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
								{`${totalFunds} ETH`}
							</Text>
						</Box>
						<Box row alignItems="center">
							<Text as="h5" width="16.5rem" mr="mm">
								Funds you will receive:
							</Text>
							<Text as="h6" color="simply-blue">
								{`${pendingPayment} ETH`}
							</Text>
						</Box>
					</Box>
					<Box row justifyContent="flex-end" mt="mm">
						<ButtonComp bg="primary" height="40px" px="mxl">
							Withdraw
						</ButtonComp>
					</Box>
				</Box>
			</Box>
			<Box width="55.2rem" mt="wxl">
				<Text as="h3" color="simply-blue" mb="mxxxl">
					Royalties
				</Text>
				<Box between mb="mm">
					<Text as="h6">Royalties</Text>
					<Text as="h6" color="simply-blue" textDecoration="underline" onClick={() => setEditRoyalties(true)}>
						Edit
					</Text>
				</Box>
				<Box row overflow="visible" mb="ms">
					<TextInput
						value={royalties?.receiver}
						setValue={setRoyaltyAddress}
						type="text"
						width="45.2rem"
						disableValidation
						disabled={!editRoyalties}
						fontSize="1.4rem"
					/>
					<Box ml="mxs" />
					<TextInput
						value={royalties?.royaltyAmount}
						setValue={setRoyaltyPercentage}
						type="text"
						width="9.2rem"
						disabled={!editRoyalties}
						disableValidation
						fontSize="1.4rem"
					/>
				</Box>
				<Text as="b1" color="simply-gray" mt="mxs" mb="16rem">
					Maximum 10%
				</Text>
			</Box>
		</Box>
	);
};

export default PaymentsPage;
