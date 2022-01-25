export interface SaleState {
	maximumTokens?: number;
	maxPurchase?: number;
	maxHolding?: number;
	price?: number;
	reserveTokens?: number;
	publicSaleStartTime?: number;
	presaleable?: {
		enabled?: boolean;
		presaleReservedTokens?: number;
		presalePrice?: number;
		presaleMaxHolding?: number;
		presaleWhitelist?: string[];
		presaleStartTime?: number;
	};
	revealable?: {
		enabled?: boolean;
		timestamp?: number;
		loadingImageUrl?: string;
	};
	isAffiliable?: boolean;
}
