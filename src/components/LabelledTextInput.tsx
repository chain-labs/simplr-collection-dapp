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
	step?: string;
	setValue: (any) => void;
	type?: string;
	unit?: string;
	children?: string | React.ReactNode;
}

const LabelledTextInput = ({
	label,
	helperText,
	type,
	placeholder,
	regexp,
	disabled,
	value,
	step,
	setValue,
	unit,
}: Props) => {
	return (
		<Box overflow="visible">
			<Text as="h6" mb="mxs" color="simply-gray">
				{label}
			</Text>
			<TextInput {...{ disabled, regexp, placeholder, value, type, unit, setValue, step }} />
			{!!helperText && (
				<Text as="b1" mt="mxs" color="simply-gray">
					{helperText}
				</Text>
			)}
		</Box>
	);
};

export default LabelledTextInput;
