import { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import Affiliable from './SalesPage/Affiliable';
import Presale from './SalesPage/Presale';
import Revealable from './SalesPage/Revealable';

export const getUnit = (network) => {
	switch (network) {
		case 1:
		case 4:
			return 'ETH';
	}
	return 'MATIC';
};

const SalesPage = () => {
	const collection = useAppSelector(collectionSelector);
	const { type } = collection;
	const [maxTokens, setMaxTokens] = useState<number>();
	const [maxPurchase, setMaxPurchase] = useState<number>();
	const [maxHolding, setMaxHolding] = useState<number>();
	const [price, setPrice] = useState<number>();
	const [reserveTokens, setReserveTokens] = useState<number>();
	const [publicSaleLaunchTimestamp, setPublicSaleLaunchTimestamp] = useState<number>();

	return (
		<Box overflow="visible" mb="20rem">
			<LabelledTextInput
				type="number"
				min="1"
				label="Total NFTs in the collection"
				required
				placeholder="eg.10,000"
				value={maxTokens}
				setValue={setMaxTokens}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				min="1"
				label="Maximum NFTs allowed to buy per sale"
				helperText="Maximum number of NFTs a user can buy at once"
				required
				placeholder="eg. 2"
				value={maxPurchase}
				setValue={setMaxPurchase}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				min="1"
				label="Maximum NFTs allowed to buy per wallet"
				helperText="Maximum number of NFTs a user can hold in their wallet"
				required
				placeholder="eg. 5"
				value={maxHolding}
				setValue={setMaxHolding}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				step="0.01"
				min="0.01"
				unit={type ? getUnit(type) : 'ETH'}
				label="Price per NFT"
				required
				placeholder="eg. 0.08"
				value={price}
				setValue={setPrice}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				min="0"
				label="Reserved NFTs"
				helperText=" Reserved NFTs will not be included in the sale and can be transferred directly to any wallet address. Enter “0” if you do not wish to reserve any NFTs."
				required
				placeholder="eg.10,000"
				value={reserveTokens}
				setValue={setReserveTokens}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput label="Public Sale Launch" required>
				<DateTime value={publicSaleLaunchTimestamp} setValue={setPublicSaleLaunchTimestamp} />
			</LabelledTextInput>
			<Box mt="wm" />
			<Presale unit={type} />
			<Box mt="wm" />
			<Revealable />
			<Box mt="wm" />
			<Affiliable />
			<Box mt="wm" />
			<ButtonComp bg="primary" height="56px" width="100%">
				<Text as="h4" color="simply-white">
					Next
				</Text>
			</ButtonComp>
		</Box>
	);
};

export default SalesPage;
