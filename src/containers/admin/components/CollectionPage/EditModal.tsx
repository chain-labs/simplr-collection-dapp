/* eslint-disable no-console */
import { ethers } from 'ethers';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import StatusModal from './StatusModal';
import Step1Modal from './Step1Modal';
import Step2Modal from './Step2Modal';
import Step3Modal from './Step3Modal';
import Step4Modal from './Step4Modal';

interface props {
	visible: boolean;
	setVisible: (boolean) => void;
}

const EditModal = ({ visible, setVisible }: props) => {
	const modalData = useAppSelector(editSelector);
	const [value, setValue] = useState('');
	const [step, setStep] = useState(0);
	const [gas, setGas] = useState('');
	const [fails, setFails] = useState(false);
	const [buttonText, setButtonText] = useState('Proceed');
	const user = useAppSelector(userSelector);

	const getGasPrice = async () => {
		const fees = await user.provider?.getGasPrice();
		try {
			if (modalData.editfield === 'reserve tokens') {
				if (value) {
					const gas = await modalData.contract.connect(user.signer).estimateGas.reserveTokens(value);
					setGas(ethers.utils.formatUnits(gas.mul(fees)));
				}
			} else if (modalData.editfield === 'wallet address') {
				if (value) {
					const gas = await modalData.contract.connect(user.signer).estimateGas.transferOwnership(value);
					setGas(ethers.utils.formatUnits(gas.mul(fees)));
				}
			} else if (modalData.editfield === 'Collection URI') {
				if (value) {
					const gas = await modalData.contract.connect(user.signer).estimateGas.setProjectURI(value);
					setGas(ethers.utils.formatUnits(gas.mul(fees)));
				}
			} else if (modalData.editable === 'Live') {
				const gas = await modalData.contract.connect(user.signer).estimateGas.pause();
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editable === 'Paused') {
				const gas = await modalData.contract.connect(user.signer).estimateGas.unpause();
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editfield === 'Reveal') {
				if (value) {
					const gas = await modalData.contract.connect(user.signer).estimateGas.setProjectURIAndReveal(value);
					setGas(ethers.utils.formatUnits(gas.mul(fees)));
				}
			}
		} catch (err) {
			console.log(err);
			setFails(true);
		}
	};

	useEffect(() => {
		if (user.provider && user.signer && step < 2) getGasPrice();
	}, [step]);

	useEffect(() => {
		setTimeout(() => {
			if (step < 2 && user.signer) {
				getGasPrice();
			}
		}, 4000);
	}, [gas]);

	const handleAction = async () => {
		if (step === 0) {
			setStep(1);
			setButtonText('Commit Change');
		}
		if (step === 1) {
			setStep(2);
			setButtonText('Opening Metamask');
			if (user.provider && user.signer) {
				try {
					if (modalData.editfield === 'reserve tokens') {
						const transaction = await modalData.contract.connect(user.signer).reserveTokens(value);
						if (transaction) {
							setButtonText('Processing Transaction');
						}
						transaction
							.wait()
							.then(() => {
								toast.success('Reserve token updated');
								setButtonText('Return to Dashboard');
								setStep(3);
							})
							.catch((err) => {
								console.error({ err });
								toast.error('An unexpected error occured');
								setVisible(false);
							});
					}
					if (modalData.editfield === 'wallet address') {
						const transaction = await modalData.contract.connect(user.signer).transferOwnership(value);
						if (transaction) {
							setButtonText('Processing Transaction');
						}
						transaction
							.wait()
							.then(() => {
								toast.success('Admin wallet address updated');
								setButtonText('Return to Dashboard');
								setStep(3);
							})
							.catch((err) => {
								console.error({ err });
								toast.error('An unexpected error occured');
								setVisible(false);
							});
					}
					if (modalData.editfield === 'Collection URI') {
						const transaction = await modalData.contract.connect(user.signer).setProjectURI(value);
						if (transaction) {
							setButtonText('Processing Transaction');
						}
						transaction
							.wait()
							.then(() => {
								setButtonText('Return to Dashboard');
								toast.success('Collection URI updated');
								setStep(3);
							})
							.catch(() => {
								toast.error('An unexpected error occured');
								setVisible(false);
							});
					}
					if (modalData.editable === 'Live') {
						const transaction = await modalData.contract.connect(user.signer).pause();
						if (transaction) {
							setButtonText('Processing Transaction');
						}
						transaction
							.wait()
							.then(() => {
								setButtonText('Return to Dashboard');
								toast.success('Sale Paused');
								setStep(3);
							})
							.catch(() => {
								toast.error('An unexpected error occured');
								setVisible(false);
							});
					}
					if (modalData.editable === 'Paused') {
						const transaction = await modalData.contract.connect(user.signer).unpause();
						if (transaction) {
							setButtonText('Processing Transaction');
						}
						transaction
							.wait()
							.then(() => {
								toast.success('Sale Unpaused');
								setButtonText('Return to Dashboard');
								setStep(3);
							})
							.catch(() => {
								toast.error('An unexpected error occured');
								setVisible(false);
							});
					}
					if (modalData.editfield === 'Reveal') {
						const transaction = await modalData.contract.connect(user.signer).setProjectURIAndReveal(value);
						if (transaction) {
							setButtonText('Processing Transaction');
						}
						transaction
							.wait()
							.then(() => {
								toast.success('Collection Revealed');
								setButtonText('Return to Dashboard');
								setStep(3);
							})
							.catch((err) => {
								console.log(err);
								toast.error('An unexpected error occured');
								setVisible(false);
							});
					}
				} catch (err) {
					console.log(err);
					toast.error('An unexpected error occured');
					setVisible(false);
				}
			}
		}
		if (step === 2) {
			setStep(3);
		}
		if (step === 3) {
			setStep(0);
			setVisible(false);
		}
	};

	const getModalStep = () => {
		if (step === 0) {
			if (modalData.editable === 'Live' || modalData.editable === 'Paused')
				return <StatusModal gas={gas} fails={fails} />;
			else return <Step1Modal value={value} setValue={setValue} />;
		}
		if (step === 1) {
			return <Step2Modal gas={gas} fails={fails} />;
		}
		if (step === 2) {
			return <Step3Modal />;
		}
		if (step === 3) {
			return <Step4Modal value={value} />;
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
					<If
						condition={step === 0 && (modalData.editable === 'Live' || modalData.editable === 'Paused')}
						then={
							<ButtonComp bg="primary" height="40px" mt="ml" onClick={handleAction}>
								<Text as="h6" fontFamily="Switzer">
									{modalData.editable === 'Live' ? 'Pause' : 'Resume'}
								</Text>
							</ButtonComp>
						}
						else={
							<ButtonComp
								bg="primary"
								height="40px"
								width="100%"
								onClick={handleAction}
								mt="mxl"
								disable={step === 2 ? true : false}
								center
							>
								<Text as="h6" fontFamily="Switzer">
									{buttonText}
								</Text>
								{step === 2 ? (
									<Box center className="spin" ml="mxs">
										<CircleNotch size={20} />
									</Box>
								) : (
									''
								)}
							</ButtonComp>
						}
					/>

					<If
						condition={step === 0 || step === 1}
						then={
							<ButtonComp width="100%" bg="secondary" height="40px" onClick={() => setVisible(false)} mt="ml">
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
