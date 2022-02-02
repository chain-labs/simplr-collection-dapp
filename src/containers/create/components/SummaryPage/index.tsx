import { CaretRight, X, XCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import CollectionSummaryPage from './components/CollectionSummaryPage';
import PaymentSummaryPage from './components/PaymentSummaryPage';
import SalesSummaryPage from './components/SalesSummaryPage';

const SummaryPage = ({ visible, setVisible, setStep }) => {
	const handleVisibility = () => {
		setVisible(false);
		setStep(modalStep);
	};
	const [modalStep, setModalStep] = useState(0);

	const getFormPage = () => {
		if (modalStep === 0) {
			return <CollectionSummaryPage setModalStep={setModalStep} modalStep={modalStep} />;
		} else if (modalStep === 1) {
			return <SalesSummaryPage setModalStep={setModalStep} modalStep={modalStep} />;
		} else if (modalStep === 2) {
			return <PaymentSummaryPage setModalStep={setModalStep} modalStep={modalStep} setVisible={setVisible} />;
		}
	};
	if (visible) {
		return (
			<Modal visible={visible}>
				<Box
					bg="simply-white"
					width="118rem"
					borderRadius="16px"
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					column
					pb="3rem"
					boxShadow="shadow-500"
				>
					<Box
						position="absolute"
						right={-9}
						top={-9}
						borderRadius="100%"
						cursor="pointer"
						backgroundColor="black"
						width="26px"
						height="26px"
						center
						onClick={handleVisibility}
					>
						<X size={18} style={{ color: 'white' }} />
					</Box>
					<Box pt="mxxxl" mx="auto" overflowX="visible">
						<Text as="h2" center>
							Create new collection
						</Text>
						<Box center mt="mxxxl" mb="ws">
							<Text
								as="h5"
								color={modalStep === 0 ? 'simply-blue' : 'gray-00'}
								cursor="pointer"
								onClick={() => setModalStep(0)}
							>
								Collection Details
							</Text>
							<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
							<Text
								as="h5"
								color={modalStep === 1 ? 'simply-blue' : 'gray-00'}
								cursor="pointer"
								onClick={() => setModalStep(1)}
							>
								Sales
							</Text>
							<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
							<Text
								as="h5"
								color={modalStep === 2 ? 'simply-blue' : 'gray-00'}
								cursor="pointer"
								onClick={() => setModalStep(2)}
							>
								Payment Details
							</Text>
						</Box>
						<Box
							className="hidden-scrollbar"
							maxHeight="65vh"
							px="2.4rem"
							overflowY="auto"
							overflowX="visible"
							css={``}
						>
							{getFormPage()}
						</Box>
					</Box>
				</Box>
			</Modal>
		);
	}
	return <></>;
};

export default SummaryPage;
