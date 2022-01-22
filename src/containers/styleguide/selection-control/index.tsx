import React, { useState } from 'react';
import Box from 'src/components/Box';
import Checkbox from 'src/components/Checkbox';
import RadioButton from 'src/components/RadioButton';
import Toggle from 'src/components/Toggle';

const SelectionControllerComp = () => {
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isSelected, setIsSelected] = useState<boolean>(false);
	return (
		<Box display="flex" justifyContent="center">
			<Box mr="12px">
				ACTIVE
				<Toggle value={isToggled} setValue={setIsToggled} mx="12px" />
				<Checkbox value={isChecked} setValue={setIsChecked} mt="12px" mx="12px" />
				<RadioButton value={isSelected} setValue={setIsSelected} mt="12px" mx="12px" />
			</Box>
			<Box>
				DISABLED
				<Toggle value={true} mt="mxl" mobile disabled />
				<Checkbox mt="12px" mx="12px" value={isChecked} setValue={setIsChecked} disabled />
				<RadioButton value={isSelected} setValue={setIsSelected} mt="12px" mx="12px" disabled />
			</Box>
		</Box>
	);
};

export default SelectionControllerComp;
