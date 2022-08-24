import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { getUnitByChainId } from 'src/utils/chains';
import { useNetwork } from 'wagmi';

const Step2Modal = ({ gas, fails }: { gas?: string; fails?: boolean }) => {
	const { chain } = useNetwork();

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				Confirm Change
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Every change in the smart contract costs gas. Do you want to commit these changes?
			</Text>

			<Box mt="ml" />
			<If
				condition={fails}
				then={
					<Text as="c1" color="red-50" textTransform="uppercase">
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

export default Step2Modal;
