import Image from 'next/image';
import React from 'react';
import Box from 'src/components/Box';
import ChainCircle from 'src/components/ChainCircle';
import Text from 'src/components/Text';
import { networks } from 'src/redux/collection/types';
import theme from 'src/styleguide/theme';

const CollectionTile = ({ name, image, status, chainId }) => {
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
				transition: all 0.2s ease-in-out;
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
