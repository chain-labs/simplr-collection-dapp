export const getNavProps = (chain) => {
	switch (chain) {
		case 1:
			return {
				logoColor: 'gray-20',
				bannerColor: 'sky-blue-20',
				bannerTextColor: 'simply-blue',
				currency: 'ETH',
				bannerText: 'You are connected to the Mainnet. Any transactions you make on the Mainnet will cost real ETH.',
			};
		case 4:
			return {
				logoColor: 'yellow-30',
				bannerColor: 'yellow-20',
				bannerTextColor: 'simply-black',
				currency: 'ETH',
				bannerText: 'You are connected to a test network. Any transactions made here won’t reflect in the Mainnet.',
			};
		case 137:
			return {
				logoColor: 'simply-purple',
				bannerColor: 'sky-blue-20',
				bannerTextColor: 'simply-blue',
				currency: 'MATIC',
				bannerText: 'You are connected to the Mainnet. Any transactions you make on the Mainnet will cost real MATIC.',
			};
		case 80001:
			return {
				logoColor: 'yellow-30',
				bannerColor: 'yellow-20',
				bannerTextColor: 'simply-black',
				currency: 'MATIC',
				bannerText: 'You are connected to a test network. Any transactions made here won’t reflect in the Mainnet.',
			};
	}
};
