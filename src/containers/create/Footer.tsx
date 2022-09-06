import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';

interface Props {
	step: number;
	setStep: (step: number) => void;
	disableButton?: boolean;
}

const Footer = ({ step, setStep, disableButton }: Props) => {
	const handleBack = (e) => {
		e.preventDefault();
		setStep(step - 1);
	};

	const handleNext = (e) => {
		e.preventDefault();
		setStep(step + 1);
	};

	switch (step) {
		case 0:
			return (
				<Box width="100%" center pb="wl">
					<ButtonComp bg="primary" px="wm" py="mm" borderRadius="64px" onClick={handleNext} disable={disableButton}>
						<Text as="btn1">Select and Continue</Text>
					</ButtonComp>
				</Box>
			);
		case 1:
		case 2:
		case 3:
			return (
				<Box width={step === 3 ? '91rem' : '66.2rem'} row justifyContent="flex-end" mb="18rem">
					<Box>
						<ButtonComp bg="secondary" height="56px" width="16rem" mr="mxl" onClick={handleBack}>
							<Text as="btn1" color="simply-black">
								Back
							</Text>
						</ButtonComp>
						<ButtonComp bg="primary" height="56px" width="16rem" onClick={handleNext}>
							<Text as="btn1">Next</Text>
						</ButtonComp>
					</Box>
				</Box>
			);
		case 4:
			return (
				<Box width="66.2rem">
					<ButtonComp bg="primary" height="56px" width="100%">
						<Text as="btn1">Deploy Collection</Text>
					</ButtonComp>
				</Box>
			);
	}
};

export default Footer;
