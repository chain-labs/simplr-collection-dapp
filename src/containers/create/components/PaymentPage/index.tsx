import { ethers } from 'ethers';
import { XCircle } from 'phosphor-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addBeneficiary, beneficiariesSelector, paymentSelector, removeBeneficiary } from 'src/redux/payment';
import theme from 'src/styleguide/theme';

const PaymentPage = () => {
	const payments = useAppSelector(paymentSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);

	const [royaltyAddress, setRoyaltyAddress] = useState<string>(payments.royalties.account);
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(payments.royalties.value);
	const [beneficiary, setBeneficiary] = useState<string>();
	const [beneficiaryPercentage, setBeneficiaryPercentage] = useState<number>();

	const [maxShare, setMaxShare] = useState<number>(85);

	const dispatch = useAppDispatch();

	const handleAdd = (e) => {
		e.preventDefault();

		const valid = ethers.utils.isAddress(beneficiary);

		if (valid) {
			if (beneficiaryPercentage <= maxShare) {
				if (maxShare === 0) {
					toast.error('Cannot add more benificiaries');
					return;
				}
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
		<Box overflow="visible" mb="10rem">
			<Box overflow="visible">
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 5000,
					}}
				/>
			</Box>
			<LabelledTextInput label="Royalties" helperText="Maximum 10%" required>
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
					<TextInput value="15%" type="text" width="21.4rem" disabled disableValidation fontSize="1.4rem" />
				</Box>
				{beneficiaries.payees.map((payee, index) => (
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
							placeholder={`${beneficiaries.shares[index]}%`}
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
			</LabelledTextInput>
			<ButtonComp
				bg="tertiary"
				width="100%"
				height="48px"
				disable={!beneficiary || !beneficiaryPercentage}
				onClick={handleAdd}
			>
				<Text as="h5">Add Beneficiary</Text>
			</ButtonComp>
			<Box mt="mxxl" />
			<Box row mb="mxl">
				<Text as="b1" color="simply-gray" mr="mm">
					Total Shares: 100%
				</Text>
				<Text as="b1" color="simply-gray" mr="mm">
					Simplr: 15%
				</Text>
				<Text as="b1" color="simply-gray">
					{`Remaining: ${maxShare}%`}
				</Text>
			</Box>
			<ButtonComp bg="primary" width="100%" height="56px">
				Submit
			</ButtonComp>
		</Box>
	);
};

export default PaymentPage;
