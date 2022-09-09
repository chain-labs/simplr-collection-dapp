import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { affiliableToggleSelector, toggleAffiliable } from 'src/redux/pricing';

const Affiliate = () => {
	const isAffiliable = useAppSelector(affiliableToggleSelector);
	const [toggle, setToggle] = useState<boolean>(isAffiliable);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleAffiliable(toggle));
	}, [toggle]);

	return (
		<Box mt="wxs" bg="sky-blue-20" borderRadius="8px" px="ms" py="mxs" row between>
			<Box>
				<Text as="h5">Affiliate Marketing</Text>
				<Text as="b3" color="gray-50" width="48.8rem" mt="mxs">
					Turns on affiliate marketing for your collection
				</Text>
			</Box>
			<Toggle mobile value={toggle} setValue={setToggle} />
		</Box>
	);
};

export default Affiliate;
