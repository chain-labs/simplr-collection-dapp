export const toBoolean = (value: string): boolean => {
	if (value?.toLowerCase() === 'true') {
		return true;
	} else {
		return false;
	}
};
export const SEAT_TOGGLE = toBoolean(process.env.NEXT_PUBLIC_SEAT_TOGGLE);
export const SEAT_DISABLE = toBoolean(process.env.NEXT_PUBLIC_SEAT_DISABLE);

export const TEST_NETWORK = toBoolean(process.env.NEXT_PUBLIC_TEST_NETWORK);

export const testNetworks = [3, 4, 5, 42, 80001];

export const UNLIMITED = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const MAX_HOLD_LIMIT = '65535';
