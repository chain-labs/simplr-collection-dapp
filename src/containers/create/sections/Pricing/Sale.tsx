import { Sparkle } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { pricingSelector } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';
import InputDateTime from '../../InputDateTime';
import InputNumber from '../../InputNumber';

const Sale = () => {
	const pricing = useAppSelector(pricingSelector);

	const getMaxSaleTokens = () => {
		const { totalSupply, reserve_NFTs, presale } = pricing;
		let max = totalSupply - reserve_NFTs;
		if (presale.enabled && presale.maxTokens) {
			max -= presale.maxTokens;
		}
		return max;
	};

	const getSaleEarnings = () => {
		const { price } = pricing.sale;
		const max = getMaxSaleTokens();
		return (max * price).toFixed(2);
	};

	return (
		<Box bg="sky-blue-10" borderRadius="8px" overflow="hidden">
			<Box bg="sky-blue-20" borderRadius="8px" px="ms" py="mxs" row between>
				<Box>
					<Text as="h5">Public Sale</Text>
					<Text as="b3" color="gray-50" width="48.8rem" mt="mxs" opacity={0}>
						Conduct a pre-sale or early-bird sale.
					</Text>
				</Box>
			</Box>
			<Box bg="transparent" width="100%">
				<Box width="100%" px="ms" mt="mxl" pb="mm">
					<InputNumber
						idx={10}
						value={getMaxSaleTokens()}
						label="Maximum Supply (Public Sale)"
						helper="Total Supply - Reserve Tokens - Presale"
						required
						blockchain
						disabled
						width="100%"
					/>
					<Box mt="mxxxl" />
					<InputNumber
						idx={7}
						label="Price (Public-sale)"
						helper="Price per NFT during the public sale. Input “0” if you want them to be free of charge"
						value={pricing.sale.price}
						min={0}
						step={0.001}
						required
						blockchain
						width="100%"
						type="price"
						placeholder="e.g. 0.08"
					/>
					<Box mt="mxxxl" />
					<InputNumber
						idx={8}
						label="Per-Wallet Maximum"
						helper="Maximum number of tokens a wallet can hold during the public-sale."
						value={pricing.sale.perWallet}
						min={1}
						max={getMaxSaleTokens()}
						required
						blockchain
						width="100%"
						placeholder="e.g. 1"
					/>
					<Box mt="mxxxl" />
					<InputNumber
						idx={9}
						label="Per-Transaction Maximum"
						helper="Maximum number of tokens allowed to buy per transaction during the public-sale."
						value={pricing.sale.perSale}
						required
						blockchain
						width="100%"
						placeholder="e.g. 1"
					/>
					<Box mt="mxxxl" />
					<InputDateTime
						label="Public-Sale Start Time"
						required
						blockchain
						helper="Public-sale will start automatically at specified time, no user interaction needed given the smart-contract is not paused."
						width="100%"
						value={pricing.sale.startTime}
					/>
					<Box mt="mxxxl" />
				</Box>
				<If
					condition={true}
					then={
						<Box bg="green-20" width="100%" py="mxs" center>
							<Sparkle color={theme.colors['green-60']} size={24} />
							<Text as="h6" color="green-60" ml="ms">
								{`You will make a total of ${getSaleEarnings()} ETH in the public-sale!`}
							</Text>
						</Box>
					}
				/>
			</Box>
		</Box>
	);
};

export default Sale;
