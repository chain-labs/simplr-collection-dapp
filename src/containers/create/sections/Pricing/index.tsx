import { PlayCircle, Sparkle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { pricingSelector, togglePresale } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';
import InputDateTime from '../../InputDateTime';
import InputNumber from '../../InputNumber';
import Affiliate from './Affiliate';
import Allowlist from './Allowlist';
import PieChart from './PieChart';
import Presale from './Presale';
import Sale, { getMaxSaleTokens } from './Sale';

const PricingSection = () => {
	const pricing = useAppSelector(pricingSelector);

	return (
		<Box row mt="wm" mb="wl">
			<Box width="66.2rem">
				<Box width="63rem">
					<InputNumber
						label="Total Supply of NFTs"
						required
						helper="Maximum number of tokens that can be minted by this smart contract."
						blockchain
						placeholder="10000"
						value={pricing.totalSupply}
						min={1}
						width="100%"
						idx={1}
					/>
					<Box mt="ws" />
					<InputNumber
						label="NFTs to Reserve"
						required
						helper={`Number of tokens to be excluded from sale. Reserved tokens are managed by owner and minted on demand. Enter "0" if you do not wish to reserve any NFTs right now, You can reserve tokens from dashboard until any token is sold.`}
						blockchain
						placeholder="100"
						value={pricing.reserve_NFTs}
						max={pricing.totalSupply ?? 0}
						min={0}
						width="100%"
						idx={2}
					/>
				</Box>
				<Presale />
				<Box mt="ws" />
				<Sale />
				<Box mt="ws" />
				<Affiliate />
			</Box>
			<Box flex={1} ml="wxxs" position="relative">
				<Box
					width="48rem"
					borderRadius="8px"
					bg="sky-blue-10"
					center
					pt="mxxxl"
					pb="mxl"
					column
					position="sticky"
					top="17.8rem"
				>
					<PieChart />
					<Box mt="mxxxl" width="90%" center column>
						<Text as="h5" textAlign="center">
							Token Breakdown
						</Text>
						<Box mt="mxl" mb="mm" row alignItems="center" justifyContent="space-between" width="100%">
							<Token color="#5E3FBE" name="Public Sale" tokens={getMaxSaleTokens(pricing)} />
							<Token color="blue-20" name="Pre-sale" tokens={pricing.presale.maxTokens} />
						</Box>
						<Token color="simply-black" name="Reserve" tokens={pricing.reserve_NFTs} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default PricingSection;

const Token = ({ color, name, tokens }) => {
	const pricing = useAppSelector(pricingSelector);
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		const total = pricing.totalSupply;
		const salePercent = (getMaxSaleTokens(pricing) / total) * 100;
		const presalePercent = (pricing.presale.maxTokens / total) * 100;
		const reservePercent = 100 - salePercent - presalePercent;

		switch (name) {
			case 'Public Sale':
				setPercent(salePercent);
				break;
			case 'Pre-sale':
				setPercent(presalePercent);
				break;
			case 'Reserve':
				setPercent(reservePercent);
				break;
		}
	}, [tokens]);

	return (
		<Box row alignItems="center">
			<Box height="2.4rem" width="2.4rem" bg={color} />
			<Box row>
				<Text as="h6" ml="mxs">
					{name}:
				</Text>
				<Text as="b2" ml="mxxs" color="simply-blue">
					{tokens}({percent.toFixed(1).replace(/[.,]0$/, '')}%)
				</Text>
			</Box>
		</Box>
	);
};
