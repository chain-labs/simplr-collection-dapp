import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { SUBGRAPH_ENDPOINT } from 'src/utils/constants';

const ApolloClientProvider = ({ children }) => {
	const client = new ApolloClient({
		uri: SUBGRAPH_ENDPOINT,
		cache: new InMemoryCache(),
	});

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
