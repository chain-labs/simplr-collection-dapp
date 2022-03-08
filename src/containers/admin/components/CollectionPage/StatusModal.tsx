import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';

const StatusModal = ({ gas }) => {
	const modalData = useAppSelector(editSelector);
	const currentNetwork = useAppSelector(networkSelector);

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
					{gas ? `${gas} ${getUnitByChainId(currentNetwork.chain)}` : 'Fetching...'}
				</Text>
			</Text>
		</Box>
	);
};

export default StatusModal;
