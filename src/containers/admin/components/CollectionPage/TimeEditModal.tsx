import { format } from 'date-fns';
import { ethers } from 'ethers';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Dropdown from 'src/components/Dropdown';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { getTimestamp } from 'src/containers/create/components/SalesPage';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';
import { timezones } from 'src/utils/timezones';
import Step2Modal from './Step2Modal';
import Step3Modal from './Step3Modal';

interface Props {
	visible: boolean;
	setVisible: (boolean) => void;
	type?: 'presale' | 'sale';
	data: any;
}

const getInfo = (type: 'presale' | 'sale') => {
	if (type === 'presale') {
		return {
			title: 'Pre sale',
			cta: 'Save Changes',
			confirmation:
				'Successfully updated the Pre-sale date and time. Changes might take a while to reflect on your dashboard.',
		};
	} else if (type === 'sale') {
		return {
			title: 'Public Sale',
			cta: 'Save Changes',
			confirmation:
				'Successfully updated the Public sale date and time. Changes might take a while to reflect on your dashboard.',
		};
	}
};

const TimeEditModal = ({ visible, setVisible, type, data }: Props) => {
	const [info, setInfo] = useState(getInfo(type));
	const [time, setTime] = useState('');
	const [date, setDate] = useState('');
	const [timezone, setTimezone] = useState('');
	const [oldDate, setOldDate] = useState('');
	const [oldTime, setOldTime] = useState('');
	const [step, setStep] = useState(0);
	const [gas, setGas] = useState('');
	const { contract } = useAppSelector(editSelector);
	const [provider] = useEthers();
	const [signer] = useSigner(provider);

	useEffect(() => {
		const now = new Date().toString();
		const timezone = now.split(' ')[5];
		setTimezone(`${timezone.substring(0, 6)}:${timezone.substr(-2)}`);
		const oldDate = new Date(parseInt(data) * 1000);
		setOldDate(format(oldDate, 'dd/MM/yyyy'));
		setOldTime(format(oldDate, 'OOOOO, pp'));
	}, [data]);

	const handleSave = async () => {
		if (step === 0) {
			const now = Date.now() / 1000;
			const newDate = getTimestamp({ date, time, timezone });
			if (newDate < now) {
				toast.error("Can't set a date in the past");
			} else {
				setStep(1);
			}
		} else if (step === 1) {
			setNewTime().then(() => {
				setStep(3);
			});
			setStep(2);
		} else if (step === 3) {
			setTime('');
			setDate('');
			setStep(0);
			setVisible(false);
		}
	};

	const setNewTime = async () => {
		const transaction = await contract
			.connect(signer)
			.setSaleStartTime(getTimestamp({ date, time, timezone }), type !== 'presale');
		const event = (await transaction.wait())?.events;
		return event;
	};

	const getGas = async () => {
		const fees = await provider?.getGasPrice();
		const gas = await contract
			.connect(signer)
			.estimateGas.setSaleStartTime(getTimestamp({ date, time, timezone }), type === 'sale');
		setGas(ethers.utils.formatUnits(gas.mul(fees)));
	};

	useEffect(() => {
		if (step === 1) {
			getGas();
			setInfo({ ...info, cta: 'Commit Changes' });
		}
		if (step === 2) {
			setInfo({ ...info, cta: 'Opening Metamask' });
		}
		if (step === 3) {
			setInfo({ ...info, cta: 'Return to Dashboard' });
		}
	}, [step]);

	useEffect(() => {
		if (step === 1) {
			setTimeout(async () => {
				getGas();
			}, 4000);
		}
	}, [gas]);

	const getStep = (step) => {
		switch (step) {
			case 1: {
				return <Step2Modal gas={gas} />;
			}
			case 2: {
				return <Step3Modal gas={gas} />;
			}
		}
	};

	if (!visible) return null;
	return ReactDom.createPortal(
		<Modal visible={visible}>
			<Box
				className="absolute-center"
				bg="simply-white"
				boxShadow="shadow-400"
				borderRadius="16px"
				p="mxl"
				maxWidth={step === 3 ? '50rem' : '38rem'}
			>
				<If
					condition={step === 0 || step === 3}
					then={
						<Box>
							<Text as="h4">{info?.title}</Text>
							<If
								condition={step === 3}
								then={
									<Box>
										<Box
											height="0.1rem"
											display={step === 3 ? 'block' : 'none'}
											bg={`${theme.colors['simply-black']}33`}
											my="mxl"
										/>
										<Text as="h6">{info?.confirmation}</Text>
									</Box>
								}
								else={
									<Box width="33rem" mt="mxl">
										<LabelledTextInput label="Date:">
											<TextInput
												placeholder="DD/MM/YYYY"
												type="date"
												value={date}
												setValue={setDate}
												width="100%"
												required
												disableValidation
											/>
										</LabelledTextInput>
										<Box mt="mm" />
										<LabelledTextInput label="Time:">
											<TextInput
												placeholder="hh:mm:ss AM/PM"
												type="time"
												value={time}
												step="1"
												setValue={setTime}
												width="100%"
												required
												disableValidation
											/>
										</LabelledTextInput>
										<Box mt="ms" />
										<Dropdown data={timezones} value={timezone} setValue={setTimezone} width="33rem" />
									</Box>
								}
							/>
							<Box between>
								<Box my="mxl">
									<Box row>
										<Text as="c1" fontWeight="bold" color="disable-black">
											CURRENT DATE:
										</Text>
										<Text as="c1" color="simply-blue" ml="mxs">
											{oldDate}
										</Text>
									</Box>
									<Box row>
										<Text as="c1" fontWeight="bold" color="disable-black">
											CURRENT TIME:
										</Text>
										<Text as="c1" color="simply-blue" ml="mxs">
											{oldTime}
										</Text>
									</Box>
								</Box>
								<If
									condition={step === 3}
									then={
										<Box my="mxl">
											<Box row>
												<Text as="c1" fontWeight="bold" color="disable-black">
													UPDATED DATE:
												</Text>
												<Text as="c1" color="simply-blue" ml="mxs">
													{date && time
														? format(new Date(getTimestamp({ date, time, timezone }) * 1000), 'dd/MM/yyyy')
														: ''}
												</Text>
											</Box>
											<Box row>
												<Text as="c1" fontWeight="bold" color="disable-black">
													UPDATED TIME:
												</Text>
												<Text as="c1" color="simply-blue" ml="mxs">
													{data && time
														? format(new Date(getTimestamp({ date, time, timezone }) * 1000), 'OOOOO, pp')
														: ''}
												</Text>
											</Box>
										</Box>
									}
								/>
							</Box>
						</Box>
					}
					else={getStep(step)}
				/>
				<Box mt="mxl">
					<ButtonComp
						bg="primary"
						disable={!(timezone && date && time) || step === 2}
						height="40px"
						width="100%"
						onClick={() => handleSave()}
						row
						center
					>
						<Text as="h6">{info.cta}</Text>
						<Box className="spin" display={step === 2 ? 'flex' : 'none'} ml="ms">
							<CircleNotch size="20" />
						</Box>
					</ButtonComp>
					<ButtonComp
						bg="secondary"
						height="40px"
						width="100%"
						onClick={() => {
							setVisible(false);
						}}
						mt="mm"
						display={step < 2 ? 'block' : 'none'}
					>
						<Text as="h6">Cancel</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Modal>,
		document.getElementById('portal')
	);
};

export default TimeEditModal;
