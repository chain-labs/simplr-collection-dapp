import React, { useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { saleSelector } from 'src/redux/sales';
import { DateType } from 'src/redux/sales/types';

const SalesSummaryPage = ({ modalStep, setModalStep }) => {
	const collection = useAppSelector(collectionSelector);
	const sales = useAppSelector(saleSelector);
	const { type } = collection;
	const [maxTokens, setMaxTokens] = useState<number>(sales.maximumTokens);
	const [maxPurchase, setMaxPurchase] = useState<number>(sales.maxPurchase);
	const [maxHolding, setMaxHolding] = useState<number>(sales.maxHolding);
	const [price, setPrice] = useState<number>(sales.price);
	const [reserveTokens, setReserveTokens] = useState<number>(sales.reserveTokens);
	const [publicSaleLaunchTimestamp, setPublicSaleLaunchTimestamp] = useState<DateType>(sales.publicSaleStartTime);
	return (
		<Box overflow="visible" mb="20rem" width="100%">
			<LabelledTextInput
				type="number"
				min="1"
				label="Total NFTs in the collection"
				required
				placeholder="eg.10,000"
				value={maxTokens}
				setValue={setMaxTokens}
				disabled
				disableValidation
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				min="1"
				max={maxTokens?.toString()}
				label="Maximum NFTs allowed to buy per sale"
				helperText="Maximum number of NFTs a user can buy at once"
				required
				placeholder="eg. 2"
				value={maxPurchase}
				setValue={setMaxPurchase}
				disabled
				disableValidation
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				min="1"
				max={maxTokens?.toString()}
				label="Maximum NFTs allowed to buy per wallet"
				helperText="Maximum number of NFTs a user can hold in their wallet"
				required
				placeholder="eg. 5"
				value={maxHolding}
				setValue={setMaxHolding}
				disabled
				disableValidation
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				step="0.01"
				min="0.01"
				// unit={type ? getUnit(type) : 'ETH'}
				label="Price per NFT"
				required
				placeholder="eg. 0.08"
				disabled
				disableValidation
				value={price}
				setValue={setPrice}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="number"
				min="0"
				max={maxTokens?.toString()}
				label="Reserved NFTs"
				helperText=" Reserved NFTs will not be included in the sale and can be transferred directly to any wallet address. Enter “0” if you do not wish to reserve any NFTs."
				required
				placeholder="eg.10,000"
				value={reserveTokens}
				setValue={setReserveTokens}
				disabled
				disableValidation
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput label="Public Sale Launch" required type="date">
				<DateTime
					value={publicSaleLaunchTimestamp}
					setValue={setPublicSaleLaunchTimestamp}
					disabled
					disableValidation
				/>
			</LabelledTextInput>
			<ButtonComp bg="tertiary" height="56px" width="100%" mt="wm" type="submit" onClick={() => setModalStep(2)}>
				<Text as="h4" color="simply-blue">
					Next
				</Text>
			</ButtonComp>
		</Box>
	);
};

export default SalesSummaryPage;
