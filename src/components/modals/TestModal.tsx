import React from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal, replaceModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import ButtonComp from '../Button';
import Text from '../Text';

const TestModal = ({ name, description }) => {
	const dispatch = useAppDispatch();
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(hideModal());
	};
	const handleReplace = (e) => {
		e.preventDefault();
		dispatch(
			replaceModal({
				type: MODALS_LIST.TEST_MODAL_2,
				props: { name: 'Test Modal 2', description: 'This is a test modal 2', count: 2 },
			})
		);
	};
	return (
		<Box
			width="100vw"
			minHeight="100vh"
			bg={`${theme.colors['simply-black']}80`}
			position="absolute"
			left="0"
			top="0"
			zIndex={100}
		>
			<Box
				px="mxl"
				py="ml"
				height="25vh"
				width="50vw"
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="simply-white"
			>
				<Text as="h1" mb="mm">
					{name}
				</Text>
				<Text as="b1">{description}</Text>

				<ButtonComp bg="primary" height="48px" px="mm" onClick={handleClick} mr="mm">
					Close Modal
				</ButtonComp>
				<ButtonComp bg="primary" height="48px" px="mm" onClick={handleReplace}>
					Replace Modal
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default TestModal;
