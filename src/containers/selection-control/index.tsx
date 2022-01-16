import React from 'react';
import Box from 'src/components/Box';
import Checkbox from 'src/components/Checkbox';
import RadioButton from 'src/components/RadioButton';
import Toggle from 'src/components/Toggle';

const SelectionControllerComp = () => {
	return (
		<Box display="flex" justifyContent="center">
			<Box mr="12px">
				ACTIVE
				<Toggle />
				<Checkbox active="true" mt="12px" mx="12px" />
				<RadioButton active="true" mt="12px" mx="12px" />
			</Box>
			<Box>
				DISABLED
				<Toggle />
				<Checkbox active="false" mt="12px" mx="12px" />
				<RadioButton active="false" mt="12px" mx="12px" />
			</Box>
		</Box>
	);
};

export default SelectionControllerComp;
