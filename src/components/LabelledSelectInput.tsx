import { CaretDown } from 'phosphor-react';
import React from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import Text from './Text';

export interface InputProps {
	label: string;
	placeholder?: string;
	set: (any) => void;
	visible: any;
	children?: string | React.ReactNode;
	value?: any;
	width?: string;
	disabled?: boolean;
	bg?: string;
}

const LabelledSelectInput = ({ label, placeholder, set, visible, value, width, disabled, bg }: InputProps) => {
	return (
		<Box overflow="visible">
			<Text as="h6" mb={label ? 'mxs' : '0'} color="simply-black">
				{label}
			</Text>
			<Box display="flex" color="disable-black" onClick={() => set(!visible)} width={width}>
				<Box
					as="input"
					value={value}
					readOnly
					placeholder={placeholder}
					bg={bg ?? 'white-10'}
					padding="12px 16px"
					width={width}
					border="1px solid"
					borderColor="blue-20"
					boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
					borderRadius="4px"
					outline="none"
					fontSize="16px"
					fontFamily="Switzer"
					fontWeight="500"
					color={disabled ? '#777777' : value ? 'simply-black' : 'inherit'}
					css={`
						&:focus {
							border: 0.5px solid ${theme.colors['white-10']};
						}
					`}
					cursor={disabled === true ? 'not-allowed' : 'pointer'}
				></Box>
				<Box ml="-4.2rem" mt="1.1rem" cursor={disabled ? 'not-allowed' : 'pointer'}>
					<CaretDown size={24} color={theme.colors['disable-black']} />
				</Box>
			</Box>
		</Box>
	);
};

export default LabelledSelectInput;
