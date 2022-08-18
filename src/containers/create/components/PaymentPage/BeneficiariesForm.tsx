import { ethers } from 'ethers';
import { Info } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addBeneficiary, beneficiariesSelector, paymentSelector, removeBeneficiary } from 'src/redux/payment';
import Payee from './Payee';

const BeneficiariesForm = ({ maxShare, setMaxShare, useEarlyPass, simplrShares }) => {
	const dispatch = useAppDispatch();
	const payments = useAppSelector(paymentSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);

	const [beneficiary, setBeneficiary] = useState<string>();
	const [beneficiaryPercentage, setBeneficiaryPercentage] = useState('');
	const [showTooltip, setShowTooltip] = useState(false);

	const handleAdd = (e) => {
		e.preventDefault();

		const valid = ethers.utils.isAddress(beneficiary);

		const payeeexist = payments?.paymentSplitter?.payees?.find((payee) => payee === beneficiary);
		if (payeeexist) {
			toast.error('Address already entered');
			return;
		}
		if (valid) {
			if (parseFloat(beneficiaryPercentage) <= maxShare) {
				dispatch(addBeneficiary({ payee: beneficiary, shares: parseFloat(beneficiaryPercentage) }));
				setMaxShare(maxShare - parseFloat(beneficiaryPercentage));
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
		setMaxShare(maxShare + parseFloat(share));
		toast.success('Beneficiary removed');
	};

	return (
		<Box>
			<LabelledTextInput label="Beneficiaries" required>
				<Box row overflow="visible" mb="ms">
					<TextInput value="Simplr" type="text" width="41.7rem" disabled disableValidation fontSize="1.4rem" />
					<Box ml="mxs" />
					<TextInput
						value={`${useEarlyPass ? '0' : simplrShares}%`}
						type="text"
						width="21.4rem"
						disabled
						disableValidation
						fontSize="1.4rem"
					/>
					<Box
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => setShowTooltip(false)}
						ml="mxs"
						cursor="pointer"
						position="relative"
						display={useEarlyPass ? 'block' : 'none'}
					>
						<Info size="20" weight="fill" color="#626266" />
						<If
							condition={showTooltip}
							then={
								<Box
									position="absolute"
									top="-75px"
									left="6"
									width="31rem"
									backgroundColor="#F6F6FF"
									p="mm"
									borderRadius="12px"
									boxShadow="shadow-400"
									border="1px solid rgba(171, 171, 178, 0.3)"
								>
									<Text as="c1">
										Simplr collection beneficiary percentage is not absolute zero due to technical limitations.
										<br />
										It’s 1 X 10^(-17).
									</Text>
								</Box>
							}
						/>
					</Box>
				</Box>
				{beneficiaries?.payees?.map((payee, index) => (
					<Payee
						percentage={beneficiaries?.shares[index]}
						payee={payee}
						key={index}
						handleRemove={handleRemove}
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
								min="0.01"
								step="0.01"
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
						<Text as="h5">Save Beneficiary</Text>
					</ButtonComp>
				}
			/>
			<Box mt="mxxl" />
			<Box row mb="mxl">
				<Text as="b1" color="simply-gray" mr="mm">
					Total Shares: 100%
				</Text>
				<Text as="b1" color="simply-gray" mr="mm">
					{`Simplr: ${useEarlyPass ? '0' : simplrShares}%`}
				</Text>
				<Text as="b1" color="simply-gray">
					{`Remaining: ${maxShare}%`}
				</Text>
			</Box>
			<ButtonComp bg="primary" width="100%" height="56px" type="submit">
				Submit
			</ButtonComp>
		</Box>
	);
};

export default BeneficiariesForm;
