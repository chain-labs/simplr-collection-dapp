import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

const Step2Modal = ({ gas }: { gas?: string }) => {
	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Confirm Change
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Every change in the smart contract costs gas. Do you want to commit these changes?
			</Text>

			<Box mt="ml" />
			<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex">
				GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					{gas ? `${gas} ETH` : 'Fetching...'}
				</Text>
			</Text>
		</Box>
	);
};

export default Step2Modal;
