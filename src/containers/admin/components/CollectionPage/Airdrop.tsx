import { ethers } from 'ethers';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import EditModalv2 from '../EditModalv2';

const Airdrop = () => {
	const [airdropAddress, setAirdropAddress] = useState('');
	const [addressList, setAddressList] = useState([]);
	const [isAirdropModalOpen, setIsAirdropModalOpen] = useState(false);

	const handleAirdrop = async () => {
		const addressList = airdropAddress.replace(/\s+/g, '');
		const addresses = addressList.split(',');
		let err = false;
		addresses.every((address, index) => {
			if (!ethers.utils.isAddress(address)) {
				toast.error('One of the Addresses is invalid');
				err = true;
				return false;
			} else if (addresses.lastIndexOf(address) !== index) {
				toast.error('Duplicate addresses in the list');
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
			<Text as="h3" color="simply-blue" mt="wxl">
				Airdrop:
			</Text>
			<Box mt="mxl" width="55.2rem">
				<LabelledTextInput
					value={airdropAddress}
					setValue={setAirdropAddress}
					placeholder="Enter a valid wallet address"
					label="Airdrop NFTs:"
					helperText="Airdrop an NFT from your reserve to any wallet address."
					disableValidation
					width="100%"
				/>
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