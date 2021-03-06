import { Check } from 'phosphor-react';
import ReactDom from 'react-dom';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import Link from 'next/link';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { blockExplorer, explorer } from 'src/utils/links';
import { getShortNameByChainId } from 'src/utils/chains';

const DeployedModal = ({ isOpen, transactionResult }) => {
	const user = useAppSelector(userSelector);
	if (!isOpen) {
		return null;
	} else {
		return ReactDom.createPortal(
			<Modal visible={isOpen}>
				<Box height="100vh" width="100vw" bg="simply-white">
					<Box
						position="absolute"
						top="50%"
						left="50%"
						transform="translate(-50%, -50%)"
						bg="simply-white"
						p="mxl"
						maxWidth="32rem"
						center
						column
						borderRadius="16px"
						boxShadow="shadow-500"
					>
						<Box borderRadius="50%" bg="blue-00" p="ms" height="4.8rem">
							<Check size="24" color={theme.colors['simply-blue']} />
						</Box>
						<Box mt="ml">
							<Text as="h6" textAlign="center">
								Collection Deployed
							</Text>
							<Text as="b1" color="#52575c" textAlign="center" mt="mxs" mb="mxxxl">
								Congratulations, you have successfully deployed the smart contracts for your NFT collection!
							</Text>
						</Box>
						<Link href={`/admin/${getShortNameByChainId(user.network.chain)}:${transactionResult}`}>
							<ButtonComp bg="primary" height="40px" width="100%">
								<Text as="h6">Go to Dashboard</Text>
							</ButtonComp>
						</Link>
						<Box
							as="a"
							target="_blank"
							href={`${blockExplorer(user.network.chain)}/address/${transactionResult}`}
							width="100%"
						>
							<ButtonComp bg="secondary" height="40px" width="100%" mt="mm">
								<Text as="h6">View on {explorer(user.network.chain)}</Text>
							</ButtonComp>
						</Box>
					</Box>
				</Box>
			</Modal>,
			document.getElementById('portal-2')
		);
	}
};

export default DeployedModal;
