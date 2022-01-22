import { useState } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { CaretRight } from 'phosphor-react';
import theme from 'src/styleguide/theme';

const CreateComp = () => {
	const [step, setStep] = useState(0);
	return (
		<Box pt="mxxxl" mx="auto" width="64rem" minHeight="100vh" overflowX="visible">
			<Text as="h2" center>
				Create new collection
			</Text>
			<Box center mt="mxxxl" mb="ws">
				<Text as="h5" color={step === 0 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => setStep(0)}>
					Collection Details
				</Text>
				<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
				<Text as="h5" color={step === 1 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => setStep(1)}>
					Sales
				</Text>
				<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
				<Text as="h5" color={step === 2 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => setStep(2)}>
					Payment Details
				</Text>
			</Box>
		</Box>
	);
};

export default CreateComp;
