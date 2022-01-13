import { useState } from 'react';
import Box from 'src/components/Box';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';

const InputComponents = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	return (
		<Box px="wm" py="mm">
			<Text as="h1">Input Components</Text>
			<Box bg="black-10" height="2px" mb="mm" />
			<LabelledTextInput
				placeholder="Field Text"
				regexp=".{8,}"
				label="Textfield Default"
				value={name}
				setValue={setName}
			/>
			<Box mb="wm" />

			<LabelledTextInput
				placeholder="Field Text"
				disabled
				label="Disabled Input Field"
				helperText="This input field is disabled"
				value={pass}
				setValue={setPass}
			/>
			<Box mb="wm" />
			<TextInput placeholder="Field Text" type="email" value={email} setValue={setEmail} />
		</Box>
	);
};

export default InputComponents;
