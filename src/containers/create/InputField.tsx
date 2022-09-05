import React from 'react';
import Box from 'src/components/Box';

export interface InputFieldProps {
	label?: string;
	placeholder?: string;
	required?: boolean;
	type?: 'address' | 'email' | 'price' | 'url' | 'text';
	disabled?: boolean;
	value?: string | number;
}

const InputField = () => {
	return (
		<Box>
			<Box as="input"></Box>
		</Box>
	);
};

export default InputField;
