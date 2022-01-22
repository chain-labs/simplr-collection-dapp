export interface PaymentState {
	royalties?: {
		account?: string;
		value?: number;
	};
	paymentSplitter?: {
		payees?: string[];
		shares?: number[];
	};
}
