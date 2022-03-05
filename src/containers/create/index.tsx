import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import SalesPage from './components/SalesPage';
import PaymentPage from './components/PaymentPage';
import CollectionPage from './components/CollectionPage';
import SEATModal from './components/SEATModal';
import TncModal from './components/TncModal';
import If from 'src/components/If';

const CreateComp = ({ balance }) => {
	const [step, setStep] = useState<number>();
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [tncStatus, setTncStatus] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [step]);

	useEffect(() => {
		setTimeout(() => {
			setIsModalOpen(true);
		}, 1000);
	}, []);

	useEffect(() => {
		if (tncStatus === 'unsigned') setStep(-1);
		if (tncStatus === 'signed') setStep(0);
	}, [tncStatus]);

	const getFormPage = () => {
		if (step === -1) {
			return <TncModal setStep={setStep} />;
		}
		if (step === 1) {
			return <SalesPage setStep={setStep} step={step} />;
		}
		if (step === 0) {
			return <CollectionPage setStep={setStep} step={step} />;
		}
		if (step === 2) {
			return <PaymentPage setStep={setStep} step={step} earlyPass={balance.value > 0} />;
		}
	};

	return (
		<Box mt="16rem" pt="mxxxl" mx="auto" width="64rem" minHeight="100vh" overflowX="visible">
			<SEATModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				earlyPass={balance.value > 0}
				loading={balance.loading}
				setTncStatus={setTncStatus}
			/>
			{getFormPage()}
		</Box>
	);
};

export default CreateComp;
