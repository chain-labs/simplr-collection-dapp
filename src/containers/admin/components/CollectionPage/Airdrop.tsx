import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextArea from 'src/components/TextArea';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import EditModalv2 from '../EditModalv2';

const Airdrop = ({ contractName }) => {
	const [airdropAddress, setAirdropAddress] = useState('');
	const [addressList, setAddressList] = useState([]);
	const [isAirdropModalOpen, setIsAirdropModalOpen] = useState(false);
	const [isERC721, setIsERC721] = useState(true);

	useEffect(() => {
		if (contractName === 'CollectionA') {
			setIsERC721(false);
		} else setIsERC721(true);
	}, [contractName]);

	const handleAirdrop = async () => {
		let err = false;
		const addressList = airdropAddress.replace(/\s+/g, '');
		const addresses = addressList.split(',');
		if (!isERC721) {
			if (addresses.length > 1) {
				toast.error('Only one address can be airdropped at a time.');
				err = true;
			}
		}
		addresses.every((address) => {
			if (!ethers.utils.isAddress(address)) {
				toast.error('One of the Addresses is invalid');
				err = true;
				return false;
			}
			return true;
		});
		if (!err) {
			setIsAirdropModalOpen(true);
			setAddressList(addresses);
		}
	};

	return (
		<Box>
			<Text as="h3" color="simply-blue">
				Airdrop:
			</Text>
			<Box mt="mxl" width="55.2rem">
				<LabelledTextInput
					placeholder="Enter a valid wallet address"
					label="Airdrop NFTs:"
					helperText={`Airdrop an NFT from your reserve to any wallet address. ${
						contractName === 'Collection'
							? 'You can enter multiple addresses seperated by a comma ( , ).'
							: 'Enter only one address.'
					}`}
					disableValidation
				>
					<TextArea value={airdropAddress} setValue={setAirdropAddress} width="45rem" />
				</LabelledTextInput>
				<Box row justifyContent="flex-end" mt="mxl" mb="wm">
					<ButtonComp
						bg="tertiary"
						height="40px"
						width="9.2rem"
						disable={!airdropAddress}
						onClick={() => handleAirdrop()}
					>
						<Text as="h6">Airdrop</Text>
					</ButtonComp>
				</Box>
			</Box>
			<EditModalv2
				visible={isAirdropModalOpen}
				setVisible={setIsAirdropModalOpen}
				data={addressList}
				type="airdrop"
				clearInput={() => setAirdropAddress('')}
			/>
		</Box>
	);
};

export default Airdrop;
