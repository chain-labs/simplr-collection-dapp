import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import SalesPage from './components/SalesPage';
import PaymentPage from './components/PaymentPage';
import CollectionPage from './components/CollectionPage';
import SEATModal from './components/SEATModal';
import Tnc from './components/Tnc';
import { SEAT_DISABLE, testNetworks } from 'src/utils/constants';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import If from 'src/components/If';

const CreateComp = ({ balance }) => {
	const [step, setStep] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [tncStatus, setTncStatus] = useState('');
	const user = useAppSelector(userSelector);
	const [isTestNetwork, setIsTestNetwork] = useState(testNetworks.includes(user.network.chain));

	useEffect(() => {
		setIsTestNetwork(testNetworks.includes(user.network.chain));
	}, [user.network]);

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
			return <PaymentPage setStep={setStep} step={step} balance={balance.value} />;
		}
	};

	return (
		<Box mt="16rem" pt="mxxxl" mx="auto" width="64rem" minHeight="100vh" overflowX="visible">
			{getFormPage()}
			<If
				condition={!SEAT_DISABLE}
				then={
					<SEATModal
						isOpen={isModalOpen && !isTestNetwork}
						setIsOpen={setIsModalOpen}
						balance={balance.value}
						loading={balance.loading}
						setTncStatus={setTncStatus}
					/>
				}
			/>
		</Box>
	);
};

export default CreateComp;
