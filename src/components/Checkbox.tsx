import React from 'react';
import Box, { BoxProps } from './Box';
import { Check } from 'phosphor-react';
import theme from 'src/styleguide/theme';

interface Props extends BoxProps {
	disabled?: boolean;
	value?: boolean;
	setValue: (boolean) => void;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Checkbox = ({ disabled, value, setValue, ...restProps }: Props) => {
	// const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		//@ts-expect-error-box
		<Box
			width="32px"
			height="33px"
			cursor={disabled ? 'not-allowed' : 'pointer'}
			display="flex"
			justifyContent="center"
			alignItems="center"
			backgroundColor={disabled ? '#ECF1F4' : value ? 'blue-50' : '#ECF1F4'}
			boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			borderRadius="8px"
			border={disabled ? '1px solid rgba(71, 67, 197, 0.1)' : value ? `1px solid ${theme.colors['blue-50']}` : 'none'}
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
			<Check size={32} color="#ECF1F4" />
		</Box>
	);
};

export default Checkbox;
