export interface CollectionState {
	contract?: 1 | 2;
	network?: 'Ethereum' | 'Polygon';
	name?: string;
	symbol?: string;
	collection_metadata?: string;
	website_url?: string;
	logo?: File;
	banner?: File;
	admin?: string;
	delay_reveal?: {
		enabled?: boolean;
		metadata_uri?: string;
	};
}

export const networks = {
	1: {
		name: 'Ethereum Mainnet',
		id: 'mainnet',
	},
	4: {
		name: 'Rinkeby Testnet',
		id: 'rinkeby',
	},
	137: {
		name: 'Polygon Mainnet',
		id: 'matic',
	},
	80001: {
		name: 'Polygon Testnet',
		id: 'mumbai',
	},
};

export const test_networks = {
	4: {
		name: 'Rinkeby Testnet',
		id: 'rinkeby',
	},
	80001: {
		name: 'Polygon Testnet',
		id: 'mumbai',
	},
};

export const getNetworkList = (test) => {
	if (test) {
		return test_networks;
	} else return networks;
};

export const rpc_urls = {
	137: 'https://polygon-rpc.com',
	80001: 'https://rpc-mumbai.matic.today',
};

export const contractType = {
	ERC721: 1,
	ERC721A: 2,
};
