import React, { useEffect } from 'react';
import Text from 'src/components/Text';
import { gql, useQuery } from '@apollo/client';

const MyCollectionPage = () => {
	const query = gql`
		query Launches {
			launches {
				mission_name
				mission_id
				rocket {
					rocket_name
					rocket {
						company
						name
						mass {
							kg
						}
					}
				}
				launch_site {
					site_name
				}
				launch_date_local
			}
		}
	`;

	const { loading, error, data } = useQuery(query);

	useEffect(() => {
		if (!loading) {
			console.log({ data });
		}
	}, [loading]);

	return (
		<Text as="h1" mt="wxxl" ml="mxl">
			My Collection Page
		</Text>
	);
};

export default MyCollectionPage;
