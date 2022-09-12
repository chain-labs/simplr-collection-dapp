/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import useListeners from 'src/ethereum/useListeners';
import useSigner from 'src/ethereum/useSigner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { networkSelector, setNetwork, userSelector, setProvider, setUser, removeUser, setSigner } from 'src/redux/user';
import Container from './Container';
import Text from './Text';
import contracts from 'src/contracts/contracts.json';

import { networks } from 'src/redux/collection/types';
import If from './If';
import { CopySimple, WarningCircle } from 'phosphor-react';
import theme from 'src/styleguide/theme';
import toast from 'react-hot-toast';
import ButtonComp from './Button';
import { ProviderProps, SignerProps } from 'src/ethereum/types';
import { ethers } from 'ethers';
import { testNetworks, TEST_NETWORK } from 'src/utils/constants';

const Navbar = ({ banner }: { banner?: boolean }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const [signer] = useSigner();
	const [wrongNetwork, setWrongNetwork] = useState(false);

	const network = useAppSelector(networkSelector);

	const setAppProviders = (provider: ProviderProps) => {
		dispatch(setProvider({ provider }));
	};
	const setAppSigners = (signer: SignerProps) => {
		dispatch(setSigner({ signer }));
	};
	useListeners(user.provider, setAppProviders, setAppSigners);

	useEffect(() => {
		if (signer) {
			setAppSigners(signer);
		}
	}, [signer]);

	useEffect(() => {
		const getChain = async () => {
			const network = await user.provider.getNetwork();
			const chainId = network.chainId;
			const contractArtefact = contracts?.[chainId];
			if (contractArtefact?.[Object?.keys(contractArtefact)?.[0]]?.contracts?.['CollectionFactoryV2']) {
				if (TEST_NETWORK) {
					if (testNetworks.includes(chainId)) {
						setWrongNetwork(false);
						dispatch(setNetwork({ chain: chainId, name: networks?.[chainId]?.name, id: networks?.[chainId]?.id }));
					} else {
						setWrongNetwork(true);
						dispatch(removeUser());
					}
				} else {
					setWrongNetwork(false);
					dispatch(setNetwork({ chain: chainId, name: networks?.[chainId]?.name, id: networks?.[chainId]?.id }));
				}
			} else {
				setWrongNetwork(true);
				dispatch(removeUser());
			}
		};
		if (user.provider) {
			getChain();
		}
	}, [user.provider, user.signer]);

	useEffect(() => {
		if (process.browser) {
			// @ts-expect-error ethereum in window is not defined
			window?.ethereum.on('chainChanged', (chainId) => {
				const chain = parseInt(chainId, 16);
				const contractArtefact = contracts?.[chain];

				if (contractArtefact?.[Object?.keys(contractArtefact)?.[0]]?.contracts?.['CollectionFactoryV2']) {
					if (TEST_NETWORK) {
						if (testNetworks.includes(chain)) {
							setWrongNetwork(false);
							dispatch(setNetwork({ chain: chainId, name: networks?.[chainId]?.name, id: networks?.[chainId]?.id }));
						} else {
							setWrongNetwork(true);
							dispatch(removeUser());
						}
					} else {
						setWrongNetwork(false);
						dispatch(setNetwork({ chain: chainId, name: networks?.[chainId]?.name, id: networks?.[chainId]?.id }));
					}
				} else {
					setWrongNetwork(true);
					dispatch(removeUser());
				}
			});
		}
	}, []);

	const handleConnectWallet = () => {
		if (process.browser) {
			const getProvider = async () => {
				// @ts-expect-error ethereum in window is not defined
				const provider = await new ethers.providers.Web3Provider(window.ethereum, 'any');
				// @ts-expect-error ethereum in window is not defined
				window.ethereum.enable();
				dispatch(setProvider({ provider }));
			};
			getProvider();
		}
	};

	useEffect(() => {
		if (user.signer) {
			try {
				user.signer
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
	}, [user.signer]);

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
			<Box bg="#F8F8F8" py={!user.exists ? 'ml' : '0'}>
				<Container>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box as="img" src="/static/images/png/logo.png" />
						<If
							condition={user.exists}
							then={
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
							}
							else={
								<>
									<ButtonComp
										bg="primary"
										height="56px"
										py="mm"
										px="ml"
										onClick={() => {
											handleConnectWallet();
										}}
									>
										<Text as="h4">Connect Wallet</Text>
									</ButtonComp>
									<Box position="absolute" zIndex={-1} top="0" left="0" height="100vh" width="100vw" bg="simply-white">
										<Box mx="auto" width="80%" row between height="100%">
											<Box maxWidth="40rem">
												<Text as="h2" color="simply-blue" mb="ms">
													Create and manage cost effective NFT Collections.
												</Text>
												<Text as="b2" mb="mxl">
													Simplr is an easy to use, no-code platform to create NFT smart contracts and launch your NFT
													projects without any hassle.
												</Text>
												<If
													condition={wrongNetwork}
													then={
														<Box row mt="mm">
															<WarningCircle weight="fill" color={theme.colors['red-50']} size="24" />
															<Text as="c3" color="red-50" ml="mxs">
																We currently only support Ethereum and Polygon {TEST_NETWORK ? 'Testnets' : null}.
																Please switch your network to either of those and try again.
															</Text>
														</Box>
													}
												/>
											</Box>
											<Box as="img" src="/static/images/png/hero_image.png"></Box>
										</Box>
									</Box>
								</>
							}
						/>
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
