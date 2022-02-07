import { Check, X } from 'phosphor-react';
import { useState } from 'react';
import ReactDom from 'react-dom';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';

const WithdrawModal = ({ isOpen, setIsOpen, pendingPayment }) => {
	const user = useAppSelector(userSelector);
	if (isOpen === 0) return null;
	return ReactDom.createPortal(
		<Modal visible={isOpen > 0}>
			<Box
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="simply-white"
				p="mxl"
				maxWidth={isOpen === 1 ? '40rem' : '28rem'}
				center
				column
				borderRadius="16px"
				boxShadow="shadow-500"
			>
				<Box borderRadius="50%" bg={isOpen === 1 ? 'blue-00' : 'red-10'} p="ms" height="4.8rem">
					<If
						condition={isOpen === 1}
						then={<Check size="24" color={theme.colors['simply-blue']} />}
						else={<X size="24" color={theme.colors['red-50']} />}
					/>
				</Box>
				<Box mt="ml">
					<Text as="h5" textAlign="center">
						Transaction {isOpen === 1 ? 'Succesful' : 'Failed'}
					</Text>
					<Text as="h6" color="#52575c" textAlign="center" mt="mxs" mb="mxxxl">
						{isOpen === 1
							? `Successfully transferred ${pendingPayment} ETH to wallet address: ${user.address}`
							: 'There was a problem in processing the transaction. Try again.'}
					</Text>
				</Box>
				<ButtonComp bg="primary" height="40px" px="mxl" onClick={() => setIsOpen(0)}>
					<Text as="h6">Okay</Text>
				</ButtonComp>
			</Box>
		</Modal>,
		document.getElementById('portal')
	);
};

export default WithdrawModal;
