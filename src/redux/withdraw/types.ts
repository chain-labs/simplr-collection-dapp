export interface WithdrawState {
	useEarlyPass?: boolean;
	paymentSplitter?: IPayee[];
	royalties?: IRoyalty[];
}

export interface IPayee {
	payee?: string;
	share?: number;
}

export interface IRoyalty {
	receiver?: string;
	royaltyFraction?: number;
}
