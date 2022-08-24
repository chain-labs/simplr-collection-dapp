import { GasPump } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import theme from 'src/styleguide/theme';
import { getCoinPrice, getGasPrice, getGasSource } from 'src/utils/gasPrices';
import { getNavProps } from 'src/utils/navbarUtils';
import { useNetwork } from 'wagmi';
import Box from '../Box';
import Text from '../Text';

const Banners = ({ setNetworkProps, networkProps }) => {
	const [gasPrice, setGasPrice] = useState('');
	const [coinPrice, setCoinPrice] = useState('');

	const { chain } = useNetwork();

	useEffect(() => {
		const fetch = () => {
			getGasPrice(chain?.id).then((price) => {
				setGasPrice(price);
			});
			getCoinPrice(chain?.id).then((price) => {
				setCoinPrice(price);
			});
		};

		if (chain?.id) {
			fetch();
			setNetworkProps(getNavProps(chain?.id));
			const timer = setInterval(() => {
				fetch();
			}, 10000);
			return () => {
				clearInterval(timer);
			};
		}
	}, [chain]);
	return (
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
					as="c1"
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
					<Text as="c1" ml="mxs" data-tip={`Source: ${getGasSource(chain?.id)}`} data-offset="{'left': 10, 'top': 2}">
						{`${gasPrice} Gwei`}
					</Text>
					<Box width="1px" bg="simply-black" height="1.2rem" mx="ms" />
					<Text as="c1" color="simply-blue" mr="mxxs">
						{`${networkProps?.currency}:`}
					</Text>
					<Text as="c1" mr="2px" data-tip="Source: coingecko.com" data-offset="{'left': 10, 'top': 2}">
						{`$${coinPrice}`}
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default Banners;
