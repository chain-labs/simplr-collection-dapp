import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';

const StatusModal = () => {
	const modalData = useAppSelector(editSelector);

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Do you want to{' '}
				{modalData.editable === 'Live' ? 'pause' : modalData.editfield === 'Reveal' ? 'Reveal' : 'unpause'} the sale?
			</Text>
			<hr />

			<Box mt="ml" />
			<Text as="c1" color="gray-00" display="flex">
				ESTIMATED GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					0.0001 ETH or 1 USD.
				</Text>
			</Text>
		</Box>
	);
};

export default StatusModal;
