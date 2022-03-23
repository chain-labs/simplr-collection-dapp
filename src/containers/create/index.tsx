import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import SalesPage from './components/SalesPage';
import PaymentPage from './components/PaymentPage';
import CollectionPage from './components/CollectionPage';
import SEATModal from './components/SEATModal';
import Tnc from './components/Tnc';
import If from 'src/components/If';
import { userSelector } from 'src/redux/user';
import { useAppSelector } from 'src/redux/hooks';

const CreateComp = ({ balance }) => {
	const [step, setStep] = useState<number>();
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [tncStatus, setTncStatus] = useState('');
	const user = useAppSelector(userSelector);

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

	useEffect(() => {
		setIsModalOpen(true);
	}, [user]);

	const getFormPage = () => {
		if (step === -1) {
			return <Tnc setStep={setStep} />;
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
			{getFormPage()}
			<SEATModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				balance={balance.value}
				loading={balance.loading}
				setTncStatus={setTncStatus}
			/>
		</Box>
	);
};

export default CreateComp;
