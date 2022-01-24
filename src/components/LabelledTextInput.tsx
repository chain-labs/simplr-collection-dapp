import { useState } from 'react';
import Question from 'src/icons/question.svg';
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
	value?: any;
	step?: string;
	setValue?: (any) => void;
	type?: string;
	unit?: string;
	required?: boolean;
	width?: string;
	min?: string;
	max?: string;
	tooltip?: boolean;
	tooltipText?: string;
	disableValidation?: boolean;
	fontSize?: string;
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
	width,
	setValue,
	unit,
	required,
	min,
	max,
	tooltip,
	tooltipText,
	disableValidation,
	fontSize,
	children,
}: Props) => {
	const [showTooltip, setShowTooltip] = useState<boolean>();
	return (
		<Box overflow="visible">
			<Text as="h6" mb="mxs" color="simply-black" display="flex">
				{label}
				<If
					condition={required}
					then={
						<Box as="span" color="red">
							*
						</Box>
					}
				/>
				<If
					condition={tooltip}
					then={
						<Box onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
							<Question />
						</Box>
					}
				/>
				<If
					condition={showTooltip}
					then={
						<Box
							overflow="visible"
							position="absolute"
							width="31rem"
							backgroundColor="#F6F6FF"
							padding="16px"
							borderRadius="12px"
							mt="-65px"
							ml="102px"
							boxShadow="0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)"
							border="1px solid rgba(171, 171, 178, 0.3)"
						>
							<Text as="c1">{tooltipText}</Text>
						</Box>
					}
				/>
			</Text>
			<If
				condition={!!children}
				then={children}
				else={
					<TextInput
						{...{
							disabled,
							regexp,
							required,
							placeholder,
							value,
							type,
							unit,
							setValue,
							step,
							width,
							min,
							max,
							disableValidation,
							fontSize,
						}}
					/>
				}
			/>
			{!!helperText && (
				<Text as="b1" mt="mxs" color="simply-gray">
					{helperText}
				</Text>
			)}
		</Box>
	);
};

export default LabelledTextInput;
