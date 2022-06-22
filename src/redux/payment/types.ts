export interface PaymentState {
	useEarlyPass?: boolean;
	royalties?: {
		receiver?: string;
		royaltyFraction?: number;
	};
	paymentSplitter?: {
		payees?: string[];
		shares?: number[];
	};
	paymentDetails_validated?: boolean;
}
