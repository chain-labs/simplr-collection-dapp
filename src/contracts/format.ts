export interface format {
	type: number;
	baseCollection: {
		name: string;
		symbol: string;
		admin: string;
		maximumTokens: number;
		maxPurchase: 100;
		maxHolding: 100;
		price: 0.02;
		publicSaleStartTime: 1546300800;
		loadingURI: 'https://boogeyman.io/boogeyman.png';
	};
	presaleable: {
		presaleReservedTokens: 1000;
		presalePrice: 0.01;
		presaleStartTime: 1546300800;
		presaleMaxHolding: 100;
		presaleWhitelist: ['0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d', '0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d'];
	};
	paymentSplitter: {
		simplr: '0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d';
		simplrShares: 15;
		payees: ['0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d', '0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d'];
		shares: [45, 40];
	};
	revealable: {
		projectURIProvenance: 'https://boogeyman.io/boogeyman.png';
		revealAfterTimestamp: 1546300800;
	};
	royalties: {
		account: '0xd18Cd50a6bDa288d331e3956BAC496AAbCa4960d';
		value: 10;
	};
	reserveTokens: 1000;
	metadata: 'https://simplr.mypinata.cloud/lkjalkdjflakjdlfkjadf';
	isAffiliable: true;
}
