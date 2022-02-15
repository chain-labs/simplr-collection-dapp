export const checkImageUrl = async (url: string) => {
	try {
		const res = await fetch(url);
		const buff = await res.blob();
		return buff.type.startsWith('image/');
	} catch (err) {
		return false;
	}
};
