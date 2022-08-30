import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setUser, userSelector } from 'src/redux/user';
import { useEnsName } from 'wagmi';
import Box from '../Box';
import If from '../If';

import PolygonSVG from 'src/../public/static/images/svgs/polygon.svg';
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit';
import theme from 'src/styleguide/theme';
import Text from '../Text';
import { CopySimple } from 'phosphor-react';
import ButtonComp from '../Button';

export const condenseAddress = (address) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ConnectWallet = ({ networkProps }) => {
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();

	return (
		<ConnectButton.Custom>
			{({ account, chain, openConnectModal }) => {
				const { data: ens } = useEnsName({
					address: user.address,
				});

				const { openChainModal } = useChainModal();

				useEffect(() => {
					console.log('chainged');
				}, [openChainModal]);

				useEffect(() => {
					if (account) {
						dispatch(setUser(account?.address));
					}
				}, [account]);
				const connected = user.exists;

				if (!connected) {
					return (
						<ButtonComp bg="primary" py="0.95rem" px="mxxxl" borderRadius="64px" onClick={openConnectModal}>
							<Text color="simply-white">Connect Wallet</Text>
						</ButtonComp>
					);
				}

				return (
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
							as="button"
							type="button"
							borderRadius="50%"
							bg={networkProps?.logoColor}
							height="3rem"
							width="3rem"
							mr="mxs"
							center
							data-tip={chain?.name}
							cursor="pointer"
							onClick={openChainModal}
							border="none"
						>
							<Box position="relative" height="2.4rem" width="2.4rem" center>
								<If
									condition={chain?.id === 1 || chain?.id === 4}
									then={<Image src="/static/images/svgs/eth.svg" layout="fill" />}
									else={
										<Box color={chain?.id === 137 ? 'simply-white' : 'simply-purple'} center>
											<PolygonSVG />
										</Box>
									}
								/>
							</Box>
						</Box>
						<Box
							as="button"
							border="none"
							borderRadius="64px"
							data-tip={user.address}
							data-offset="{'right': 150,'bottom': 37}"
							px="mm"
							py="1.05rem"
							bg="sky-blue-20"
							color="simply-blue"
							row
							center
							cursor="pointer"
							css={`
								&:active {
									background: ${theme.colors['sky-blue-30']};
								}
							`}
							// onClick={openAccountModal}
						>
							<Text as="c1" mr="mxs">
								{ens ?? condenseAddress(user.address)}
							</Text>
							<CopySimple size={20} weight="regular" />
						</Box>
					</Box>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default ConnectWallet;
