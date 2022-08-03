import { CaretRight } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

interface Props {
	step: number;
	addData: (number) => void;
}

const Breadcrumb = ({ step, addData }: Props) => {
	return (
		<Box center mt="mxxxl" mb="ws">
			<Text as="h5" color={step === 0 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(0)}>
				Collection Details
			</Text>
			<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
			<Text as="h5" color={step === 1 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(1)}>
				Sales
			</Text>
			<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
			<Text as="h5" color={step === 2 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(2)}>
				Payment Details
			</Text>
		</Box>
	);
};

export default Breadcrumb;
