import { useLazyQuery, useQuery } from '@apollo/client';
import { CaretDown } from 'phosphor-react';
import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { GET_USER_COLLECTIONS } from 'src/graphql/query/UserCollections';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import CollectionGrid from './CollectionGrid';
import TutorialBanner from './TutorialBanner';

const MyCollectionsPage = () => {
	const user = useAppSelector(userSelector);
	const { data } = useQuery(GET_USER_COLLECTIONS, {
		variables: {
			id: user.address.toLowerCase(),
		},
		fetchPolicy: 'network-only',
	});

	useEffect(() => {
		console.log({ data });
	}, [data]);

	return (
		<Box bg="gray-10" pt="15rem" pb="wm">
			<Box width="126rem" mx="auto">
				<Text as="h3">My Collections</Text>
				<Box mt="wxxs" width="94.8rem">
					<Box row alignItems="center" mb="mxl">
						<Text as="b2" mr="mxs">
							Last Created
						</Text>
						<CaretDown size={16} />
					</Box>
					<TutorialBanner />
					<CollectionGrid />
				</Box>
			</Box>
		</Box>
	);
};

export default MyCollectionsPage;
