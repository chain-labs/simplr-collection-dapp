import Box from './Box';
import If from './If';
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
	type?: string;
	unit?: string;
	required?: boolean;
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
	setValue,
	unit,
	required,
}: Props) => {
	return (
		<Box overflow="visible">
			<Text as="h6" mb="mxs" color="simply-black">
				{label}
				<If
					condition={required}
					then={
						<Box as="span" color="red">
							*
						</Box>
					}
				/>
			</Text>
			<TextInput {...{ disabled, regexp, required, placeholder, value, type, unit, setValue }} />
			{!!helperText && (
				<Text as="b1" mt="mxs" color="simply-gray">
					{helperText}
				</Text>
			)}
		</Box>
	);
};

export default LabelledTextInput;
