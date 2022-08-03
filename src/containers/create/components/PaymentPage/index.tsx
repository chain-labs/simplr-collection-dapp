/* eslint-disable no-console */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import Toggle from 'src/components/Toggle';
import useContract from 'src/ethereum/useContract';
import useEthers from 'src/ethereum/useEthers';
import { collectionSelector } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { beneficiariesSelector, clearBeneficiaries, paymentSelector, setPaymentDetails } from 'src/redux/payment';
import { saleSelector } from 'src/redux/sales';
import { SEAT_DISABLE } from 'src/utils/constants';
import Breadcrumb from '../Breadcrumb';
import SummaryPage from '../SummaryPage';
import BeneficiariesForm from './BeneficiariesForm';

const getMaxShares = (shares, simplrShares) => {
	let total = 100 - simplrShares;
	shares.forEach((share) => {
		total -= share;
	});
	return total;
};

const PaymentPage = ({ step, setStep, balance }) => {
	const [provider] = useEthers();
	const collection = useAppSelector(collectionSelector);
	const payments = useAppSelector(paymentSelector);
	const sales = useAppSelector(saleSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);
	const [royaltyAddress, setRoyaltyAddress] = useState<string>(payments?.royalties?.receiver);
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(payments?.royalties?.royaltyFraction);

	const [showSummaryPage, setShowSummaryPage] = useState<boolean>();
	const [simplrShares, setSimplrShares] = useState<number>(null);
	const [useEarlyPass, setUseEarlyPass] = useState<boolean>(payments.useEarlyPass && balance.length > 0);
	const [maxShare, setMaxShare] = useState<number>(
		getMaxShares(beneficiaries?.shares, useEarlyPass ? 0 : simplrShares)
	);
	const Simplr = useContract('CollectionFactoryV2', collection.type, provider);
	const [initialRender, setInitialRender] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const getAddress = async () => {
			try {
				const share = await Simplr?.callStatic.simplrShares();

				const sharePercentage = ethers.utils.formatUnits(share?.toString());
				const shareValue = Math.floor(parseFloat(sharePercentage) * 100);
				setSimplrShares(shareValue);
			} catch (err) {
				console.log({ err });
			}
		};
		getAddress();
	}, [Simplr]);

	useEffect(() => {
		setMaxShare(getMaxShares(beneficiaries?.shares, useEarlyPass ? 0 : simplrShares));
	}, [simplrShares]);

	const addData = (Step) => {
		const data = getData();
		dispatch(setPaymentDetails(data));
		setStep(Step);
	};

	const getData = () => {
		const data = {
			useEarlyPass,
			royalties: {
				receiver: royaltyAddress,
				royaltyFraction: royaltyPercentage,
			},
		};
		return data;
	};

	useEffect(() => {
		if (initialRender) {
			setInitialRender(false);
		} else {
			if (!useEarlyPass) {
				setMaxShare(getMaxShares([], simplrShares));
				dispatch(clearBeneficiaries());
			} else {
				setMaxShare(getMaxShares(beneficiaries?.shares, 0));
			}
		}
	}, [useEarlyPass]);

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

	return (
		<Box overflow="visible">
			<SummaryPage
				visible={showSummaryPage}
				setVisible={setShowSummaryPage}
				setStep={setStep}
				simplrShares={simplrShares}
				balance={balance}
			/>
			<Box overflow="visible" mb="10rem">
				<Text as="h2" center>
					Create new collection
				</Text>
				<Breadcrumb step={step} addData={addData} />
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
						<If
							condition={!SEAT_DISABLE}
							then={
								<Box>
									<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
										Use early pass benefits
										<Box ml="mxxxl" />
										<Toggle value={useEarlyPass} setValue={setUseEarlyPass} mobile disabled={!balance.length} />
									</Text>
									<Text as="b1" color="simply-gray" mt="mm" mb="4.4rem">
										Turning this off would add Simplr as a beneificiary.
									</Text>
								</Box>
							}
						/>
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
									step="0.01"
									placeholder="eg. 5"
									type="number"
									width="21.4rem"
									unit="%"
									fontSize="1.4rem"
								/>
							</Box>
						</LabelledTextInput>
						<Box mt="ws" />
						<BeneficiariesForm {...{ maxShare, setMaxShare, simplrShares, useEarlyPass }} />
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default PaymentPage;
