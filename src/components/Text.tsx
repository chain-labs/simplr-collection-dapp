import React from 'react';
import Box, { BoxProps } from 'components/Box';

export const fontSizes = {
	h1: { mobS: '4rem', tabL: '4.8rem', deskM: '5.6rem' },
	h2: { mobS: '3.2rem', tabL: '4rem', deskM: '4.8rem' },
	h3: { mobS: '3.2rem', deskM: '4rem' },
	h4: { mobS: '2.4rem', deskM: '3.2rem' },
	h5: { mobS: '1.8rem', deskM: '2rem' },
	h6: '1.6rem',
	b3: { mobS: '1.2rem', deskM: '1.4rem' },
	b2: { mobS: '1.4rem', deskM: '1.6rem' },
	b1: { mobS: '1.6rem', deskM: '1.8rem' },
	btn1: { mobS: '1.6rem', deskM: '1.8rem' },
	btn2: { mobS: '1.4rem', deskM: '1.4rem' },
	c1: '1.2rem',
	c2: '1rem',
	nav: { mobS: '2rem', tabS: '1.4rem' },
};

const fontWeights = {
	'extra-bold': 'OpenSauceOneExtraBold',
	bold: 'OpenSauceOneBold',
	'semi-bold': 'OpenSauceOneSemiBold',
	medium: 'OpenSauceOneMedium',
	regular: 'OpenSauceOneRegular',
	thin: 'OpenSauceOneThin',
};

const fontW = {
	h1: fontWeights['extra-bold'],
	h2: fontWeights.bold,
	h3: fontWeights.bold,
	h4: { mobS: fontWeights.medium, deskM: fontWeights.bold },
	h5: { mobS: fontWeights.regular, deskM: fontWeights.medium },
	h6: fontWeights.medium,
	b3: fontWeights.regular,
	b2: fontWeights.regular,
	b1: fontWeights.regular,
	btn1: { mobS: fontWeights.regular, deskM: fontWeights.medium },
	btn2: fontWeights.regular,
	c1: fontWeights.medium,
	c2: fontWeights.medium,
	nav: { mobS: fontWeights.regular, deskM: fontWeights.medium },
};

const charSpacing = {
	h1: { mobS: '-0.5px', deskM: '-1px' },
	h2: '-0.5px',
	h3: '-0.5px',
	h4: '-0.5px',
	h5: '-0.5px',
	h6: '0px',
	b3: '0.1px',
	b2: { mobS: '0.1px', deskM: '-0.25px' },
	b1: '-0.25px',
	c1: '0.1px',
	c2: '0.1px',
	btn1: '0.1px',
	btn2: '-0.25px',
	nav: '0.1px',
};

const lineHeights = (as) => {
	switch (as) {
		case 'h1':
		case 'h2':
			return { mobS: '125%', deskM: '120%' };
		case 'h3':
		case 'h4':
			return '125%';
		case 'h5':
			return { mobS: '150%', deskM: '140%' };
		case 'h6':
			return '140%';
		case 'b3':
			return { mobS: '160%', deskM: '155%' };
		case 'b2':
			return { mobS: '160%', tabL: '155%', deskM: '150%' };
		case 'b1':
			return { mobS: '150%', deskM: '145%' };
		case 'btn1':
		case 'btn2':
			return '120%';
		case 'c1':
			return { mobS: '160%', deskM: '150%' };
		case 'c2':
			return '160%';
		case 'nav':
			return '115%';
	}
	return as === 'h1' || as === 'headline' ? '150%' : '140%';
};

export interface TextProps extends BoxProps {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b1' | 'b2' | 'b3' | 'btn1' | 'btn2' | 'c1' | 'c2' | 'nav';
	fontWeight?: 'semi-bold' | 'bold' | 'medium' | 'regular' | 'thin';
	children?: string | React.ReactNode;
	id?: string;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
}

const Text = ({ as = 'b1', color, children, ...restProps }: TextProps): JSX.Element => {
	const fs = fontSizes[as];
	const lh = restProps.lineHeight ?? lineHeights(as);
	const cs = restProps.letterSpacing ?? charSpacing[as];

	return (
		<Box
			className={restProps.className}
			margin={0}
			padding={0}
			color={color as string}
			fontSize={fs}
			letterSpacing={cs}
			lineHeight={lh}
			fontFamily={fontW[as]}
			fontStyle="normal"
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default Text;
