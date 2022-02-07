import { format } from 'date-fns';

export const formatDate = (date) => {
	try {
		const timestamp = parseInt(date) * 1000;
		return format(new Date(timestamp), 'dd/MM/yyyy, pppp');
	} catch (err) {
		return;
	}
};
