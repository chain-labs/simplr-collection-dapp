import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { SUBGRAPH_ENDPOINT } from 'src/utils/constants';

export const client = new ApolloClient({
	uri: SUBGRAPH_ENDPOINT,
	cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
