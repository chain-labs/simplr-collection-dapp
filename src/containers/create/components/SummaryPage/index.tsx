import { CaretRight, X, XCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import CollectionSummaryPage from './components/CollectionSummaryPage';
import PaymentSummaryPage from './components/PaymentSummaryPage';
import SalesSummaryPage from './components/SalesSummaryPage';

const SummaryPage = ({ visible, setVisible, step, setStep }) => {
	const handleVisibility = () => {
		setVisible(false);
		setStep(modalStep);
	};
	const [modalStep, setModalStep] = useState(0);
	const [marginTop, setMarginTop] = useState('120%');

	useEffect(() => {
		if (modalStep === 0) setMarginTop('122%');
		if (modalStep === 1) setMarginTop('102%');
		if (modalStep === 2) setMarginTop('125%');
	}, [modalStep]);

	const getFormPage = (step) => {
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
					mx="auto"
					bg="simply-white"
					width="118rem"
					borderRadius="16px"
					position="absolute"
					top={marginTop}
					left="50%"
					transform="translate(-50%, -50%)"
					column
					pb="3rem"
				>
					<Box
						position="absolute"
						mt="-1%"
						ml="99%"
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
					<Box pt="mxxxl" mx="auto" width="64rem" overflowX="visible">
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
						{getFormPage(modalStep)}
					</Box>
				</Box>
			</Modal>
		);
	}
	return <></>;
};

export default SummaryPage;
