import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import { collectionSelector } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
	affiliableToggleSelector,
	presaleableToggleSelector,
	presaleWhitelistSelector,
	revealableToggleSelector,
	saleSelector,
	setSaleDetails,
} from 'src/redux/sales';
import Affiliable from './Affiliable';
import Presale from './Presale';
import Revealable from './Revealable';

export const getUnit = (network) => {
	switch (network) {
		case 1:
		case 4:
			return 'ETH';
	}
	return 'MATIC';
};

const SalesPage = ({ setStep }) => {
	const collection = useAppSelector(collectionSelector);
	const sales = useAppSelector(saleSelector);
	const presaleable = useAppSelector(presaleableToggleSelector);
	const revealable = useAppSelector(revealableToggleSelector);
	const affiliable = useAppSelector(affiliableToggleSelector);
	const whitelist = useAppSelector(presaleWhitelistSelector);

	const dispatch = useAppDispatch();

	const [isAffiliable, setIsAffiliable] = useState(affiliable);
	const { type } = collection;
	const [maxTokens, setMaxTokens] = useState<number>(sales.maximumTokens);
	const [maxPurchase, setMaxPurchase] = useState<number>(sales.maxPurchase);
	const [maxHolding, setMaxHolding] = useState<number>(sales.maxHolding);
	const [price, setPrice] = useState<number>(sales.price);
	const [reserveTokens, setReserveTokens] = useState<number>(sales.reserveTokens);
	const [publicSaleLaunchTimestamp, setPublicSaleLaunchTimestamp] = useState<number>(sales.publicSaleStartTime);
	const [isPresaleable, setIsPresaleable] = useState(presaleable);

	const [presaleReservedTokens, setPresaleReservedTokens] = useState<number>(sales.presaleable.presaleReservedTokens);
	const [presalePrice, setPresalePrice] = useState<number>(sales.presaleable.presalePrice);
	const [presaleMaxHolding, setPresaleMaxHolding] = useState<number>(sales.presaleable.presaleMaxHolding);
	const [presaleStartTime, setPresaleStartTime] = useState<number>(sales.presaleable.presaleStartTime);

	const [isRevealable, setIsRevealable] = useState(revealable);
	const [loadingUrl, setLoadingUrl] = useState<string>(sales.revealable.loadingImageUrl);
	const [revealableTime, setRevealableTime] = useState<number>(sales.revealable.timestamp);

	const addSalesDetails = (e) => {
		e.preventDefault();
		const date = Date.now() / 1000;

		if (+publicSaleLaunchTimestamp < date) {
			toast.error('Invalid time');
		} else {
			if (isPresaleable) {
				if (+presaleReservedTokens > +maxTokens || +presaleReservedTokens > +reserveTokens) {
					toast.error('Presale reserved tokens cannot be greater than total supply or reserve token supply');
				} else if (+presaleMaxHolding > +presaleReservedTokens) {
					toast.error('User cannot buy more than total reserved tokens');
				} else if (publicSaleLaunchTimestamp < presaleStartTime) {
					toast.error('Presale start time should be earlier than public sale');
				}
			}
		}
		if (isRevealable) {
			if (revealableTime > publicSaleLaunchTimestamp) {
				toast.error('Invalid Time');
			} else {
				console.log('good');
				} else {
					const data = {
						maximumTokens: maxTokens,
						maxPurchase,
						maxHolding,
						price,
						reserveTokens,
						publicSaleStartTime: publicSaleLaunchTimestamp,
						presaleable: {
							enabled: isPresaleable,
							presaleReservedTokens,
							presalePrice,
							presaleMaxHolding,
							presaleWhitelist: whitelist,
							presaleStartTime,
						},
						revealable: {
							enabled: isRevealable,
							timestamp: revealableTime,
							loadingImageUrl: loadingUrl,
						},
						isAffiliable,
					};

					dispatch(setSaleDetails(data));
					toast.success('Saved');
					setStep(2);
				}
			}
		} else {
			console.log('Everything is valid');
		}
	};

	return (
		<form onSubmit={addSalesDetails}>
			<Box overflow="visible" mb="20rem">
				<Box overflow="visible">
					<Toaster
						position="top-center"
						toastOptions={{
							duration: 5000,
						}}
					/>
				</Box>
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
					max={maxTokens?.toString()}
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
					max={maxTokens?.toString()}
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
					max={maxTokens?.toString()}
					label="Reserved NFTs"
					helperText=" Reserved NFTs will not be included in the sale and can be transferred directly to any wallet address. Enter “0” if you do not wish to reserve any NFTs."
					required
					placeholder="eg.10,000"
					value={reserveTokens}
					setValue={setReserveTokens}
				/>
				<Box mt="mxxxl" />
				<LabelledTextInput label="Public Sale Launch" required type="date">
					<DateTime value={publicSaleLaunchTimestamp} setValue={setPublicSaleLaunchTimestamp} />
				</LabelledTextInput>
				<Box mt="wm" />
				<Presale
					unit={type}
					isChecked={isPresaleable}
					setIsChecked={setIsPresaleable}
					presaleReservedTokens={presaleReservedTokens}
					setPresaleReservedTokens={setPresaleReservedTokens}
					presalePrice={presalePrice}
					setPresalePrice={setPresalePrice}
					presaleMaxHolding={presaleMaxHolding}
					setPresaleMaxHolding={setPresaleMaxHolding}
					presaleStartTime={presaleStartTime}
					setPresaleStartTime={setPresaleStartTime}
					reserveTokens={reserveTokens}
				/>
				<Box mt="wm" />
				<Revealable
					isChecked={isRevealable}
					setIsChecked={setIsRevealable}
					loadingUrl={loadingUrl}
					setLoadingUrl={setLoadingUrl}
					revealableTime={revealableTime}
					setRevealableTime={setRevealableTime}
				/>
				<Box mt="wm" />
				<Affiliable isChecked={isAffiliable} setIsChecked={setIsAffiliable} />
				<Box mt="wm" />
				<ButtonComp bg="primary" height="56px" width="100%" type="submit">
					<Text as="h4" color="simply-white">
						Next
					</Text>
				</ButtonComp>
			</Box>
		</form>
	);
};

export default SalesPage;
