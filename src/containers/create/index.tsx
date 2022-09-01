import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import Footer from './Footer';
import Header from './Header';
import CollectionSection from './sections/Collection';
import DeploymentSection from './sections/Deploy';
import PricingSection from './sections/Pricing';
import TypeSection from './sections/Type';
import WithdrawSection from './sections/Withdraw';

const CreateComponent = () => {
	const [step, setStep] = React.useState(0);
	const [disableButton, setDisableButton] = React.useState(true);

	const getFormSection = () => {
		switch (step) {
			case 0:
				return <TypeSection setDisableButton={setDisableButton} />;
			case 1:
				return <CollectionSection />;
			case 2:
				return <PricingSection />;
			case 3:
				return <WithdrawSection />;
			case 4:
				return <DeploymentSection />;
			default:
				return null;
		}
	};
	return (
		<Box width="126rem" mx="auto">
			<Header {...{ step, setStep }} />
			{getFormSection()}
			<Footer {...{ step, setStep }} disableButton={disableButton} />
		</Box>
	);
};

export default CreateComponent;
