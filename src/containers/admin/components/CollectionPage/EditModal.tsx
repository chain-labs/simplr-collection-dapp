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
					<If
						condition={step === 0}
						then={
							<Box>
								<Text as="b3" fontWeight="medium" mb="ms">
									Enter new {modalData.label.toLocaleLowerCase()}
								</Text>
								<If
									condition={modalData.type === 'time'}
									then={<DateTime value={data} setValue={setValue} width="43rem" />}
									else={
										<If
											condition={modalData.type === 'number'}
											then={
												<Box between>
													<TextInput
														type={modalData.type}
														placeholder={modalData.placeholder}
														value={value}
														width="100%"
														setValue={setValue}
														disableValidation
													/>
													<Box ml="mxs" />
													<TextInput
														type={modalData.type}
														placeholder={modalData.data}
														value={value}
														width="100%"
														setValue={setValue}
														disableValidation
													/>
												</Box>
											}
											else={
												<TextInput
													type={modalData.type}
													placeholder={modalData.placeholder}
													value={value}
													width="100%"
													setValue={setValue}
													disableValidation
												/>
											}
										/>
									}
								/>

								<Box mt="mxxl" />
								<Text as="c1" color="gray-00" fontFamily="Open Sauce One">
									OLD DATA : {modalData.data}
								</Text>
								<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex">
									ESTIMATED GAS COST :{' '}
									<Text as="c1" color="simply-blue">
										0.0001 ETH or 1 USD.
									</Text>
								</Text>
							</Box>
						}
					/>
					<If
						condition={step === 1}
						then={
							<Box>
								<Text as="h4" mb="ms" fontFamily="Switzer">
									Confirm Change
								</Text>
								<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
									Every change in the smart contract costs gas. Do you want to commit these changes?
								</Text>

								<Box mt="ml" />
								<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex">
									GAS COST :{' '}
									<Text as="c1" color="simply-blue">
										0.0001 ETH or 1 USD.
									</Text>
								</Text>
							</Box>
						}
					/>
					<If
						condition={step === 2}
						then={
							<Box>
								<Text as="h4" mb="ms" fontFamily="Switzer">
									{modalData.label}
								</Text>
								<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
									Successfully changed the {modalData.label}. Changes have been reflected on your dashboard.
								</Text>

								<Box mt="mm" />
								<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex">
									OLD {modalData.label.toUpperCase()} :{' '}
									{modalData.editable === 'address' ? (
										<Text as="c1" color="simply-blue">
											{modalData.data.slice(0, 4)}...{modalData.data.slice(38, 42)}
										</Text>
									) : (
										<Text as="c1" color="simply-blue">
											{modalData.data}
										</Text>
									)}
								</Text>
								<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex" mt="mxxs">
									NEW {modalData.label.toUpperCase()} :{' '}
									{modalData.editable === 'address' ? (
										<Text as="c1" color="simply-blue">
											{modalData.data.slice(0, 4)}...{modalData.data.slice(38, 42)}
										</Text>
									) : (
										<Text as="c1" color="simply-blue">
											{modalData.data}
										</Text>
									)}
								</Text>

								<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex" mt="mm">
									GAS COST :{' '}
									<Text as="c1" color="simply-blue">
										0.0001 ETH or 1 USD.
									</Text>
								</Text>
							</Box>
						}
					/>

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
