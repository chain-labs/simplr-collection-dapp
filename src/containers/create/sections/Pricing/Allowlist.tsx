import { Cube, PencilSimple, Plus, Trash } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { showModal } from 'src/redux/modal';
import { MODALS_LIST } from 'src/redux/modal/types';
import { allowListSelector, removeWhitelist } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';

const Allowlist = () => {
	const dispatch = useAppDispatch();
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
				condition={!allowlist?.list.length}
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
							onClick={() => dispatch(showModal({ type: MODALS_LIST.ALLOWLIST_MODAL, props: {} }))}
						>
							<Plus size={20} />
							<Text as="b2" ml="mxxs">
								Add Allowlist
							</Text>
						</Box>
					</Box>
				}
				else={
					<Box row alignItems="center">
						<Box borderRadius="4px" height="3.6rem" px="mxl" bg="gray-20" center mr="mxs">
							<Text as="btn2" color="gray-50">
								{allowlist.name}
							</Text>
						</Box>
						<PencilSimple
							size={24}
							color={theme.colors['gray-50']}
							weight="fill"
							onClick={() => dispatch(showModal({ type: MODALS_LIST.ALLOWLIST_MODAL, props: {} }))}
							style={{ cursor: 'pointer' }}
						/>
						<Box mr="mxs" />
						<Trash
							size={24}
							color={theme.colors['gray-50']}
							weight="fill"
							onClick={() => dispatch(removeWhitelist())}
							style={{ cursor: 'pointer' }}
						/>
					</Box>
				}
			/>
			<Box></Box>
		</Box>
	);
};

export default Allowlist;
