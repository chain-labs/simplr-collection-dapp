import React, { useState } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';

const RadioButton = ({ active, value, setValue, ...restProps }) => {
	return (
		<Box
			as="button"
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="32px"
			height="32px"
			border={active ? (value ? `1px solid ${theme.colors['blue-50']}` : 'none') : 'none'}
			bg="#ECF1F4"
			boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			borderRadius="100%"
			cursor={active ? 'pointer' : 'not-allowed'}
			{...restProps}
			onClick={
				active
					? () => {
							setValue(!value);
					  }
					: () => {
							setValue(value);
					  }
			}
		>
			<Box
				display={active ? 'flex' : 'none'}
				width="16px"
				height="16px"
				borderRadius="100%"
				bg={active ? (value ? 'blue-50' : '#ECF1F4') : '#ECF1F4'}
				outline="none"
			></Box>
		</Box>
	);
};

export default RadioButton;
