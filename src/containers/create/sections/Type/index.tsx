import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import Checkbox from 'src/components/Checkbox';
import Dropdown from 'src/components/Dropdown';
import Text from 'src/components/Text';
import { collectionSelector, setCollectionNetwork, setCollectionType } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { FAQ_URL } from 'src/utils/constants';
import CollectionTypeCard from './CollectionTypeCard';
import { COLLECTION_TYPES } from './contents';

const TypeSection = ({ setDisableButton }) => {
	const collection = useAppSelector(collectionSelector);
	const [network, setNetwork] = React.useState(collection.network);
	const [check, setCheck] = React.useState(false);
	const [type, setType] = React.useState(collection.contract);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCollectionType(type));
	}, [type]);

	useEffect(() => {
		dispatch(setCollectionNetwork(network));
	}, [network]);

	useEffect(() => {
		setDisableButton(!check || !type);
	}, [check, type]);
	return (
		<Box mt="wxs" center column>
			<Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="mxxxl" mb="wxs">
				{COLLECTION_TYPES.map((collection, idx) => (
					<CollectionTypeCard {...collection} type={type} setType={setType} idx={idx + 1} />
				))}
			</Box>
			<Box row alignItems="center">
				<Text as="b1" mr="wxxs">
					Select Network:
				</Text>
				<Dropdown
					data={['Ethereum', 'Polygon']}
					subdata={['The OG', 'Ethereum, but faster']}
					setValue={setNetwork}
					value={network}
				/>
			</Box>
			<Box mt="wl" row alignItems="center" mb="mxl">
				<Checkbox value={check} setValue={setCheck} mr="mm" />
				<Text as="b3">
					I have read and agree to the{' '}
					<Box as="span" color="simply-blue">
						{/* change the link to the T&C page */}
						<a href={FAQ_URL} target="_blank" rel="noreferrer">
							Terms and Conditions
						</a>
					</Box>
					.{' '}
				</Text>
			</Box>
		</Box>
	);
};

export default TypeSection;
