import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

export interface CollectionTypeCardProps {
	title: string;
	subtitle: string;
	subtext: string;
	points: string[];
	type?: number;
	setType?: (type: any) => void;
	idx?: number;
}

export const CollectionTypeCard = ({
	title,
	subtitle,
	subtext,
	points,
	type,
	setType,
	idx,
}: CollectionTypeCardProps) => {
	const [selected, setSelected] = useState(idx === type);

	useEffect(() => {
		setSelected(idx === type);
	}, [type]);

	return (
		<Box
			border={selected ? '2px solid' : '1px solid'}
			borderColor={selected ? 'blue-40' : 'blue-20'}
			bg={selected ? 'sky-blue-20' : 'sky-blue-10'}
			borderRadius="8px"
			p="mxl"
			width="36rem"
			onClick={() => setType(title === 'ERC-721' ? 1 : 2)}
			css={`
				transition: all 0.2s ease-in-out;
				&:hover {
					transform: scale(1.02);
					box-shadow: ${theme.colors['gray-20']} 0px 5px 15px 0px;
				}
			`}
			cursor="pointer"
		>
			<Text as="h4" color="simply-blue" mb="mxxs">
				{title}
			</Text>
			<Text as="b3">{subtitle}</Text>
			<Text as="b3" mt="mm" mb="mxxs">
				{subtext}
			</Text>
			<Box as="ul">
				{points.map((point) => (
					<Box as="li" ml="mm">
						<Text as="b3" mb="2px">
							{point}
						</Text>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default CollectionTypeCard;
