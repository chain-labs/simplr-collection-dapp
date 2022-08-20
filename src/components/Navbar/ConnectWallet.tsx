import Image from 'next/image';
import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { useEnsName } from 'wagmi';
import Box from '../Box';
import If from '../If';

import PolygonSVG from 'src/../public/static/images/svgs/polygon.svg';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import theme from 'src/styleguide/theme';
import toast from 'react-hot-toast';
import Text from '../Text';
import { CopySimple } from 'phosphor-react';
import ButtonComp from '../Button';

const ConnectWallet = ({ networkProps }) => {
	const user = useAppSelector(userSelector);

	return (
		<ConnectButton.Custom>
			{({ account, chain, openConnectModal, mounted }) => {
				const { data: ens } = useEnsName({
					address: account?.address,
				});
				const ready = mounted;
				const connected = ready && account && chain;

				if (!connected) {
					return (
						<ButtonComp bg="primary" py="0.95rem" px="mxxxl" borderRadius="64px" onClick={openConnectModal}>
							<Text fontFamily="Switzer" color="simply-white">
								Connect Wallet
							</Text>
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
							borderRadius="50%"
							bg={networkProps?.logoColor}
							height="3rem"
							width="3rem"
							mr="mxs"
							center
							data-tip={chain?.name}
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
							onClick={() => {
								navigator.clipboard.writeText(user.address);
								toast.success('Copied to clipboard');
							}}
						>
							<Text as="c1" mr="mxs">
								{ens ?? account?.displayName}
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
