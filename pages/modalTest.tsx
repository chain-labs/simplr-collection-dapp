import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import { useAppDispatch } from 'src/redux/hooks';
import { showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';

const ModalTest = () => {
	const dispatch = useAppDispatch();

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(
			showModal({ type: MODALS_LIST.TEST_MODAL, props: { name: 'Test Modal', description: 'This is a test modal' } })
		);
	};
	return (
		<Box mt="wxxl" ml="ws">
			<Text as="h1">Modal Test</Text>
			<ButtonComp bg="primary" height="48px" px="mm" onClick={handleClick}>
				Open Modal
			</ButtonComp>
		</Box>
	);
};

export default ModalTest;
