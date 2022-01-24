import { XCircle } from 'phosphor-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';

const PaymentsPage = () => {
	const [payees, setPayees] = useState<string[]>([
		'0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d',
		'0x76713821424e866b365Be8512B47f0A16F85d3b4',
	]);
	const [shares, setsShares] = useState<number[]>([40, 45]);
	const [maxShare, setMaxShare] = useState<number>(0);
	const [beneficiary, setBeneficiary] = useState('');
	const [beneficiaryPercentage, setBeneficiaryPercentage] = useState<number>();
	const [editBeneficiary, setEditBeneficiary] = useState(false);
	const [editRoyalties, setEditRoyalties] = useState(false);
	const [royaltyAddress, setRoyaltyAddress] = useState('0x363b616d72F433B41E48cF863f7CcB8c930b8682');
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(10);
	const [edited, setEdited] = useState(false);

	const user = useAppSelector(userSelector);

	const handleRemove = (index) => {
		const newPayees = payees.filter((_, i) => i !== index);
		const newShares = shares.filter((_, i) => i !== index);
		setPayees(newPayees);
		setsShares(newShares);
		setMaxShare(maxShare + shares[index]);
		toast.success('Beneficiary removed');
	};

	const handleAdd = () => {
		if (beneficiaryPercentage <= maxShare) {
			if (payees.find((payee) => payee === beneficiary)) {
				toast.error('Beneficiary already exists');
			} else {
				setPayees([...payees, beneficiary]);
				setsShares([...shares, beneficiaryPercentage]);
				setMaxShare(maxShare - beneficiaryPercentage);
				setBeneficiary('');
				setBeneficiaryPercentage(0);
				toast.success('Beneficiary added');
			}
		}
	};

	return (
		<Box mt="6rem" width="116.8rem" mx="auto">
			<Box row between alignItems="flex-start">
				<Box width="55.2rem">
					<Box between mb="mm">
						<Text as="h6">Beneficiaries</Text>
						<Text as="h6" color="simply-blue" textDecoration="underline" onClick={() => setEditBeneficiary(true)}>
							Edit
						</Text>
					</Box>
					<Box row overflow="visible" mb="ms">
						<TextInput value="Simplr" type="text" width="45.2rem" disabled disableValidation fontSize="1.4rem" />
						<Box ml="mxs" />
						<TextInput value="15%" type="text" width="9.2rem" disabled disableValidation fontSize="1.4rem" />
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
							/>
							<Box ml="mxs" />
							<TextInput
								value={null}
								placeholder={`${shares[index]}%`}
								max={`${maxShare}`}
								type="number"
								width="9.2rem"
								disableValidation
								fontSize="1.4rem"
							/>
							<If
								condition={editBeneficiary}
								then={
									<Box ml="mxs" onClick={() => handleRemove(index)} cursor="pointer">
										<XCircle color={theme.colors['red-50']} size="18" weight="fill" />
									</Box>
								}
							/>
						</Box>
					))}
					<If
						condition={editBeneficiary}
						then={
							<>
								<Box row overflow="visible" mb="ms">
									<TextInput
										value={beneficiary}
										setValue={setBeneficiary}
										placeholder="Wallet Address"
										type="text"
										width="45.2rem"
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
										width="9.2rem"
										fontSize="1.4rem"
									/>
								</Box>
								<ButtonComp
									bg="tertiary"
									width="100%"
									height="48px"
									disable={!beneficiary || !beneficiaryPercentage}
									onClick={handleAdd}
								>
									<Text as="h5">Add Beneficiary</Text>
								</ButtonComp>
							</>
						}
					/>
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
								50%
							</Text>
						</Box>
						<Box row alignItems="center" mb="mxl">
							<Text as="h5" width="16.5rem" mr="mm">
								Total funds collected:
							</Text>
							<Text as="h6" color="simply-blue">
								400 ETH
							</Text>
						</Box>
						<Box row alignItems="center">
							<Text as="h5" width="16.5rem" mr="mm">
								Funds you will receive:
							</Text>
							<Text as="h6" color="simply-blue">
								200 ETH
							</Text>
						</Box>
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
						value={royaltyAddress}
						setValue={setRoyaltyAddress}
						type="text"
						width="45.2rem"
						disableValidation
						disabled={!editRoyalties}
						fontSize="1.4rem"
					/>
					<Box ml="mxs" />
					<TextInput
						value={royaltyPercentage}
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
			<Box center mb="14rem">
				<ButtonComp bg={edited ? 'primary' : 'tertiary'} width="64rem" height="56px" mx="auto">
					<Text as="h4">Save Changes</Text>
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default PaymentsPage;
