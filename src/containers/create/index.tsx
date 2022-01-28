import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { CaretRight } from 'phosphor-react';
import theme from 'src/styleguide/theme';
import SalesPage from './components/SalesPage';
import PaymentPage from './components/PaymentPage';
import CollectionPage from './components/CollectionPage';

const CreateComp = () => {
	const [step, setStep] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [step]);

	const getFormPage = (step) => {
		if (step === 1) {
			return <SalesPage setStep={setStep} step={step} />;
		}
		if (step === 0) {
			return <CollectionPage setStep={setStep} step={step} />;
		}
		if (step === 2) {
			return <PaymentPage setStep={setStep} step={step} />;
		}
	};

	return (
		<Box pt="mxxxl" mx="auto" width="64rem" minHeight="100vh" overflowX="visible">
			{getFormPage(step)}
		</Box>
	);
};

export default CreateComp;
