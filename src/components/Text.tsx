import React from 'react';
import Box, { BoxProps } from 'components/Box';

export const fontSizes = {
	h1: { mobS: '3.2rem', tabS: '4.8rem', deskL: '6.4rem' },
	h2: { mobS: '2.4rem', tabS: '3.2rem', deskL: '4.8rem' },
	s1: { mobS: '2rem', tabS: '2.4rem', deskL: '3.6rem' },
	s2: { mobS: '2rem', tabS: '2rem', deskL: '2.4rem' },
	b1: { mobS: '1.6rem', tabS: '2rem', deskL: '2.4rem' },
};

export const charSpacing = {
	h1: { mobS: '-5%', deskM: '12%' },
	h2: '2%',
	s1: '8%',
	s2: '15%',
	b1: { mobS: '2%', deskM: '0%' },
};

export const fontW = {
	h1: 600,
	h2: 600,
	s1: 600,
	s2: 600,
	b1: 300,
};

const fontWeights = {
	bold: 700,
	'semi-bold': 600,
	medium: 500,
	regular: 400,
	thin: 300,
};

export interface TextProps extends BoxProps {
	as?: 'h1' | 'h2' | 's1' | 's2' | 'b1';
	fontWeight?: 'semi-bold' | 'bold' | 'medium' | 'regular' | 'thin';

	children?: string | React.ReactNode;
	id?: string;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
}

const Text = ({ as = 'b1', fontWeight, color, children, ...restProps }: TextProps): JSX.Element => {
	const fs = fontSizes[as];
	const fw = fontWeight ? fontWeights[fontWeight] : fontW[as];
	const cs = charSpacing[as] ?? '150%';

	return (
		<Box
			className={restProps.className}
			margin={0}
			padding={0}
			as={as}
			color={color as string}
			fontSize={fs}
			fontWeight={fw}
			letterSpacing={cs}
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default Text;
