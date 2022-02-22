export const blockExplorer = (chain) => {
	switch (chain) {
		case 1:
			return 'https://etherscan.io';
		case 4:
			return 'https://rinkeby.etherscan.io';
		case 137:
			return 'https://polygonscan.com';
		case 80001:
			return 'https://mumbai.polygonscan.com';
	}
};

export const explorer = (chain) => {
	switch (chain) {
		case 1:
			return 'Etherscan';
		case 4:
			return 'Etherscan';
		case 137:
			return 'Polygonscan';
		case 80001:
			return 'Polygonscan';
	}
};
