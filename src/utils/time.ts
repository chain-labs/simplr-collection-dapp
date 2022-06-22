import { format } from 'date-fns';

export const formatDate = (date) => {
	try {
		const timestamp = parseInt(date) * 1000;
		if (timestamp > Date.now()) {
			return format(new Date(timestamp), 'dd/MM/yyyy, pppp');
		}
		return '';
	} catch (err) {
		return;
	}
};
