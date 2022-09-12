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
import Sale from './Sale';

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
			<Box border="1px solid red" flex={1} ml="wxxs">
				<Box width="48rem" borderRadius="8px" bg="sky-blue-10" center pt="mxxxl">
					<PieChart />
				</Box>
			</Box>
		</Box>
	);
};

export default PricingSection;
