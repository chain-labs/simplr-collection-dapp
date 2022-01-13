import { useState } from 'react';
import Box from 'src/components/Box';
import InputSlider from 'src/components/InputSlider';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextArea from 'src/components/TextArea';
import TextInput from 'src/components/TextInput';

const InputComponents = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [text, setText] = useState('');

	return (
		<Box px="wm" py="mm" display="grid" gridTemplateColumns="1fr 2fr" gridGap="mm">
			<Box gridColumn="span 2">
				<Text as="h1">Input Components</Text>
				<Box bg="black-10" height="2px" mb="mm" />
			</Box>
			<LabelledTextInput
				placeholder="Field Text"
				regexp=".{8,}"
				label="Textfield Default"
				value={name}
				setValue={setName}
			/>

			<LabelledTextInput
				placeholder="Field Text"
				disabled
				label="Disabled Input Field"
				helperText="This input field is disabled"
				value={pass}
				setValue={setPass}
			/>
			<Box gridRow="5" overflow="visible">
				<TextInput placeholder="Field Text" type="email" value={email} setValue={setEmail} />
			</Box>
			<Box gridColumn="2" gridRow="2 / 6">
				<TextArea value={text} setValue={setText} />
			</Box>
			<Box gridColumn="2" gridRow="6 / 7">
				<InputSlider />
			</Box>
		</Box>
	);
};

export default InputComponents;
