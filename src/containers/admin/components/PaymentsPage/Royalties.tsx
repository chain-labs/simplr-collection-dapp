/* eslint-disable no-console */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import RoyaltyEditModal from './RoyaltyEditModal';

const Royalties = ({ admin, contract, signer, ready }) => {
	const [edit, setEdit] = useState(false);
	const user = useAppSelector(userSelector);
	const [address, setAddress] = useState('');
	const [percentage, setPercentage] = useState(0);
	const [royalty, setRoyalty] = useState({
		receiver: '',
		royaltyFraction: 0,
	});
	const [isRoyaltyModalOpen, setIsRoyaltyModalOpen] = useState(false);

	const editRoyalties = async () => {
		if (!ethers.utils.isAddress(address)) {
			toast.error('Invalid Address');
		} else if (percentage > 10) {
			toast.error('Value must be max upto 10%');
		} else if (royalty.receiver !== address || royalty.royaltyFraction !== percentage) {
			contract
				.connect(signer)
				.setRoyalties({ reciever: address, royaltyFraction: percentage * 100 })
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
			const r = await contract.queryFilter('DefaultRoyaltyUpdated');
			setRoyalty({ receiver: r[0]?.args[0], royaltyFraction: parseInt(r[0]?.args[1]?.toString()) / 100 });
			setAddress(royalty.receiver);
			setPercentage(royalty.royaltyFraction / 100);
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
							value={royalty.receiver}
							type="text"
							width="45.2rem"
							disableValidation
							disabled
							fontSize="1.4rem"
						/>
						<Box ml="mxs" />
						<TextInput
							value={`${royalty.royaltyFraction}%`}
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

export default Royalties;
