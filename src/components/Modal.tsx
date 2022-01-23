import { useEffect } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';

const Modal = ({ children, visible }) => {
	useEffect(() => {
		document.querySelector('html').style.overflow = 'hidden';
		return () => {
			document.querySelector('html').style.overflow = 'scroll';
		};
	}, []);
	return (
		<Box
			display={visible ? 'initial' : 'none'}
			position="fixed"
			bg={`${theme.colors['black-90']}20`}
			top="0"
			left="0"
			height="100vh"
			width="100vw"
			overflowY="scroll"
			pb="15rem"
			zIndex={15}
		>
			{children}
		</Box>
	);
};

export default Modal;
