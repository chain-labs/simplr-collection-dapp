import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import { useAppSelector } from 'src/redux/hooks';
import { pricingSelector } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';

const PieChart = () => {
	const pricing = useAppSelector(pricingSelector);
	const presalePercentDegrees = () => {
		if (pricing.presale.enabled && pricing.presale.maxTokens && pricing.totalSupply) {
			return (pricing.presale.maxTokens / pricing.totalSupply) * 360;
		} else return 0;
	};

	const reservePercentDegrees = () => {
		if (pricing.reserve_NFTs && pricing.totalSupply) {
			return (pricing.reserve_NFTs / pricing.totalSupply) * 360;
		} else return 0;
	};

	useEffect(() => {
		const res = presalePercentDegrees();
		console.log({ res });
	}, [pricing.presale.maxTokens]);

	useEffect(() => {
		const res = reservePercentDegrees();
		console.log({ res });
	}, [pricing.reserve_NFTs]);

	return (
		<Box height="31.6rem" width="31.6rem" borderRadius="50%" bg="#5E3FBE" position="relative">
			<Box
				position="absolute"
				height="100%"
				width="100%"
				borderRadius="50%"
				backgroundImage={`conic-gradient(#5E3FBE 0deg, #5E3FBE 45deg, ${theme.colors['blue-20']} 45deg, ${
					theme.colors['blue-20']
				} ${presalePercentDegrees() + 45}deg, ${theme.colors['simply-black']} ${presalePercentDegrees() + 45}deg, ${
					theme.colors['simply-black']
				} ${presalePercentDegrees() + 45 + reservePercentDegrees()}deg)`}
			/>
			<Box />
		</Box>
	);
};

export default PieChart;
