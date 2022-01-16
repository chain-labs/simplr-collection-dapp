import React, { useState } from 'react';
import Box from './Box';
import { Check } from 'phosphor-react';

const Checkbox = ({ active, value, setValue, ...restProps }) => {
	// const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<Box
			width="32px"
			height="32px"
			cursor={active ? 'pointer' : 'not-allowed'}
			display="flex"
			justifyContent="center"
			alignItems="center"
			backgroundColor={active ? (value ? 'blue-50' : '#ECF1F4') : '#ECF1F4'}
			boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			borderRadius="8px"
			onClick={
				active
					? () => {
							setValue(!value);
					  }
					: () => {
							setValue(value);
					  }
			}
			{...restProps}
		>
			<Check size={32} color="#ECF1F4" />
		</Box>
	);
};

export default Checkbox;
