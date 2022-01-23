import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { beneficiariesSelector, paymentSelector } from 'src/redux/payment';

const PaymentPage = () => {
	const [royaltyAddress, setRoyaltyAddress] = useState<string>();
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>();
	const [beneficiary, setBeneficiary] = useState<string>();
	const [beneficiaryPercentage, setBeneficiaryPercentage] = useState<number>();

	const beneficiaries = useAppSelector(beneficiariesSelector);
	const payments = useAppSelector(paymentSelector);

	return (
		<Box overflow="visible" mb="20rem">
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
					/>
					<Box ml="mxs" />
					<TextInput
						value={royaltyPercentage}
						setValue={setRoyaltyPercentage}
						placeholder="eg. 5"
						type="number"
						width="21.4rem"
						unit="%"
					/>
				</Box>
			</LabelledTextInput>
			<Box mt="ws" />
			<LabelledTextInput label="Beneficiaries" required>
				<Box row overflow="visible" mb="ms">
					<TextInput value="Simplr" type="text" width="41.7rem" disabled disableValidation />
					<Box ml="mxs" />
					<TextInput value="15%" type="text" width="21.4rem" disabled disableValidation />
				</Box>
				<Box row overflow="visible" mb="ms">
					<TextInput
						value={beneficiary}
						setValue={setBeneficiary}
						placeholder="Wallet Address"
						type="text"
						width="41.7rem"
					/>
					<Box ml="mxs" />
					<TextInput
						value={beneficiaryPercentage}
						setValue={setBeneficiaryPercentage}
						placeholder="Share%"
						type="number"
						width="21.4rem"
					/>
				</Box>
			</LabelledTextInput>
			<ButtonComp bg="tertiary" width="100%" height="48px">
				<Text as="h5">Add Beneficiary</Text>
			</ButtonComp>
		</Box>
	);
};

export default PaymentPage;
