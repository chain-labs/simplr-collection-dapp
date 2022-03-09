import { useEffect } from 'react';
import Box from 'src/components/Box';
import useEthers, { requestAccount } from 'src/ethereum/useEthers';
import useListeners from 'src/ethereum/useListeners';
import useSigner from 'src/ethereum/useSigner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { networkSelector, setNetwork, setUser, userSelector } from 'src/redux/user';
import Container from './Container';
import Text from './Text';

import Wordmark from 'public/wordmark.svg';
import { networks } from 'src/redux/collection/types';
import If from './If';
import { CopySimple } from 'phosphor-react';
import theme from 'src/styleguide/theme';
import toast from 'react-hot-toast';

const Navbar = ({ banner }: { banner?: boolean }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);

	const network = useAppSelector(networkSelector);

	const [provider, setProvider] = useEthers();
	const [signer, setSigner] = useSigner(provider);
	useListeners(provider, setProvider, setSigner);

	useEffect(() => {
		const getChain = async () => {
			const network = await provider.getNetwork();
			const chainId = network.chainId;
			dispatch(setNetwork({ chain: chainId, name: networks[chainId].name, id: networks[chainId].id }));
		};
		if (provider) {
			getChain();
		}
	}, [provider, signer]);

	useEffect(() => {
		if (process.browser) {
			// @ts-expect-error ethereum in window is not defined
			window?.ethereum.on('chainChanged', (chainId) => {
				const chain = parseInt(chainId, 16);
				const network = {
					chain: chain,
					name: networks?.[chain]?.name,
					id: networks?.[chain]?.id,
				};
				if (chain !== network.chain) dispatch(setNetwork(network));
			});
		}
	}, []);

	const handleConnectWallet = () => {
		requestAccount();
	};

	useEffect(() => {
		if (signer) {
			try {
				signer
					.getAddress()
					.then((address) => {
						dispatch(setUser(address));
					})
					.catch((err) => {
						console.log({ err });
					});
			} catch (err) {
				console.log(err);
			}
		}
	}, [signer]);

	const getBg = (chain) => {
		if (chain === 1) return 'green-50';
		else if (chain === 137) return 'purple-50';
		else if (chain === 4 || chain === 80001) return 'yellow-40';
	};

	const getBannerBg = (chain) => {
		if (chain === 1 || chain === 137) return 'purple-10';
		else if (chain === 4 || chain === 80001) return 'yellow-20';
	};

	const getBannerText = (chain) => {
		if (chain === 1)
			return 'You are connected to the Mainnet. Any transactions you make on the Mainnet will cost real ETH. ';
		else if (chain === 137)
			return 'You are connected to the Mainnet. Any transactions you make on the Mainnet will cost real MATIC. ';
		else if (chain === 4 || chain === 80001)
			return 'You are connected to a test network. Any transactions made here won’t reflect in the Mainnet.';
	};

	const getBannerTextColor = (chain) => {
		if (chain === 1 || chain === 137) return 'simply-blue';
		else if (chain === 4 || chain === 80001) return 'yellow-90';
	};

	return (
		<Box position="fixed" top="0" left="0" width="100%" zIndex={14}>
			<Box bg="#F8F8F8">
				<Container>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Wordmark />
						<Box
							border="1px solid"
							borderColor="black-10"
							borderRadius="4px"
							my="ml"
							py="mm"
							px="ms"
							onClick={
								!user.exists
									? handleConnectWallet
									: () => {
											navigator.clipboard.writeText(user.address);
											toast.success('Copied to clipboard');
									  }
							}
							cursor="pointer"
							row
							center
						>
							<Box height="20px" width="20px" borderRadius="50%" bg={getBg(user.network.chain)} />
							<Text as="h5" mx="mxs">
								{network.name}
							</Text>
							<Box height="20px" width="0.1rem" bg="black-10" mr="mxs" />
							<Text as="h5" mx="mxs" color="simply-blue">
								{`${user.address.substring(0, 5)}...${user.address.substr(-4)}`}
							</Text>
							<CopySimple color={theme.colors['simply-blue']} size="20" />
						</Box>
					</Box>
				</Container>
			</Box>
			<If
				condition={banner}
				then={
					<Box bg={getBannerBg(user.network.chain)}>
						<Container>
							<Text as="b1" center py="ml" color={getBannerTextColor(user.network.chain)}>
								{getBannerText(user.network.chain)}
							</Text>
						</Container>
					</Box>
				}
			/>
		</Box>
	);
};

export default Navbar;
