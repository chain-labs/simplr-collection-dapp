import React, { useState } from 'react';
import Box from './Box';

const Toggle = () => {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	return (
		<Box>
			<Box
				display="flex"
				justifyContent={isChecked ? 'flex-end' : 'flex-start'}
				borderRadius="24px"
				alignItems="center"
				width="72px"
				height="40px"
				px="mxxs"
				cursor="pointer"
				backgroundColor={isChecked ? 'blue-50' : '#ECF1F4'}
				boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			>
				<Box
					as="button"
					width="32px"
					height="32px"
					backgroundColor="simply-white"
					boxShadow="0px 5.5px 5px -3px rgba(14, 14, 44, 0.2), inset 0px -1px 0px rgba(14, 14, 44, 0.4)"
					borderRadius="20px"
					border="none"
					cursor="pointer"
					onClick={() => {
						setIsChecked(!isChecked);
					}}
				></Box>
			</Box>
		</Box>
	);
};

export default Toggle;
