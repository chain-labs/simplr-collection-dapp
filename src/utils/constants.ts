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

export const FAQ_URL = 'https://stonly.com/guide/en/simplr-collection-faqs-56DsboQUsp/Steps/1700349';

export const DOCS_URL = 'https://docs.simplrcollection.com';

export const HOW_TO_CREATE_URL = 'https://www.youtube.com/watch?v=Nl7qMKwX_Iw';

export const HOW_TO_MANAGE_URL = 'https://www.youtube.com/watch?v=PxKvGDzApso';
