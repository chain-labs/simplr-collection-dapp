export interface SaleState {
	maximumTokens?: number;
	maxPurchase?: number;
	maxHolding?: number;
	price?: number;
	reserveTokens?: number;
	publicSaleStartTime?: DateType;
	presaleable?: {
		enabled?: boolean;
		presaleReservedTokens?: number;
		presalePrice?: number;
		presaleMaxHolding?: number;
		presaleWhitelist?: string[];
		presaleStartTime?: DateType;
	};
	revealable?: {
		enabled?: boolean;
		timestamp?: DateType;
		loadingImageUrl?: string;
	};
	isAffiliable?: boolean;
}

export interface DateType {
	date?: string;
	time?: string;
	timezone?: string;
}
