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
		</Box>
	);
};

export default Step3Modal;
