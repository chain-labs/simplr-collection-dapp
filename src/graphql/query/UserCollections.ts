import { gql } from '@apollo/client';

export const GET_USER_COLLECTIONS = gql`
	query GetUserCollections($id: ID!) {
		user(id: $id) {
			beneficiaries {
				collection {
					address
					metadata
				}
			}
		}
	}
`;
