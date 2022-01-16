import React from 'react';
import Box from './Box';

const SingleButton = ({ value, setValue, children, currentActive, ...restProps }) => {
	return (
		<Box
			as="button"
			color={value === currentActive ? 'simply-white' : 'simply-blue'}
			backgroundColor={value === currentActive ? 'simply-blue' : 'light-purple'}
			boxShadow={
				value === currentActive
					? '0px 6px 2px -4px rgba(14, 14, 44, 0.1), inset 0px -1px 0px rgba(14, 14, 44, 0.4)'
					: 'none'
			}
			border="none"
			onClick={() => setValue(value)}
			width="25%"
			height="48px"
			cursor="pointer"
			borderRadius="8px"
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default SingleButton;
