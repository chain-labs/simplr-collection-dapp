import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';

const Step3Modal = ({ gas }: { gas?: string }) => {
	const currentNetwork = useAppSelector(networkSelector);

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Change Underway
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Your changes are making their way through your connected wallet address on METAMASK{' '}
			</Text>

			<Text as="c1" color="gray-00" display="flex" mt="mm">
				GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					{gas ? `${gas} ${getUnitByChainId(currentNetwork.chain)}` : 'Fetching...'}
				</Text>
			</Text>
		</Box>
	);
};

export default Step3Modal;
