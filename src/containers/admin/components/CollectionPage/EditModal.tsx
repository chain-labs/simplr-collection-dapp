import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { editSelector } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector, removeWhitelist } from 'src/redux/sales';
import Step1Modal from './Step1Modal';
import Step2Modal from './Step2Modal';
import Step3Modal from './Step3Modal';
import Step4Modal from './Step4Modal';

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
	const [loading, setLoading] = useState(false);

	const [provider, setProvider] = useEthers();
	const [signer] = useSigner(provider);

	const handleAction = async () => {
		console.log(modalData.contract);
		console.log(signer);
		if (step === 0) {
			setStep(1);
		}
		if (step === 1) {
			console.log(value);
			setStep(2);
			setLoading(true);
			if (modalData.editfield === 'reserve tokens') {
				modalData.contract
					.connect(signer)
					.reserveTokens(value)
					.catch((err) => {
						console.error(err);
						toast.error('Something Went Wrong');
					})
					.then(() => {
						console.log('successfull');
						toast.success('Updated');
						setLoading(false);
						setStep(3);
					});
			}
			if (modalData.editfield === 'wallet address') {
				modalData.contract
					.connect(signer)
					.transferOwnership(value)
					.catch((err) => {
						console.error(err);
						toast.error('Something Went Wrong');
					})
					.then(() => {
						toast.success('Updated');
						setStep(3);
					});
			}
		}
		if (step === 2) {
			setStep(3);
		}
		if (step === 3) {
			setVisible(false);
		}
	};

	const getModalStep = () => {
		if (step === 0) {
			return <Step1Modal value={value} setValue={setValue} />;
		}
		if (step === 1) {
			return <Step2Modal />;
		}
		if (step === 2) {
			return <Step3Modal />;
		}
		if (step === 3) {
			return <Step4Modal />;
		}
	};

	if (visible) {
		return (
			<Modal visible={visible}>
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 5000,
					}}
				/>
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

					<ButtonComp
						bg="primary"
						height="40px"
						onClick={handleAction}
						mt="mxl"
						disable={step === 2 ? true : false}
						center
					>
						<Text as="h6" fontFamily="Switzer">
							{step === 0
								? 'Proceed'
								: step === 1
								? 'Commit Change'
								: step === 2
								? 'Opening Metamask'
								: 'Return to Dashboard'}
						</Text>
						{step === 2 ? <CircleNotch size={20} /> : ''}
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
