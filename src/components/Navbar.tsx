/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import useListeners from 'src/ethereum/useListeners';
import useSigner from 'src/ethereum/useSigner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setNetwork, userSelector, setProvider, setUser, removeUser, setSigner } from 'src/redux/user';
import Text from './Text';
import contracts from 'src/contracts/contracts.json';
import PolygonSVG from 'src/../public/static/images/svgs/polygon.svg';

import { networks } from 'src/redux/collection/types';
import If from './If';
import { ArrowUpRight, CaretDown, CopySimple, GasPump, List, WarningCircle } from 'phosphor-react';
import theme from 'src/styleguide/theme';
import toast from 'react-hot-toast';
import ButtonComp from './Button';
import { ProviderProps, SignerProps } from 'src/ethereum/types';
import { ethers } from 'ethers';
import { testNetworks, TEST_NETWORK } from 'src/utils/constants';
import Image from 'next/image';
import { getCoinPrice, getGasPrice } from 'src/utils/gasPrices';
import { getNavProps } from 'src/utils/navbarUtils';

const Navbar = ({ banner }: { banner?: boolean }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const [signer] = useSigner();
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const [ens, setEns] = useState('');
	const [gasPrice, setGasPrice] = useState('');
	const [coinPrice, setCoinPrice] = useState('');
	const [networkProps, setNetworkProps] = useState({
		logoColor: '',
		bannerColor: '',
		bannerTextColor: '',
		currency: '',
		bannerText: '',
	});

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
		if (user.address && user.provider && (user.network.chain === 1 || user.network.chain === 4)) {
			user.provider.lookupAddress(user.address).then((data) => {
				if (data) {
					setEns(data);
				} else {
					setEns('');
				}
			});
		}
	}, [user.address]);

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
		const fetch = () => {
			getGasPrice(user.network.chain).then((price) => {
				setGasPrice(price);
			});
			getCoinPrice(user.network.chain).then((price) => {
				setCoinPrice(price);
			});
		};

		if (user.network.chain) {
			fetch();
			setNetworkProps(getNavProps(user.network.chain));
			const timer = setInterval(() => {
				fetch();
			}, 10000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [user.network.chain]);

	useEffect(() => {
		if (process.browser) {
			// @ts-expect-error ethereum in window is not defined
			window?.ethereum?.on('chainChanged', (chainId) => {
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
				window.ethereum?.enable();
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

	return (
		<Box position="fixed" top="0" left="0" width="100%" zIndex={14} column>
			<Box bg="sky-blue-10" py={!user.exists ? 'ms' : '0'} order={{ mobS: 2, tabS: 1 }}>
				<Box width={{ mobS: '95%', tabS: '90vw', deskM: '136rem' }} mx="auto">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box row alignItems="center">
							<Box display={{ mobS: 'block', tabS: 'none' }} mr="mm" row alignItems="center" height="2.4rem">
								<List size={24} />
							</Box>
							<Box as="img" src="/static/images/svgs/logo.svg" />
						</Box>
						<Box row center>
							<Box row mr="wxs" display={{ mobS: 'none', tabS: 'flex' }}>
								<Text as="nav" color="gray-80" mr="0.2rem">
									FAQs
								</Text>
								<ArrowUpRight color={theme.colors['gray-80']} size={16} />
							</Box>
							<Box row mr="wxs" display={{ mobS: 'none', tabS: 'flex' }}>
								<Text as="nav" color="gray-80" mr="0.2rem">
									Docs
								</Text>
								<ArrowUpRight color={theme.colors['gray-80']} size={16} />
							</Box>
							<Box row mr="wxs" display={{ mobS: 'none', tabS: 'flex' }}>
								<Text as="nav" color="gray-80" mr="0.2rem">
									How to
								</Text>
								<CaretDown color={theme.colors['gray-80']} size={16} />
							</Box>
							<If
								condition={user.exists}
								then={
									<Box
										border="1px solid"
										borderColor="blue-10"
										borderRadius="64px"
										my={{ mobS: 'ms', tabS: 'mxs' }}
										pl="mxs"
										pr="mxxs"
										py="mxxs"
										row
										center
									>
										<Box borderRadius="50%" bg={networkProps?.logoColor} height="3rem" width="3rem" mr="mxs" center>
											<Box position="relative" height="2.4rem" width="2.4rem" center>
												<If
													condition={user.network.chain === 1 || user.network.chain === 4}
													then={<Image src="/static/images/svgs/eth.svg" layout="fill" />}
													else={
														<Box color={user.network.chain === 137 ? 'simply-white' : 'simply-purple'} center>
															<PolygonSVG />
														</Box>
													}
												/>
											</Box>
										</Box>
										<Box
											borderRadius="64px"
											px="mm"
											py="1.05rem"
											bg="sky-blue-20"
											color="simply-blue"
											row
											center
											cursor="pointer"
											onClick={
												!user.exists
													? handleConnectWallet
													: () => {
															navigator.clipboard.writeText(user.address);
															toast.success('Copied to clipboard');
													  }
											}
										>
											<Text as="c1" mr="mxs">
												{ens ? ens : `${user.address.substring(0, 5)}...${user.address.substr(-4)}`}
											</Text>
											<CopySimple size={20} weight="regular" />
										</Box>
									</Box>
								}
								else={
									<>
										<ButtonComp
											bg="primary"
											py="0.95rem"
											px="mxxxl"
											borderRadius="64px"
											onClick={() => {
												handleConnectWallet();
											}}
										>
											<Text fontFamily="Switzer" color="simply-white">
												Connect Wallet
											</Text>
										</ButtonComp>
										<Box
											position="absolute"
											zIndex={-1}
											top="0"
											left="0"
											height="100vh"
											width="100vw"
											bg="simply-white"
										>
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
																<Text as="c2" color="red-50" ml="mxs">
																	We currently only support Ethereum and Polygon. Please switch your network to either
																	of those and try again.
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
					</Box>
				</Box>
			</Box>
			<If
				condition={banner && !!user.network.chain}
				then={
					<Box
						py="mxxs"
						position="relative"
						alignItems="center"
						bg="sky-blue-10"
						borderTop="1px solid"
						borderTopColor="blue-10"
						borderBottom="1px solid"
						borderBottomColor="blue-10"
						order={{ mobS: 1, tabS: 2 }}
					>
						<Box
							row
							justifyContent={{ mobS: 'center', tabS: 'flex-end' }}
							width={{ mobS: '95vw', tabS: '90vw', deskM: '136rem' }}
							mx="auto"
						>
							<Text
								as="c2"
								bg={networkProps?.bannerColor}
								color={networkProps?.bannerTextColor}
								position="absolute"
								top={{ mobS: '100%', tabS: '100%', deskM: '0' }}
								transform={{ mobS: 'translateY(76px)', tabS: '' }}
								left="0"
								center
								width="100%"
								height="100%"
								zIndex={0}
							>
								{networkProps?.bannerText}
							</Text>
							<Box center opacity={gasPrice && coinPrice ? '1' : '0'} zIndex={2}>
								<GasPump color={theme.colors['simply-blue']} size={16} weight="fill" />
								<Text as="c1" ml="mxs">
									{`${gasPrice} Gwei`}
								</Text>
								<Box width="1px" bg="simply-black" height="1.2rem" mx="ms" />
								<Text as="c1" color="simply-blue" mr="mxxs">
									{`${networkProps?.currency}:`}
								</Text>
								<Text as="c1" mr="2px">
									{`$${coinPrice}`}
								</Text>
							</Box>
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default Navbar;
