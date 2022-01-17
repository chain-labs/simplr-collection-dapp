import Box from './Box';
import Text from './Text';
import TextInput from './TextInput';

interface Props {
	label: string;
	helperText?: string;
	placeholder?: string;
	regexp?: string;
	disabled?: boolean;
	value: any;
	setValue: (any) => void;
}

const LabelledTextInput = ({ label, helperText, placeholder, regexp, disabled, value, setValue }: Props) => {
	return (
		<Box overflow="visible">
			<Text as="h6" mb="mxs" color="simply-gray">
				{label}
			</Text>
			<TextInput {...{ disabled, regexp, placeholder, value, setValue }} />
			{!!helperText && (
				<Text as="b1" mt="mxs" color="simply-gray">
					{helperText}
				</Text>
			)}
		</Box>
	);
};

export default LabelledTextInput;
