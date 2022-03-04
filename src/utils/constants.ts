export const SEAT_TOGGLE = process.env.NEXT_PUBLIC_SEAT_TOGGLE;

export const toBoolean = (value: string): boolean => {
	if (value?.toLowerCase() === 'true') {
		return true;
	} else {
		return false;
	}
};
