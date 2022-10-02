export interface CollectionState {
	contract?: 1 | 2;
	type?: 1 | 4 | 137 | 80001;
	name?: string;
	symbol?: string;
	project_uri?: string;
	website_url?: string;
	logo_url?: File;
	banner_url?: File;
	contact_email?: string;
	admin?: string;
	collection_validated?: boolean;
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
	5: {
		name: 'Goerli Testnet',
		id: 'goerli',
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
	5: {
		name: 'Goerli Testnet',
		id: 'goerli',
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
