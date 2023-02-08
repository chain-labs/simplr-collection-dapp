export interface SaleState {
	maximumTokens?: string;
	maxPurchase?: string;
	maxHolding?: string;
	price?: string;
	reserveTokens?: string;
	publicSaleStartTime?: DateType;
	presaleable?: {
		enabled?: boolean;
		presaleReservedTokens?: string;
		presalePrice?: string;
		presaleMaxHolding?: string;
		presaleWhitelist?: string[];
		presaleStartTime?: DateType;
	};
	revealable?: {
		enabled?: boolean;
		loadingImageUrl?: string;
	};
	isAffiliable?: boolean;
	salesDetails_validated?: boolean;
}

export interface DateType {
	date?: string;
	time?: string;
	timezone?: string;
}
