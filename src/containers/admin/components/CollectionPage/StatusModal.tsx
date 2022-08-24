import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';
import { getUnitByChainId } from 'src/utils/chains';
import { useNetwork } from 'wagmi';

const StatusModal = ({ gas, fails }) => {
	const modalData = useAppSelector(editSelector);
	const { chain } = useNetwork();

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Do you want to{' '}
				{modalData.editable === 'Live' ? 'pause' : modalData.editfield === 'Reveal' ? 'Reveal' : 'unpause'} the sale?
			</Text>
			<hr />

			<Box mt="ml" />
			<If
				condition={fails}
				then={
					<Text as="c1" color="red-50">
						This transaction is Likely to fail due to constant change in gas prices. proceed at your own risk.
					</Text>
				}
				else={
					<Text as="c1" color="gray-00" display="flex">
						ESTIMATED GAS COST :{' '}
						<Text as="c1" color="simply-blue">
							{gas ? `${gas} ${getUnitByChainId(chain?.id)}` : 'Fetching...'}
						</Text>
					</Text>
				}
			/>
		</Box>
	);
};

export default StatusModal;
