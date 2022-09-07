import { CollectionTypeCardProps } from './CollectionTypeCard';

export const COLLECTION_TYPES: CollectionTypeCardProps[] = [
	{
		title: 'ERC-721',
		subtitle: 'The standard for NFT Smart Contracts',
		subtext: 'Points to note:',
		points: ['Each token is unique', 'Each token can be sold or transferred', 'Can be traded on secondary markets'],
	},
	{
		title: 'ERC-721A',
		subtitle: 'An improvement over ERC721.',
		subtext: 'Points to note: Everything from ERC721 +',
		points: [
			'More optimized; reduces unused space',
			'Costs less to mint tokens in bulk ',
			'Costs more to transfer tokens',
		],
	},
];
