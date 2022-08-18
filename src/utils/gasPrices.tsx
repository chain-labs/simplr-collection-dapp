import axios from 'axios';

export const getGasPrice = async (chain: number) => {
	if (chain === 1 || chain === 4) {
		const price = await axios.get(
			`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=27SDJN5Q4N5VDWKF1XMPJRDH36B1HEJ7X3`
		);
		return price.data.result.ProposeGasPrice;
	} else if (chain === 137 || chain === 80001) {
		const price = await axios.get(
			`https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=MBM52QWMWRXWM77QN1EJWGY29K65INMJ12`
		);

		return price.data.result.ProposeGasPrice;
	}
};

export const getCoinPrice = async (chain: number) => {
	switch (chain) {
		case 1:
		case 4:
			return (await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')).data[
				'ethereum'
			]['usd'].toFixed(2);
		case 137:
		case 80001:
			return (
				await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')
			).data['matic-network']['usd'].toFixed(2);
	}
};

export const getGasSource = (chain: number) => {
	switch (chain) {
		case 1:
		case 4:
			return 'etherscan.io';
		case 137:
		case 80001:
			return 'polygonscan.com';
	}
};
