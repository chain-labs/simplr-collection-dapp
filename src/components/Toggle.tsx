import React from 'react';
import Box, { BoxProps } from './Box';

export interface ToggleProps extends BoxProps {
	mobile?: boolean;
	value?: boolean;
	setValue?: (boolean) => void;
	children?: string | React.ReactNode;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
	disabled?: boolean;
}
const Toggle = ({ value, setValue, mobile, disabled }: ToggleProps): JSX.Element => {
	return (
		<Box>
			<Box
				display="flex"
				borderRadius="24px"
				alignItems="center"
				width={mobile ? '38px' : '72px'}
				height={mobile ? '24px' : '40px'}
				px="mxxs"
				cursor="pointer"
				backgroundColor={disabled ? 'gray-00' : value ? 'blue-50' : '#ECF1F4'}
				boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
				outline="none"
				border="none"
				css={`
					transition-property: background-color;
					transition-delay: 0.1s;
				`}
				onClick={() => {
					disabled ? '' : setValue(!value);
				}}
			>
				<Box
					width={mobile ? '16px' : '32px'}
					height={mobile ? '16px' : '32px'}
					backgroundColor="simply-white"
					marginLeft={disabled ? (value ? (mobile ? '15px' : '30px') : '') : '0px'}
					boxShadow="0px 5.5px 5px -3px rgba(14, 14, 44, 0.2), inset 0px -1px 0px rgba(14, 14, 44, 0.4)"
					borderRadius="20px"
					border="none"
					cursor={disabled ? 'not-allowed' : 'pointer'}
					transform={!disabled ? (value ? (!mobile ? 'translateX(30px)' : 'translate(15px)') : '') : ''}
					css={`
						transition: 0.5s transform;
					`}
				></Box>
			</Box>
		</Box>
	);
};

export default Toggle;
