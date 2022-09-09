import { Cube, Plus } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { allowListSelector } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';

const Allowlist = () => {
	const allowlist = useAppSelector(allowListSelector);
	return (
		<Box>
			<Box row alignItems="center" mb="mxs">
				<Text as="h6" mr="ms">
					Allowlist
				</Text>
				<Cube color={theme.colors['blue-30']} size={16} />
			</Box>
			<Text as="b3" color="gray-40" mb="ml">
				If you add allowlist, only addresses in the allowlist will be able to mint during the pre-sale.
			</Text>
			<If
				condition={!allowlist?.list}
				then={
					<Box row justifyContent="flex-start">
						<Box
							as="button"
							border="1px solid"
							borderColor="sky-blue-30"
							borderRadius="4px"
							px="mxl"
							py="mxs"
							row
							alignItems="center"
							bg="gray-10"
							cursor="pointer"
							css={`
								&:hover {
									border-color: ${theme.colors['blue-40']};
								}
								&:active {
									background-color: ${theme.colors['gray-20']};
								}
							`}
						>
							<Plus size={20} />
							<Text as="b2" ml="mxxs">
								Add Allowlist
							</Text>
						</Box>
					</Box>
				}
				else={<Box></Box>}
			/>
			<Box></Box>
		</Box>
	);
};

export default Allowlist;
