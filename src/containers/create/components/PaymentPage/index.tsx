import { ethers } from 'ethers';
import { CaretRight, XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import useContract from 'src/ethereum/useContract';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { collectionSelector } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
	addBeneficiary,
	beneficiariesSelector,
	paymentSelector,
	removeBeneficiary,
	setPaymentDetails,
} from 'src/redux/payment';
import { saleSelector } from 'src/redux/sales';
import theme from 'src/styleguide/theme';
import SummaryPage from '../SummaryPage';

const getMaxShares = (shares, simplrShares) => {
	let total = 100 - simplrShares;
	shares.forEach((share) => {
		total -= share;
	});
	return total;
};

const PaymentPage = ({ step, setStep }) => {
	const [provider] = useEthers();
	const [signer] = useSigner(provider);
	const collection = useAppSelector(collectionSelector);
	const payments = useAppSelector(paymentSelector);
	const sales = useAppSelector(saleSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);
	const [royaltyAddress, setRoyaltyAddress] = useState<string>(payments?.royalties?.account);
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(payments?.royalties?.value);
	const [beneficiary, setBeneficiary] = useState<string>();
	const [beneficiaryPercentage, setBeneficiaryPercentage] = useState('');
	const [showSummaryPage, setShowSummaryPage] = useState<boolean>();
	const [simplrShares, setSimplrShares] = useState<number>(10);
	const [maxShare, setMaxShare] = useState<number>(getMaxShares(beneficiaries?.shares, simplrShares));
	const [simplrAddress, setSimplrAddress] = useState<string>();
	const Simplr = useContract('CollectionFactoryV2', collection.type, provider);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const getAddress = async () => {
			try {
				const address = await Simplr?.callStatic.simplr();
				const share = await Simplr?.callStatic.simplrShares();

				const sharePercentage = ethers.utils.formatUnits(share?.toString());
				const shareValue = parseFloat(sharePercentage) * 100;

				setSimplrAddress(address);
				setSimplrShares(shareValue);
			} catch (err) {
				console.log({ err });
			}
		};
		getAddress();
	}, [Simplr]);

	const addData = (Step) => {
		const data = getData();
		dispatch(setPaymentDetails(data));
		setStep(Step);
	};

	const getData = () => {
		const data = {
			royalties: {
				account: royaltyAddress,
				value: royaltyPercentage,
			},
		};
		return data;
	};

	const addPaymentDetails = (e) => {
		e.preventDefault();
		if (!collection.collection_validated) {
			toast.error('Check all the input fields and click next to continue.');
			setStep(0);
			return;
		} else if (!sales.salesDetails_validated) {
			toast.error('Check all the input fields and click next to continue.');
			setStep(1);
			return;
		}
		if (royaltyAddress) {
			const valid = ethers.utils.isAddress(royaltyAddress);
			if (!valid || royaltyPercentage > 10) {
				toast.error('Invalid details');
				return;
			}
		}
		if (!(maxShare === 0)) {
			toast.error(`${maxShare}% shares still remaining. Add more beneficiaries or re-allocate shares.`);
			return;
		}

		const data = getData();
		dispatch(setPaymentDetails(data));
		toast.success('Saved');
		setShowSummaryPage(true);
	};

	const handleAdd = (e) => {
		e.preventDefault();

		const valid = ethers.utils.isAddress(beneficiary);

		const payeeexist = payments?.paymentSplitter?.payees?.find((payee) => payee === beneficiary);
		if (payeeexist) {
			toast.error('Address already whitelisted');
			return;
		}
		if (valid) {
			if (parseFloat(beneficiaryPercentage) <= maxShare) {
				dispatch(addBeneficiary({ payee: beneficiary, shares: parseInt(beneficiaryPercentage) }));
				setMaxShare(maxShare - parseInt(beneficiaryPercentage));
				toast.success('Beneficiary added');
				setBeneficiaryPercentage('');
				setBeneficiary('');
			} else {
				toast.error(`Shares must be less than ${maxShare}%`);
			}
		} else {
			toast.error('Address is not valid');
		}
	};

	const handleRemove = (payee, share) => {
		dispatch(removeBeneficiary(payee));
		setMaxShare(maxShare + parseInt(share));
		toast.success('Beneficiary removed');
	};

	return (
		<Box overflow="visible">
			<SummaryPage visible={showSummaryPage} setVisible={setShowSummaryPage} setStep={setStep} />
			<Box overflow="visible" mb="10rem">
				<Text as="h2" center>
					Create new collection
				</Text>
				<Box center mt="mxxxl" mb="ws">
					<Text as="h5" color={step === 0 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(0)}>
						Collection Details
					</Text>
					<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
					<Text as="h5" color={step === 1 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(1)}>
						Sales
					</Text>
					<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
					<Text as="h5" color={step === 2 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(2)}>
						Payment Details
					</Text>
				</Box>
				<form onSubmit={addPaymentDetails}>
					<Box overflow="visible" mb="10rem">
						<Box overflow="visible">
							<Toaster
								position="top-center"
								toastOptions={{
									duration: 5000,
								}}
							/>
						</Box>
						<LabelledTextInput label="Royalties" helperText="Maximum 10%">
							<Box row overflow="visible">
								<TextInput
									value={royaltyAddress}
									setValue={setRoyaltyAddress}
									placeholder="Wallet address"
									type="text"
									width="41.7rem"
									fontSize="1.4rem"
									disableValidation
								/>
								<Box ml="mxs" />
								<TextInput
									value={royaltyPercentage}
									setValue={setRoyaltyPercentage}
									max="10"
									min="0"
									placeholder="eg. 5"
									type="number"
									width="21.4rem"
									unit="%"
									fontSize="1.4rem"
								/>
							</Box>
						</LabelledTextInput>
						<Box mt="ws" />
						<LabelledTextInput label="Beneficiaries" required>
							<Box row overflow="visible" mb="ms">
								<TextInput value="Simplr" type="text" width="41.7rem" disabled disableValidation fontSize="1.4rem" />
								<Box ml="mxs" />
								<TextInput
									value={`${simplrShares}%`}
									type="text"
									width="21.4rem"
									disabled
									disableValidation
									fontSize="1.4rem"
								/>
							</Box>
							{beneficiaries?.payees?.map((payee, index) => (
								<Payee
									percentage={beneficiaries?.shares[index]}
									payee={payee}
									key={index}
									handleRemove={handleRemove}
									index={index}
									maxShare={maxShare}
								/>
							))}
							<If
								condition={maxShare > 0}
								then={
									<Box row overflow="visible" mb="ms">
										<TextInput
											value={beneficiary}
											setValue={setBeneficiary}
											placeholder="Wallet Address"
											type="text"
											width="41.7rem"
											fontSize="1.4rem"
										/>
										<Box ml="mxs" />
										<TextInput
											value={beneficiaryPercentage}
											setValue={setBeneficiaryPercentage}
											max={`${maxShare}`}
											min="1"
											placeholder="Share%"
											type="number"
											width="21.4rem"
											fontSize="1.4rem"
										/>
									</Box>
								}
							/>
						</LabelledTextInput>
						<If
							condition={maxShare > 0}
							then={
								<ButtonComp
									bg="tertiary"
									width="100%"
									height="48px"
									disable={!beneficiary || !beneficiaryPercentage}
									onClick={handleAdd}
								>
									<Text as="h5">Add Beneficiary</Text>
								</ButtonComp>
							}
						/>
						<Box mt="mxxl" />
						<Box row mb="mxl">
							<Text as="b1" color="simply-gray" mr="mm">
								Total Shares: 100%
							</Text>
							<Text as="b1" color="simply-gray" mr="mm">
								Simplr: 10%
							</Text>
							<Text as="b1" color="simply-gray">
								{`Remaining: ${maxShare}%`}
							</Text>
						</Box>
						<ButtonComp bg="primary" width="100%" height="56px" type="submit">
							Submit
						</ButtonComp>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default PaymentPage;

const Payee = ({ percentage, payee, index, maxShare, handleRemove }) => {
	const [deleteButton, setDeleteButton] = useState(false);
	return (
		<Box
			row
			overflow="visible"
			mb="ms"
			key={payee.substr(-4)}
			onMouseOver={() => setDeleteButton(true)}
			onMouseOut={() => setDeleteButton(false)}
			width="105%"
		>
			<TextInput value={null} placeholder={payee} type="text" width="41.7rem" fontSize="1.4rem" disableValidation />
			<Box ml="mxs" />
			<TextInput
				value={null}
				placeholder={`${percentage}%`}
				max={`${maxShare}`}
				type="number"
				width="21.4rem"
				disableValidation
				fontSize="1.4rem"
			/>
			<Box
				ml="mxs"
				onClick={() => handleRemove(payee, percentage)}
				cursor="pointer"
				display={deleteButton ? 'block' : 'none'}
				height="20px"
			>
				<XCircle color={theme.colors['red-50']} size="18" weight="fill" />
			</Box>
		</Box>
	);
};
