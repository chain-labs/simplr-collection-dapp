import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const Step3Modal = () => {
	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Change Underway
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Your changes are making their way through your connected wallet address on METAMASK{' '}
			</Text>
		</Box>
	);
};

export default Step3Modal;
