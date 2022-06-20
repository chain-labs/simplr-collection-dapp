export const SEAT_TOGGLE = process.env.NEXT_PUBLIC_SEAT_TOGGLE;
export const SEAT_DISABLE = process.env.NEXT_PUBLIC_SEAT_DISABLE;

export const toBoolean = (value: string): boolean => {
	if (value?.toLowerCase() === 'true') {
		return true;
	} else {
		return false;
	}
};

export const TEST_NETWORK = toBoolean(process.env.NEXT_PUBLIC_TEST_NETWORK);

export const testNetworks = [3, 4, 5, 42, 80001];
