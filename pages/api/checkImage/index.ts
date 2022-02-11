import axios from 'axios';

export default async function handler({ req, res }) {
	console.log(req);
	try {
		const data = await axios.get(req);
		res.status(200).json({ status: 200 });
	} catch (err) {
		res.status(404);
	}
}
