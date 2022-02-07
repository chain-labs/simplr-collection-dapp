import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';

const Step3Modal = ({ value, setValue }) => {
	const modalData = useAppSelector(editSelector);

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Change Underway
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Your changes are making their way through your connected wallet address on METAMASK{' '}
			</Text>

			<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex" mt="mm">
				GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					0.0001 ETH or 1 USD.
				</Text>
			</Text>
		</Box>
	);
};

export default Step3Modal;
