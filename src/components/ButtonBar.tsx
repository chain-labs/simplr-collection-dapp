import React from 'react';
import Box from './Box';

const ButtonBarComp = ({ children }) => {
	return (
		<Box backgroundColor="light-purple" width="400px" borderRadius="8px">
			{children}
		</Box>
	);
};

export default ButtonBarComp;
