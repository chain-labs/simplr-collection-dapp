import React, { useState } from 'react';
import Box from './Box';

export const height = {
	desk: '40px',
	mob: '24px',
};

export const width = {
	desk: '72px',
	mob: '38px',
};

const ballSize = (size) => {
	return size === 'desk' ? '32px' : '16px';
};

const Toggle = ({ value, setValue, size, ...restProps }) => {
	const toggleBallSize = ballSize(size);
	return (
		<Box>
			<Box
				display="flex"
				borderRadius="24px"
				alignItems="center"
				width={width[size]}
				height={height[size]}
				px="mxxs"
				cursor="pointer"
				backgroundColor={value ? 'blue-50' : '#ECF1F4'}
				boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
				css={`
					transition-property: background-color;
					transition-delay: 0.1s;
				`}
				{...restProps}
				onClick={() => {
					setValue(!value);
				}}
			>
				<Box
					width={toggleBallSize}
					height={toggleBallSize}
					backgroundColor="simply-white"
					boxShadow="0px 5.5px 5px -3px rgba(14, 14, 44, 0.2), inset 0px -1px 0px rgba(14, 14, 44, 0.4)"
					borderRadius="20px"
					border="none"
					cursor="pointer"
					transform={value ? (size === 'desk' ? 'translateX(30px)' : 'translate(15px)') : ''}
					css={`
						transition: 0.5s transform;
					`}
				></Box>
			</Box>
		</Box>
	);
};

export default Toggle;
