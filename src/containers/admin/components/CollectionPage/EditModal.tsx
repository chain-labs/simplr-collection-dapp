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
import StatusModal from './StatusModal';
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
	const [gas, setGas] = useState('');

	const [provider, setProvider] = useEthers();
	const [signer] = useSigner(provider);
	const getGasPrice = async () => {
		console.log('gas');

		const fees = await provider?.getGasPrice();
		try {
			if (modalData.editfield === 'reserve tokens') {
				const gas = await modalData.contract.connect(signer).estimateGas.reserveTokens(value);
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editfield === 'wallet address') {
				const gas = await modalData.contract.connect(signer).estimateGas.transferOwnership(value);
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editfield === 'Collection URI') {
				const gas = await modalData.contract.connect(signer).estimateGas.setProjectURI(value);
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editable === 'Live') {
				const gas = await modalData.contract.connect(signer).estimateGas.pause();
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editable === 'Paused') {
				const gas = await modalData.contract.connect(signer).estimateGas.unpause();
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			} else if (modalData.editfield === 'Reveal') {
				const gas = await modalData.contract.connect(signer).estimateGas.setProjectURIAndReveal(modalData.data);
				setGas(ethers.utils.formatUnits(gas.mul(fees)));
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (provider && signer && step < 2) getGasPrice();
	}, [step]);

	useEffect(() => {
		setTimeout(() => {
			if (step < 2 && signer) {
				getGasPrice();
			}
		}, 4000);
	}, [gas]);

	const handleAction = async () => {
		if (step === 0) {
			setStep(1);
		}
		if (step === 1) {
			setStep(2);
			setLoading(true);
			if (provider && signer) {
        if (modalData.editfield === 'reserve tokens') {
					const transaction = await modalData.contract.connect(signer).reserveTokens(value);
					transaction
						.wait()
						.then(() => {
							toast.success('Reserve token updated');
							setStep(3);
						})
						.catch(() => {
							toast.error('An unexpected error occured');
							setVisible(false);
						});
				}
				if (modalData.editfield === 'wallet address') {
					const transaction = await modalData.contract.connect(signer).transferOwnership(value);
					transaction
						.wait()
						.then(() => {
							toast.success('Admin wallet address updated');
							setStep(3);
						})
						.catch(() => {
							toast.error('An unexpected error occured');
							setVisible(false);
						});
				}
				if (modalData.editfield === 'Collection URI') {
					const transaction = await modalData.contract.connect(signer).setProjectURI(value);
					transaction
						.wait()
						.then(() => {
							toast.success('Collection URI updated');
							setStep(3);
						})
						.catch(() => {
							toast.error('An unexpected error occured');
							setVisible(false);
						});
				}
				if (modalData.editable === 'Live') {
					const transaction = await modalData.contract.connect(signer).pause();
					transaction
						.wait()
						.then(() => {
							toast.success('Sale Paused');
							setStep(3);
						})
						.catch(() => {
							toast.error('An unexpected error occured');
							setVisible(false);
						});
				}
				if (modalData.editable === 'Paused') {
					const transaction = await modalData.contract.connect(signer).unpause();
					transaction
						.wait()
						.then(() => {
							toast.success('Sale Unpaused');
							setStep(3);
						})
						.catch((err) => {
							toast.error('An unexpected error occured');
							setVisible(false);
						});
				}
				if (modalData.editfield === 'Reveal') {
						const transaction = await modalData.contract.connect(signer).setProjectURIAndReveal(modalData.data);
            transaction
              .wait().then(() => {
  						  toast.success('Sale Unpaused');
	  					  setStep(3);
              })
			  		  .catch ((err) => {
    						console.log(err);
		    				toast.error('An unexpected error occured');
				    		setVisible(false);
            });
					}
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
			if (modalData.editable === 'Live' || modalData.editable === 'Paused' || modalData.editfield === 'Reveal') return <StatusModal gas={gas} />;
			else return <Step1Modal value={value} setValue={setValue} gas={gas} />;
		}
		if (step === 1) {
			return <Step2Modal gas={gas} />;
		}
		if (step === 2) {
			return <Step3Modal gas={gas} />;
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
