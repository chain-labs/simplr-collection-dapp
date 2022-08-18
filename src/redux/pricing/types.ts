export interface PricingState {
	totalSupply?: number;
	reserve_NFTs?: number;
	presale?: {
		enabled?: boolean;
		maxTokens?: number;
		price?: number;
		startTime?: DateType;
		allowList?: {
			name?: string;
			list?: string[];
		};
	};
	sale?: {
		price?: number;
		startTime?: DateType;
	};
	isAffiliable?: boolean;
}

export interface DateType {
	date?: string;
	time?: string;
	timezone?: string;
}
