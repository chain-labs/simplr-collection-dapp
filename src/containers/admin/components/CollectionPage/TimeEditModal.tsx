import { useState } from 'react';
import ReactDom from 'react-dom';
import Box from 'src/components/Box';
import DateTime from 'src/components/DateTime';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import { DateType } from 'src/redux/sales/types';

interface Props {
	visible: boolean;
	setVisible: (boolean) => void;
	type?: 'presale' | 'sale';
}

const getInfo = (type: 'presale' | 'sale') => {
	if (type === 'presale') {
		return {
			title: 'Pre sale',
		};
	} else if (type === 'sale') {
		return {
			title: 'Public Sale',
		};
	}
};

const TimeEditModal = ({ visible, setVisible, type }: Props) => {
	const [info, setInfo] = useState(getInfo(type));
	const [time, setTime] = useState<DateType>({});
	if (!visible) return null;
	return ReactDom.createPortal(
		<Modal visible={visible}>
			<Box className="absolute-center" bg="simply-white" boxShadow="shadow-400" borderRadius="16px" p="mxl">
				<Text as="h4">{info?.title}</Text>
				<DateTime value={time} setValue={setTime} />
			</Box>
		</Modal>,
		document.getElementById('portal')
	);
};

export default TimeEditModal;
