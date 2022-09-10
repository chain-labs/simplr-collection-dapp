import { Sparkle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { pricingSelector, togglePresale } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';
import InputDateTime from '../../InputDateTime';
import InputNumber from '../../InputNumber';
import Allowlist from './Allowlist';

const Presale = () => {
	const pricing = useAppSelector(pricingSelector);
	const [togglePresales, setTogglePresales] = useState(pricing.presale.enabled);

	const { presale } = pricing;
	const { maxTokens, price } = presale;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(togglePresale(togglePresales));
	}, [togglePresales]);

	const getPresaleEarnings = () => {
		return (maxTokens * price).toFixed(2);
	};

	return (
		<Box bg="sky-blue-10" borderRadius="8px">
			<Box mt="wxs" bg="sky-blue-20" borderRadius="8px" px="ms" py="mxs" row between>
				<Box>
					<Text as="h5">Pre-sale</Text>
					<Text as="b3" color="gray-50" width="48.8rem" mt="mxs">
						Conduct a pre-sale or early-bird sale.
					</Text>
				</Box>
				<Toggle mobile value={togglePresales} setValue={setTogglePresales} />
			</Box>
			<If
				condition={togglePresales}
				then={
					<Box bg="transparent" width="100%">
						<Box width="100%" px="ms" mt="mxl" pb="mm">
							<InputNumber
								idx={3}
								label="Maximum Tokens (Pre-sale)"
								helper="Set the maximum supply for your presale. This number must be less or equal to your total supply.If all the tokens are not sold, remaining tokens will be rolled over to public sale."
								value={pricing.presale.maxTokens}
								min={1}
								max={pricing.totalSupply - pricing.reserve_NFTs ?? 0}
								required
								blockchain
								width="100%"
								placeholder="1000"
							/>
							<Box mt="mxxxl" />
							<InputNumber
								idx={4}
								label="Price (Pre-sale)"
								helper="Price per NFT during the presale. Input “0” if you want them to be free of charge"
								value={pricing.presale.price}
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
								idx={5}
								label="Per-Wallet Maximum"
								helper="Maximum number of tokens a wallet can hold during the pre-sale."
								value={pricing.presale.perWallet}
								min={1}
								max={pricing.presale.maxTokens ?? pricing.totalSupply}
								required
								blockchain
								width="100%"
								placeholder="e.g. 1"
							/>
							<Box mt="mxxxl" />
							<InputNumber
								idx={5}
								label="Per-Transaction Maximum"
								helper="Maximum number of tokens allowed to buy per transaction during the pre-sale."
								value={pricing.presale.perSale}
								min={1}
								max={pricing.presale.perWallet ?? pricing.presale.maxTokens ?? pricing.totalSupply}
								required
								blockchain
								width="100%"
								placeholder="e.g. 1"
							/>
							<Box mt="mxxxl" />
							<InputDateTime
								label="Pre-Sale Start Time"
								required
								blockchain
								helper="Pre-sale will start automatically at specified time, no user interaction needed given the smart-contract is not paused."
								width="100%"
								value={pricing.presale.startTime}
							/>
							<Box mt="mxxxl" />
							<Allowlist />
						</Box>
						<If
							condition={!!pricing.presale.maxTokens && !!pricing.presale.price}
							then={
								<Box bg="green-20" width="100%" py="mxs" center borderRadius="0 0 4px 4px">
									<Sparkle color={theme.colors['green-60']} size={24} />
									<Text as="h6" color="green-60" ml="ms">
										{`You will make a total of ${getPresaleEarnings()} ETH in the pre-sale!`}
									</Text>
								</Box>
							}
						/>
					</Box>
				}
			/>
		</Box>
	);
};

export default Presale;
