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
	disable?: boolean;
	children?: string | React.ReactNode;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
	type?: string;
}

const ButtonComp = ({ bg, disable, height, children, ...restProps }: ButtonProps): JSX.Element => {
	const buttonColour = color[bg];
	const hColor = !disable ? hoverColor[bg] : 'simply-white';
	const bColor = borderColor(bg);
	return (
		<Box
			as="button"
			backgroundColor={!disable ? buttonColour : 'simply-white'}
			//@ts-expect-error-button
			color={!disable ? fontColor(bg) : 'disable-black'}
			border={!disable ? bColor : '1px solid rgba(140, 140, 161, 0.2)'}
			borderRadius="8px"
			height={height}
			cursor={!disable ? 'pointer' : 'not-allowed'}
			disabled={!disable ? false : true}
			css={`
				&:hover {
					background-color: ${theme.colors[`${hColor}`]};
				}
			`}
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default ButtonComp;
