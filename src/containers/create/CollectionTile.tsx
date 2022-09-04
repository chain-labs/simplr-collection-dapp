import axios from 'axios';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import ChainCircle from 'src/components/ChainCircle';
import Text from 'src/components/Text';
import { ICollection } from 'src/graphql/query/UserCollections';
import { COLLECTION } from 'src/mock-datastore/my-collection';
import { networks } from 'src/redux/collection.new/types';
import theme from 'src/styleguide/theme';
import { getChainIdFromNetwork, sanitizePinataUrl } from '../MyCollections/utils';

const getSaleState = (collection: ICollection) => {
	const now = Math.floor(Date.now() / 1000);
	const presale = parseInt(collection.presaleConfig.presaleStartTime);
	const sale = parseInt(collection.baseCollectionConfig.publicSaleStartTime);
	const { paused, maximumTokens } = collection;
	const supply = collection.baseCollectionConfig.tokensCount;
	if (now > presale || now > sale) {
		if (!paused) {
			if (supply >= maximumTokens) {
				return 'Sold out';
			}
			return 'Live';
		} else {
			return 'Paused';
		}
	} else {
		return 'Upcoming';
	}
};

const CollectionTile = ({ collection }: { collection: ICollection }) => {
	const [collectionData, setCollectionData] = React.useState<any>({ name: '', chainId: 1, status: null, image: '' });
	const { name, chainId, status, image } = collectionData;
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

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(sanitizePinataUrl(collection?.metadata));
			console.log({ res: res.data });
			const { data } = res;
			const { collectionDetails } = data;
			const collectionData = {
				name: collectionDetails.name,
				chainId: getChainIdFromNetwork(collectionDetails.networkType.id),
				image: collectionDetails.bannerImageUrl,
				status: getSaleState(collection),
			};
			setCollectionData(collectionData);
		};
		if (collection) {
			console.log({ collection });
			fetchData();
		}
	}, [collection]);

	if (!collectionData.image) {
		return null;
	}
	return (
		<Box
			border="1px solid"
			borderColor="blue-20"
			bg="sky-blue-10"
			borderRadius="8px"
			width="30rem"
			height="23.4rem"
			p="ms"
			column
			cursor="pointer"
			css={`
				transition: all 0.4s ease-in-out;
				&:hover {
					border: 2px solid ${theme.colors['blue-30']};
					background: ${theme.colors['sky-blue-20']};
					transform: scale(1.05);
					box-shadow: ${theme.colors['gray-20']} 0px 5px 15px 0px;
				}
			`}
		>
			<Box position="relative" row height="14rem" borderRadius="4px 4px 0 0" overflow="hidden">
				<Image src={image} layout="fill" objectFit="cover" />
			</Box>
			<Box mt="mm">
				<Text as="h6">{name}</Text>
			</Box>
			<Box mt="mxs" row between>
				<Box row alignItems="center">
					<ChainCircle chainId={chainId} />
					<Text as="c2" ml="mxxs">
						{networks[chainId]?.name}
					</Text>
				</Box>
				<Box
					borderRadius="84px"
					bg={getStatusBg(status)}
					color={status === 'Paused' ? 'simply-black' : 'simply-white'}
					px="mm"
					py="mxxs"
				>
					<Text as="c2">{status}</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default CollectionTile;
