export interface PricingState {
	totalSupply?: number;
	reserve_NFTs?: number;
	presale?: IPresale;
	sale?: ISale;
	isAffiliable?: boolean;
}

export interface DateType {
	date?: string;
	time?: string;
	timezone?: string;
}

export interface IPresale {
	enabled?: boolean;
	maxTokens?: number;
	price?: number;
	perWallet?: number;
	perSale?: number;
	startTime?: DateType;
	allowList?: {
		name?: string;
		list?: string[];
	};
}

export interface ISale {
	price?: number;
	startTime?: DateType;
	perWallet?: number;
	perSale?: number;
}
