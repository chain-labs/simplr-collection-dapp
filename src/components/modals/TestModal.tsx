import React from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal } from 'src/redux/modal';
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

				<ButtonComp bg="primary" height="48px" px="mm" onClick={handleClick}>
					Close Modal
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default TestModal;
