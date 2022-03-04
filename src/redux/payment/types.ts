export interface PaymentState {
	useEarlyPass?: boolean;
	royalties?: {
		account?: string;
		value?: number;
	};
	paymentSplitter?: {
		payees?: string[];
		shares?: number[];
	};
	paymentDetails_validated?: boolean;
}
