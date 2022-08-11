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
import ReactTooltip from 'react-tooltip';

import { networks } from 'src/redux/collection/types';
import If from './If';
import { ArrowLeft, ArrowUpRight, CaretDown, CopySimple, GasPump, List, WarningCircle } from 'phosphor-react';
import theme from 'src/styleguide/theme';
import toast from 'react-hot-toast';
import ButtonComp from './Button';
import { ProviderProps, SignerProps } from 'src/ethereum/types';
import { ethers } from 'ethers';
import {
	DOCS_URL,
	FAQ_URL,
	HOW_TO_CREATE_URL,
	HOW_TO_MANAGE_URL,
	testNetworks,
	TEST_NETWORK,
} from 'src/utils/constants';
import Image from 'next/image';
import { getCoinPrice, getGasPrice, getGasSource } from 'src/utils/gasPrices';
import { getNavProps } from 'src/utils/navbarUtils';
import { motion, useAnimationControls } from 'framer-motion';
import useOuterClick from 'components/useOuterClick';

const Navbar = ({ banner }: { banner?: boolean }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const [signer] = useSigner();
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const [ens, setEns] = useState('');
	const [gasPrice, setGasPrice] = useState('');
	const [coinPrice, setCoinPrice] = useState('');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [networkProps, setNetworkProps] = useState({
		logoColor: '',
		bannerColor: '',
		bannerTextColor: '',
		currency: '',
		bannerText: '',
	});
	const [howToMenu, setHowToMenu] = useState(false);

	const animateCaret = useAnimationControls();
	const animateMenu = useAnimationControls();

	const ref = useOuterClick(() => {
		setHowToMenu(false);
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
		if (drawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [drawerOpen]);

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

	useEffect(() => {
		if (howToMenu) {
			animateCaret.start('open');
			animateMenu.start('open');
		} else {
			animateCaret.start('closed');
			animateMenu.start('closed');
		}
	}, [howToMenu]);

	return (
		<Box position="fixed" top="0" left="0" width="100%" zIndex={14} column>
			<Box
				css={`
					.tooltip {
						opacity: 1 !important;
						box-shadow: 0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08);
						border-radius: 4px;
					}
				`}
			>
				<ReactTooltip
					className="tooltip"
					arrowColor="transparent"
					backgroundColor={theme.colors['blue-10']}
					textColor={theme.colors['simply-black']}
					effect="solid"
				/>
			</Box>
			<Box bg="sky-blue-10" py={!user.exists ? 'ms' : '0'} order={{ mobS: 2, tabS: 1 }}>
				<Box width={{ mobS: '95%', tabS: '90vw', deskM: '136rem' }} mx="auto">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box row alignItems="center">
							<Box
								display={{ mobS: 'block', tabS: 'none' }}
								mr="mm"
								row
								alignItems="center"
								height="2.4rem"
								onClick={() => setDrawerOpen(true)}
							>
								<List size={24} />
							</Box>
							<Drawer {...{ drawerOpen, setDrawerOpen }} />
							<Box as="img" src="/static/images/svgs/logo.svg" />
						</Box>
						<Box row center>
							<Box row mr="wxs" display={{ mobS: 'none', tabS: 'flex' }} as="a" href={FAQ_URL} target="_blank">
								<Text as="nav" color="gray-80" mr="0.2rem">
									FAQs
								</Text>
								<ArrowUpRight color={theme.colors['gray-80']} size={16} />
							</Box>
							<Box row mr="wxs" display={{ mobS: 'none', tabS: 'flex' }} as="a" href={DOCS_URL} target="_blank">
								<Text as="nav" color="gray-80" mr="0.2rem">
									Docs
								</Text>
								<ArrowUpRight color={theme.colors['gray-80']} size={16} />
							</Box>
							<Box
								row
								mr="wxs"
								display={{ mobS: 'none', tabS: 'flex' }}
								onClick={() => {
									setHowToMenu(!howToMenu);
								}}
								alignItems="center"
								position="relative"
								ref={ref}
								cursor="pointer"
							>
								<Text as="nav" color="gray-80" mr="0.2rem">
									How to
								</Text>
								<motion.div
									initial="closed"
									variants={{
										closed: {
											rotate: '0deg',
											transformOrigin: '50% 50%',
											transition: { duration: 0.3, ease: 'easeInOut' },
										},
										open: {
											rotate: '180deg',
											transition: { duration: 0.3, ease: 'easeInOut' },
										},
									}}
									animate={animateCaret}
									style={{ height: '16px' }}
								>
									<CaretDown color={theme.colors['gray-80']} size={16} />
								</motion.div>
								<motion.div
									initial="closed"
									variants={{
										closed: {
											display: 'none',
											transition: { duration: 0.4, ease: 'easeInOut' },
										},
										open: {
											display: 'block',
											transition: { duration: 0.4, ease: 'easeInOut' },
										},
									}}
									animate={animateMenu}
								>
									<Box
										position="absolute"
										zIndex={6}
										bg="gray-10"
										borderRadius="8px"
										px="mxs"
										py="ms"
										width="16rem"
										boxShadow="0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)"
										column
										top="150%"
										left="-10%"
									>
										<Box mb="mm" as="a" href={HOW_TO_CREATE_URL} target="_blank">
											<Text as="nav" color="gray-40" display="inline-block">
												Launch Collection
											</Text>
										</Box>
										<Box as="a" href={HOW_TO_MANAGE_URL} target="_blank">
											<Text as="nav" color="gray-40" display="inline-block">
												Manage Collection
											</Text>
										</Box>
										<Box mt="mm" bg="simply-black" height="1px" mb="ms" />
										<Text as="c2">
											Still need help?{' '}
											<span>
												<Box as="a" color="simply-blue" cursor="pointer">
													Contact Us
												</Box>
											</span>
										</Text>
									</Box>
								</motion.div>
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
										<Box
											borderRadius="50%"
											bg={networkProps?.logoColor}
											height="3rem"
											width="3rem"
											mr="mxs"
											center
											data-tip={user.network.name}
										>
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
											data-tip={user.address}
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
								transform={{ mobS: 'translateY(76px)', tabS: 'translateY(0px)' }}
								left="0"
								center
								width="100%"
								height="100%"
								zIndex={0}
								py={{ mobS: '20px', tabS: 'mxs' }}
								px="ms"
								textAlign="center"
							>
								{networkProps?.bannerText}
							</Text>
							<Box center opacity={gasPrice && coinPrice ? '1' : '0'} zIndex={2}>
								<GasPump color={theme.colors['simply-blue']} size={16} weight="fill" />
								<Text as="c1" ml="mxs" data-tip={`Source: ${getGasSource(user.network.chain)}`}>
									{`${gasPrice} Gwei`}
								</Text>
								<Box width="1px" bg="simply-black" height="1.2rem" mx="ms" />
								<Text as="c1" color="simply-blue" mr="mxxs">
									{`${networkProps?.currency}:`}
								</Text>
								<Text as="c1" mr="2px" data-tip="Source: coingecko.com">
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

const Drawer = ({ drawerOpen, setDrawerOpen }) => {
	const [expandable, setExpandable] = useState(false);

	const controls = useAnimationControls();
	const drawerControls = useAnimationControls();

	useEffect(() => {
		if (drawerOpen) {
			drawerControls.start('open');
		} else {
			drawerControls.start('closed');
		}

		return () => {
			drawerControls.stop();
		};
	}, [drawerOpen]);

	useEffect(() => {
		if (expandable) {
			controls.start('open');
		} else {
			controls.start('closed');
		}
		return () => {
			controls.stop();
		};
	}, [expandable]);

	return (
		<Box
			bg="transparent"
			height="100vh"
			width="100vw"
			position="absolute"
			top="0"
			left="0"
			zIndex={4}
			display={drawerOpen ? 'block' : 'none'}
			onClick={() => {
				setDrawerOpen(false);
			}}
		>
			<motion.div
				initial="closed"
				variants={{
					closed: { x: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
					open: { x: '0', transition: { duration: 0.5, ease: 'easeInOut' } },
				}}
				animate={drawerControls}
				style={{ height: '100%' }}
			>
				<Box
					bg="simply-blue"
					color="simply-white"
					pl="mxxxl"
					pt="mxxl"
					height="100%"
					width="75%"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<Box row mb="wl" onClick={() => setDrawerOpen(false)} alignItems="center">
						<ArrowLeft color={theme.colors['gray-80']} size={16} />
						<Text as="b1" color="gray-80" ml="0.2rem">
							Back
						</Text>
					</Box>
					<Box row mb="wxs" as="a" href={FAQ_URL} target="_blank">
						<Text as="nav" color="gray-80" mr="0.2rem">
							FAQs
						</Text>
						<ArrowUpRight color={theme.colors['gray-80']} size={24} />
					</Box>
					<Box row mb="wxs" as="a" href={DOCS_URL} target="_blank">
						<Text as="nav" color="gray-80" mr="0.2rem">
							Docs
						</Text>
						<ArrowUpRight color={theme.colors['gray-80']} size={24} />
					</Box>
					<Box
						row
						mb="mm"
						onClick={() => {
							setExpandable(!expandable);
						}}
						alignItems="center"
					>
						<Text as="nav" color="gray-80" mr="0.2rem">
							How to
						</Text>

						<motion.div
							initial="closed"
							variants={{
								closed: {
									rotate: '0deg',
									transformOrigin: '50% 50%',
									transition: { duration: 0.3, ease: 'easeInOut' },
								},
								open: {
									rotate: '180deg',
									transition: { duration: 0.3, ease: 'easeInOut' },
								},
							}}
							animate={controls}
							style={{ height: '24px' }}
						>
							<CaretDown color={theme.colors['gray-80']} size={24} />
						</motion.div>
					</Box>
					<motion.div
						initial="closed"
						variants={{
							closed: {
								clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
								transition: { duration: 0.4, ease: 'easeInOut' },
							},
							open: {
								clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
								transition: { duration: 0.4, ease: 'easeInOut' },
							},
						}}
						animate={controls}
					>
						<Box borderLeft="1px solid white" className="expandable">
							<Box as="a" href={HOW_TO_CREATE_URL} target="_blank">
								<Text as="b1" color="gray-80" ml="mxl" mb="mm">
									Create Collection
								</Text>
							</Box>
							<Box as="a" href={HOW_TO_MANAGE_URL} target="_blank">
								<Text as="b1" color="gray-80" ml="mxl">
									Manage Collection
								</Text>
							</Box>
						</Box>
					</motion.div>
				</Box>
			</motion.div>
		</Box>
	);
};
