import { useEffect } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';

interface Props {
	children: React.ReactNode;
	visible: boolean;
	bg?: string;
}

const Modal = ({ children, visible, bg }: Props) => {
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
			bg={bg ?? `${theme.colors['simply-black']}4c`}
			top="0"
			left="0"
			height="100vh"
			width="100vw"
			overflowY="auto"
			overflowX="hidden"
			zIndex={15}
		>
			{children}
		</Box>
	);
};

export default Modal;
