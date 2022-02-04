import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { editSelector } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector, removeWhitelist } from 'src/redux/sales';
import Step1Modal from './Step1Modal';
import Step2Modal from './Step2Modal';
import Step3Modal from './Step3Modal';

interface props {
	visible: boolean;
	setVisible: (boolean) => void;
	edit?: string;
	data?: any;
	label?: any;
	placeholder?: any;
}

const EditModal = ({ visible, setVisible, edit, data, label }: props) => {
	const modalData = useAppSelector(editSelector);
	const [value, setValue] = useState('');
	const [step, setStep] = useState(0);

	const handleAction = () => {
		if (step === 0) {
			setStep(1);
		}
		if (step === 1) {
			setStep(2);
		}
		if (step === 2) {
			setVisible(false);
		}
	};

	const getModalStep = () => {
		if (step === 0) {
			return <Step1Modal value={value} setValue={setValue} />;
		}
		if (step === 1) {
			return <Step2Modal value={value} setValue={setValue} />;
		}
		if (step === 2) {
			return <Step3Modal value={value} setValue={setValue} />;
		}
	};

	if (visible) {
		return (
			<Modal visible={visible}>
				<Box
					mx="auto"
					bg="simply-white"
					width="49rem"
					borderRadius="16px"
					p="mxxxl"
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					column
				>
					{getModalStep()}

					<ButtonComp bg="primary" height="40px" onClick={handleAction} mt="mxl">
						<Text as="h6" fontFamily="Switzer">
							{step === 0 ? 'Proceed' : step === 1 ? 'Commit Change' : 'Return to Dashboard'}
						</Text>
					</ButtonComp>
					<If
						condition={step === 0 || step === 1}
						then={
							<ButtonComp bg="secondary" height="40px" onClick={() => setVisible(false)} mt="ml">
								<Text as="h6" fontFamily="Switzer">
									Cancel
								</Text>
							</ButtonComp>
						}
					/>
				</Box>
			</Modal>
		);
	}
	return <></>;
};

export default EditModal;
