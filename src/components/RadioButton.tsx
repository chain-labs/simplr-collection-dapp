import React from 'react';
import theme from 'src/styleguide/theme';
import Box, { BoxProps } from './Box';

interface Props extends BoxProps {
	disabled?: boolean;
	value?: boolean;
	setValue: (boolean) => void;
	dangerouslySetInnerHTML?: { __html: string };

	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const RadioButton = ({ disabled, value, setValue, ...restProps }: Props): JSX.Element => {
	return (
		//@ts-expect-error-box
		<Box
			as="button"
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="32px"
			height="32px"
			border={disabled ? '2px solid rgba(71, 67, 197, 0.1)' : `2px solid ${theme.colors['blue-50']}`}
			bg="#ECF1F4"
			boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			borderRadius="100%"
			cursor={disabled ? 'not-allowed' : 'pointer'}
			onClick={
				disabled
					? () => {
							setValue(value);
					  }
					: () => {
							setValue(!value);
					  }
			}
			{...restProps}
		>
			<Box
				display={disabled ? 'none' : 'flex'}
				width="16px"
				height="16px"
				borderRadius="100%"
				bg={disabled ? '#ECF1F4' : value ? 'blue-50' : '#ECF1F4'}
				outline="none"
			></Box>
		</Box>
	);
};

export default RadioButton;
