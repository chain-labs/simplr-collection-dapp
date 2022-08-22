import React from 'react';
import { connectorsForWallets, getDefaultWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';

const Wagmi = ({ children }) => {
	const user = useAppSelector(userSelector);
	const { chains, provider, webSocketProvider } = configureChains(
		[chain.mainnet, chain.rinkeby, chain.polygonMumbai, chain.polygon],
		[alchemyProvider({ apiKey: 'lqM0WXfur0rGOi8x0lU1amSOH7FR_DQx' }), publicProvider()]
	);

	const { wallets: defaultWallets } = getDefaultWallets({ appName: 'Simplr Collection', chains });
	const connectors = connectorsForWallets([defaultWallets[0]]);

	const wagmiClient = createClient({
		autoConnect: user.exists ? true : false,
		connectors,
		provider,
		webSocketProvider,
	});

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={lightTheme({
					accentColor: theme.colors['simply-blue'],
					borderRadius: 'large',
					fontStack: 'system',
				})}
			>
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export default Wagmi;
