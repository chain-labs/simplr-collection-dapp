import { useState } from 'react';
import ReactDom from 'react-dom';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';

const AirdropModal = ({ addresses, isOpen, setIsOpen, adminAddress, contract, signer, setAirdropAddress }) => {
	const user = useAppSelector(userSelector);
	const [transfer, setTransfer] = useState(false);

	const handleConfirm = () => {
		const addressList = addresses.split(',');
		if (adminAddress === user.address) {
			contract
				.connect(signer)
				.transferReservedTokens(addressList)
				.then(() => {
					setAirdropAddress('');
					toast.success('Transferred Tokens');
				});
		} else {
			toast.error('Only admin can Airdrop Tokens');
		}
	};

	if (!isOpen) return null;

	return ReactDom.createPortal(
		<Modal visible={isOpen}>
			<Box
				bg="simply-white"
				borderRadius="16px"
				boxShadow="shadow-400"
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				p="mxl"
			>
				<Text as="h4">Confirm Airdrop</Text>
				<Box height="0.1rem" bg={`${theme.colors['simply-black']}33`} my="mxl" width="33rem" />
				<Text as="h6" width="33rem" mb="mxl">
					Airdropping NFTs from your reserve to these addresses
				</Text>
				<Box overflowY="auto" className="hidden-scrollbar" maxHeight="9rem" mb="mxl">
					{addresses.split(', ').map((address, index) => (
						<Text key={`air-${index}`} as="c3" color="simply-blue">
							{address}
						</Text>
					))}
				</Box>
				<ButtonComp bg="primary" height="40px" width="100%" mb="mm" onClick={() => handleConfirm()}>
					Airdrop
				</ButtonComp>
				<ButtonComp bg="secondary" height="40px" width="100%">
					Cancel
				</ButtonComp>
			</Box>
		</Modal>,
		document.getElementById('portal')
	);
};

export default AirdropModal;
