import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';

const Step2Modal = ({ gas }: { gas?: string }) => {
	const currentNetwork = useAppSelector(networkSelector);

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Confirm Change
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Every change in the smart contract costs gas. Do you want to commit these changes?
			</Text>

			<Box mt="ml" />
			<Text as="c1" color="gray-00" display="flex">
				GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					{gas ? `${gas} ${getUnitByChainId(currentNetwork.chain)}` : 'Fetching...'}
				</Text>
			</Text>
		</Box>
	);
};

export default Step2Modal;
