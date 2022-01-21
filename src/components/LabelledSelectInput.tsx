import { CaretDown } from 'phosphor-react';
import React, { Children } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import Dropdown from './Dropdown';
import Text from './Text';

export interface InputProps {
	label: string;
	placeholder?: string;
	set: (any) => void;
	visible: any;
	children?: string | React.ReactNode;
	value?: any;
	setValue: (any) => void;
}

const LabelledSelectInput = ({ label, placeholder, set, visible, value, setValue }: InputProps) => {
	return (
		<Box overflow="visible">
			<Text as="h6" mb="mxs" color="simply-gray">
				{label}
			</Text>
			<Box display="flex" color="disable-black" onClick={(e) => set(!visible)}>
				<Box
					as="input"
					value={value}
					placeholder={placeholder}
					backgroundColor="white-00"
					padding="12px 16px"
					width="32rem"
					boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
					borderRadius="8px"
					border="0.5px solid #E6E6FF"
					outline="none"
					fontSize="16px"
					fontFamily="Switzer"
					fontWeight="500"
					color={value ? 'simply-black' : 'inherit'}
					css={`
						&:focus {
							border: 0.5px solid ${theme.colors['white-10']};
						}
					`}
					onChange={(e) => setValue(e.target.value)}
				></Box>
				<Box ml="-4.2rem" mt="1.1rem" cursor="pointer">
					<CaretDown size={24} color={theme.colors['disable-black']} />
				</Box>
			</Box>
		</Box>
	);
};

export default LabelledSelectInput;
