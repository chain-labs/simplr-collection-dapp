import Image from 'next/image';
import { PlusCircle } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import ChainCircle from 'src/components/ChainCircle';
import Text from 'src/components/Text';
import { COLLECTION } from 'src/mock-datastore/my-collection';
import { networks } from 'src/redux/collection.new/types';
import theme from 'src/styleguide/theme';
import CollectionTile from '../create/CollectionTile';

const CollectionGrid = () => {
	const getStatusBg = (status) => {
		switch (status) {
			case 'Live':
				return 'blue-40';
			case 'Paused':
				return 'yellow-30';
			case 'Sold Out':
				return 'green-50';
		}
	};
	return (
		<Box
			css={`
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-gap: ${theme.space.mxl};
			`}
		>
			<Box
				border="1px solid"
				borderColor="blue-20"
				bg="sky-blue-10"
				borderRadius="8px"
				width="30rem"
				height="23.4rem"
				column
				center
				css={`
					transition: all 0.4s ease-in-out;
					&:hover {
						border: 2px solid ${theme.colors['blue-30']};
						background: ${theme.colors['sky-blue-20']};
						transform: scale(1.05);
					}
				`}
				cursor="pointer"
			>
				<PlusCircle size="48px" color={theme.colors['blue-30']} />
				<Text as="h6" mt="mxs">
					Create new collection
				</Text>
			</Box>
			{COLLECTION.map((collection, idx) => (
				<CollectionTile {...collection} key={`key-${idx}-${collection.name}`} />
			))}
		</Box>
	);
};

export default CollectionGrid;
