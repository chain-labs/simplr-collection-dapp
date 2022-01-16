import React from 'react';
import Box, { BoxProps } from 'components/Box';
import theme from 'src/styleguide/theme';

export const color = {
	primary: 'blue-50',
	secondary: 'blue-00',
	tertiary: 'simply-white',
};

export const hoverColor = {
	primary: 'blue-60',
	secondary: 'blue-10',
	tertiary: 'blue-00',
};

const fontColor = (bg) => {
	return bg === 'primary' ? 'simply-white' : 'blue-50';
};

const borderColor = (bg) => {
	return bg === 'tertiary' ? `1px solid #4743C5` : 'none';
};

export interface ButtonProps extends BoxProps {
	bg?: 'primary' | 'secondary' | 'tertiary';
	active?: true | false;
	children?: string | React.ReactNode;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
}

const ButtonComp = ({ bg, active, height, children, ...restProps }: ButtonProps): JSX.Element => {
	const buttonColour = color[bg];
	const hColor = active ? hoverColor[bg] : 'simply-white';
	const bColor = borderColor(bg);
	return (
		<Box
			as="button"
			backgroundColor={active ? buttonColour : 'simply-white'}
			//@ts-expect-error-button
			color={active ? fontColor(bg) : 'disable-black'}
			border={active ? bColor : '1px solid rgba(140, 140, 161, 0.2)'}
			borderRadius="8px"
			height={height}
			cursor={active ? 'pointer' : 'not-allowed'}
			disabled={active ? false : true}
			css={`
				&:hover {
					background-color: ${theme.colors[`${hColor}`]};
				}
			`}
			boxShadow={active ? 'none' : 'inset 0px -1px 0.5px rgba(14, 14, 44, 0.4);'}
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default ButtonComp;
