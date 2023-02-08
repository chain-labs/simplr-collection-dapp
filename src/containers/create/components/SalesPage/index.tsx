import { CaretRight } from 'phosphor-react';
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
import { DateType } from 'src/redux/sales/types';
import theme from 'src/styleguide/theme';
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

export const getTimestamp = (timeObject: DateType) => {
	const { date, time, timezone } = timeObject;
	const label = timezone?.split(' ')[0];
	const newDate = date.replace(/-/g, '/');
	const timestamp = Date.parse(`${newDate} ${time} ${label ?? `GMT${new Date().toString().split('GMT')[1]}`}`) / 1000;
	return timestamp;
};

const SalesPage = ({ step, setStep }) => {
	const collection = useAppSelector(collectionSelector);
	const sales = useAppSelector(saleSelector);
	const presaleable = useAppSelector(presaleableToggleSelector);
	const revealable = useAppSelector(revealableToggleSelector);
	const affiliable = useAppSelector(affiliableToggleSelector);
	const whitelist = useAppSelector(presaleWhitelistSelector);

	const dispatch = useAppDispatch();

	const [isAffiliable, setIsAffiliable] = useState(affiliable);
	const { type } = collection;
	const [maxTokens, setMaxTokens] = useState<string>(sales.maximumTokens);
	const [maxPurchase, setMaxPurchase] = useState<string>(sales.maxPurchase);
	const [maxHolding, setMaxHolding] = useState<string>(sales.maxHolding);
	const [price, setPrice] = useState<string>(sales.price);
	const [reserveTokens, setReserveTokens] = useState<string>(sales.reserveTokens);
	const [publicSaleLaunchTimestamp, setPublicSaleLaunchTimestamp] = useState<DateType>(sales.publicSaleStartTime);
	const [isPresaleable, setIsPresaleable] = useState(presaleable);

	const [presaleReservedTokens, setPresaleReservedTokens] = useState<string>(sales.presaleable.presaleReservedTokens);
	const [presalePrice, setPresalePrice] = useState<string>(sales.presaleable.presalePrice);
	const [presaleMaxHolding, setPresaleMaxHolding] = useState<string>(sales.presaleable.presaleMaxHolding);
	const [presaleStartTime, setPresaleStartTime] = useState<DateType>(sales.presaleable.presaleStartTime);

	const [isRevealable, setIsRevealable] = useState(revealable);
	const [loadingUrl, setLoadingUrl] = useState<string>(sales.revealable.loadingImageUrl);

	const addData = (Step) => {
		const data = getData();
		dispatch(setSaleDetails(data));
		setStep(Step);
	};

	const getData = () => {
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
				loadingImageUrl: loadingUrl,
			},
			isAffiliable,
		};
		return data;
	};

	const addSalesDetails = async (e) => {
		e.preventDefault();
		const date = Date.now() / 1000;
		const publicSaleTime = getTimestamp(publicSaleLaunchTimestamp);
		if (+publicSaleTime < date) {
			toast.error('Invalid time');
			return;
		}

		if (isPresaleable) {
			const presaleTime = getTimestamp(presaleStartTime);
			if (+presaleReservedTokens > +maxTokens) {
				toast.error('Presale reserved tokens cannot be greater than total supply.');
				return;
			} else if (+presaleMaxHolding > +presaleReservedTokens) {
				toast.error('User cannot buy more than total reserved tokens');
				return;
			} else if (publicSaleTime < presaleTime) {
				toast.error('Presale start time should be earlier than public sale');
				return;
			}
		}
		const data = await getData();
		dispatch(setSaleDetails(data));
		toast.success('Saved');
		dispatch(setSaleDetails({ salesDetails_validated: true }));
		setStep(2);
	};

	return (
		<Box>
			<Text as="h2" center>
				Create new collection
			</Text>
			<Box center mt="mxxxl" mb="ws">
				<Text as="h5" color={step === 0 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(0)}>
					Collection Details
				</Text>
				<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
				<Text as="h5" color={step === 1 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(1)}>
					Sales
				</Text>
				<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
				<Text as="h5" color={step === 2 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(2)}>
					Payment Details
				</Text>
			</Box>
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
						max={maxHolding}
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
						max={maxTokens}
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
						step="0.000001"
						min="0"
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
						max={maxTokens}
						label="Reserved NFTs"
						helperText=" Reserved NFTs will not be included in the sale and can be transferred directly to any wallet address. Enter “0” if you do not wish to reserve any NFTs."
						required
						placeholder="eg.10,000"
						value={reserveTokens}
						setValue={setReserveTokens}
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput label="Public Sale Launch" required type="date">
						<DateTime value={publicSaleLaunchTimestamp} setValue={setPublicSaleLaunchTimestamp} width="100%" />
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
						maxTokens={maxTokens}
					/>
					<Box mt="wm" />
					<Revealable
						isChecked={isRevealable}
						setIsChecked={setIsRevealable}
						loadingUrl={loadingUrl}
						setLoadingUrl={setLoadingUrl}
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
		</Box>
	);
};

export default SalesPage;
