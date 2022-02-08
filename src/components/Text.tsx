import React from 'react';
import Box, { BoxProps } from 'components/Box';

export const fontSizes = {
	headline: { mobS: '4.0rem', tabL: '5.6rem' },
	h1: { mobS: '3.2rem', tabL: '4rem' },
	h2: { mobS: '2.4rem', tabL: '3.2rem' },
	h3: { mobS: '1.8rem', tabL: '2.4rem' },
	h4: '1.8rem',
	h5: '1.6rem',
	h6: '1.4rem',
	b3: '1.8rem',
	b2: '1.6rem',
	b1: '1.4rem',
	c1: '1rem',
	c2: '1rem',
	c3: '1rem',
};

const fontWeights = {
	bold: 700,
	'semi-bold': 600,
	medium: 500,
	regular: 400,
	thin: 300,
};

const fontW = {
	headline: fontWeights.bold,
	h1: fontWeights.bold,
	h2: fontWeights.bold,
	h3: fontWeights.bold,
	h4: fontWeights.medium,
	h5: fontWeights.medium,
	h6: fontWeights.medium,
	b3: fontWeights.regular,
	b2: fontWeights.regular,
	b1: fontWeights.regular,
	c1: fontWeights.bold,
	c2: fontWeights.medium,
	c3: fontWeights.regular,
};

const charSpacing = {
	headline: '-0.5px',
	h1: '-0.4px',
	h2: { mobS: '-0.1px', tabL: '-0.4px' },
	h3: '-0.1px',
	h4: '0.1px',
	h5: '0px',
	h6: '0px',
	b3: '0.1px',
	b2: '-0.1px',
	b1: '-0.1px',
	c1: '0.4px',
	c2: '0.4px',
	c3: '0.4px',
};

const lineHeights = (as) => {
	switch (as) {
		case 'headline':
		case 'h1':
			return '150%';
		case 'h2':
		case 'h3':
		case 'h5':
		case 'h6':
			return '140%';
		case 'h4':
		case 'b3':
			return '27px';
		case 'b2':
			return '24px';
		case 'b1':
		case 'c1':
			return '21px';
		case 'c2':
		case 'c3':
			return '18px';
	}
	return as === 'h1' || as === 'headline' ? '150%' : '140%';
};

const fontFamily = (as) => {
	return as === 'b1' || as === 'b2' || as === 'b3' || as === 'c1' || as === 'c2' || as === 'c3'
		? '"OpenSauceOneRegular", sans-serif'
		: '"Switzer", sans-serif';
};

export interface TextProps extends BoxProps {
	as?: 'headline' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b1' | 'b2' | 'b3' | 'c1' | 'c2' | 'c3';
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
	const lh = restProps.lineHeight ?? lineHeights(as);
	const cs = restProps.letterSpacing ?? charSpacing[as];
	const ff = restProps.fontFamily ?? fontFamily(as);

	return (
		<Box
			className={restProps.className}
			margin={0}
			padding={0}
			color={color as string}
			fontSize={fs}
			fontWeight={fw}
			letterSpacing={cs}
			lineHeight={lh}
			fontFamily={ff}
			fontStyle="normal"
			{...restProps}
		>
			{children}
		</Box>
	);
};

export default Text;
