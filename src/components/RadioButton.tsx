import React, { useState } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';

const RadioButton = ({ active, ...restProps }) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="32px"
			height="32px"
			border={active ? (isChecked ? `1px solid ${theme.colors['blue-50']}` : 'none') : 'none'}
			backgroundColor="#ECF1F4"
			boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			borderRadius="100%"
			cursor={active ? 'pointer' : 'not-allowed'}
			{...restProps}
			onClick={() => {
				setIsChecked(!isChecked);
			}}
		>
			<Box
				display={active ? 'flex' : 'none'}
				width="16px"
				height="16px"
				borderRadius="100%"
				backgroundColor={isChecked ? 'blue-50' : '#ECF1F4'}
				outline="none"
			></Box>
		</Box>
	);
};

export default RadioButton;
