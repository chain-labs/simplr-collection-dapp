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
				<Toggle value={isToggled} setValue={setIsToggled} mt="mxl" />
				<Checkbox active={true} mt="12px" mx="12px" value={isChecked} setValue={setIsChecked} />
				<RadioButton active={true} mt="12px" mx="12px" value={isSelected} setValue={setIsSelected} />
			</Box>
			<Box>
				DISABLED
				<Toggle value={isToggled} setValue={setIsToggled} mt="mxl" mobile />
				<Checkbox active={false} mt="12px" mx="12px" value={isChecked} setValue={setIsChecked} />
				<RadioButton value={isSelected} setValue={setIsSelected} active={false} mt="12px" mx="12px" />
			</Box>
		</Box>
	);
};

export default SelectionControllerComp;
