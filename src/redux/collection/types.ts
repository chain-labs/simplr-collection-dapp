export interface CollectionState {
	type?: 1 | 4 | 137 | 80001;
	name?: string;
	symbol?: string;
	project_uri?: string;
	website_url?: string;
	logo_url?: string;
	banner_url?: string;
	contact_email?: string;
	admin?: string;
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