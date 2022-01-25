import { ethers } from 'ethers';
import { XCircle } from 'phosphor-react';
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
import { createCollection, uploadToIPFS } from '../utils';

const getMaxShares = (shares, simplrShares) => {
	let total = 100 - simplrShares;
	shares.forEach((share) => {
		total -= share;
	});
	return total;
};

const PaymentPage = () => {
	const collection = useAppSelector(collectionSelector);
	const payments = useAppSelector(paymentSelector);
	const sales = useAppSelector(saleSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);

	const [provider] = useEthers();
	const [signer] = useSigner(provider);

	const [royaltyAddress, setRoyaltyAddress] = useState<string>(payments?.royalties?.account);
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(payments?.royalties?.value);
	const [beneficiary, setBeneficiary] = useState<string>();
	const [beneficiaryPercentage, setBeneficiaryPercentage] = useState<number>();

	const [simplrAddress, setSimplrAddress] = useState<string>();
	const [simplrShares, setSimplrShares] = useState<number>(10);
	const [maxShare, setMaxShare] = useState<number>(getMaxShares(beneficiaries?.shares, simplrShares));

	const dispatch = useAppDispatch();

	// This section is for the creation of the collection
	const Simplr = useContract('CollectionFactoryV2', collection.type, provider);
	const [metadata, setMetadata] = useState<string>();
	const [transactionResult, setTransactionResult] = useState({});
	const [ready, setReady] = useState(false);

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

	const addPaymentDetails = (e) => {
		e.preventDefault();
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

		const data = {
			royalties: {
				account: royaltyAddress,
				value: royaltyPercentage,
			},
		};
		dispatch(setPaymentDetails(data));
		toast.success('Saved');
		uploadToIPFS(collection, sales, payments, simplrAddress).then((hash) => {
			setMetadata(hash);
			toast.success('Metadata Pinned to IPFS');
		});
		setReady(true);
	};

	useEffect(() => {
		if (metadata && ready) {
			const transaction = async () => {
				const res = await createCollection(Simplr, metadata, collection, sales, payments, signer);
				setTransactionResult(res);
			};
			transaction();
		}
	}, [metadata, ready]);

	useEffect(() => {
		if (transactionResult) {
			// const event = transactionResult?.event;
			// const transaction = transactionResult?.transaction;
			console.log({ transactionResult });
		}
	}, [transactionResult]);

	// This is the end of the section for the creation of the collection

	const handleAdd = (e) => {
		e.preventDefault();

		const valid = ethers.utils.isAddress(beneficiary);

		const payeeexist = payments?.paymentSplitter?.payees?.find((payee) => payee === beneficiary);
		if (payeeexist) {
			toast.error('Address already whitelisted');
			return;
		}
		if (valid) {
			if (beneficiaryPercentage <= maxShare) {
				dispatch(addBeneficiary({ payee: beneficiary, shares: beneficiaryPercentage }));
				setMaxShare(maxShare - beneficiaryPercentage);
				toast.success('Beneficiary added');
				setBeneficiaryPercentage(0);
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
						/>
						<Box ml="mxs" />
						<TextInput
							value={royaltyPercentage}
							setValue={setRoyaltyPercentage}
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
						<Box row overflow="visible" mb="ms" key={payee.substr(-4)}>
							<TextInput
								value={null}
								placeholder={payee}
								type="text"
								width="41.7rem"
								fontSize="1.4rem"
								disableValidation
							/>
							<Box ml="mxs" />
							<TextInput
								value={null}
								placeholder={`${beneficiaries?.shares[index]}%`}
								max={`${maxShare}`}
								type="number"
								width="21.4rem"
								disableValidation
								fontSize="1.4rem"
							/>
							<Box ml="mxs" onClick={() => handleRemove(payee, beneficiaries.shares[index])} cursor="pointer">
								<XCircle color={theme.colors['red-50']} size="18" weight="fill" />
							</Box>
						</Box>
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
						Simplr: {simplrShares}%
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
	);
};

export default PaymentPage;
