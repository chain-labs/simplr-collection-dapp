import { gql } from '@apollo/client';

export const GET_USER_COLLECTIONS = gql`
	query GetUserCollections($id: ID!) {
		user(id: $id) {
			beneficiaries {
				collection {
					address
					metadata
					presaleConfig {
						presaleStartTime
					}
					paused
					baseCollectionConfig {
						publicSaleStartTime
						tokensCount
					}
					maximumTokens
				}
			}
			creator {
				address
				metadata
				presaleConfig {
					presaleStartTime
				}
				paused
				baseCollectionConfig {
					publicSaleStartTime
					tokensCount
				}
				maximumTokens
			}
			owner {
				address
				metadata
				presaleConfig {
					presaleStartTime
				}
				paused
				baseCollectionConfig {
					publicSaleStartTime
					tokensCount
				}
				maximumTokens
			}
		}
	}
`;

export interface ICollection {
	address: string;
	metadata: string;
	presaleConfig: {
		presaleStartTime: string;
	};
	paused: boolean;
	baseCollectionConfig: {
		publicSaleStartTime: string;
		tokensCount: string;
	};
	maximumTokens: string;
}
