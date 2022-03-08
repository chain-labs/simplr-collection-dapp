import { CircleNotch } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import Toggle from 'src/components/Toggle';
import { useAppSelector } from 'src/redux/hooks';
import { beneficiariesSelector, paymentSelector } from 'src/redux/payment';
import {
	affiliableToggleSelector,
	presaleableToggleSelector,
	revealableToggleSelector,
	saleSelector,
} from 'src/redux/sales';
import { DateType } from 'src/redux/sales/types';
import ApprovalModal from './ApprovalModal';
import WhitelistComp from './WhitelistComp';

const PaymentSummaryPage = ({ setModalStep }) => {
	const sales = useAppSelector(saleSelector);
	const presaleable = useAppSelector(presaleableToggleSelector);
	const revealable = useAppSelector(revealableToggleSelector);
	const affiliable = useAppSelector(affiliableToggleSelector);
	const presaleReservedTokens = sales.presaleable.presaleReservedTokens;
	const presalePrice = sales.presaleable.presalePrice;
	const presaleMaxHolding = sales.presaleable.presaleMaxHolding;
	const [presaleStartTime, setPresaleStartTime] = useState<DateType>(sales.presaleable.presaleStartTime);
	const loadingUrl = sales.revealable.loadingImageUrl;
	const payments = useAppSelector(paymentSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);

	const [royaltyAddress, setRoyaltyAddress] = useState<string>(payments?.royalties?.account);
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(payments?.royalties?.value);

	const [showWhitelist, setShowWhitelist] = useState<boolean>(false);
	const [cta, setCta] = useState('Create Collection');
	const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);

	const componentRef = useRef(null);

	useEffect(() => {
		componentRef.current.scrollIntoView();
	}, []);

	const ref = useRef({ showApprovalModal });

	const createCollectionHandler = async () => {
		setCta('Creating Collection');
		setShowApprovalModal(true);
		ref.current.showApprovalModal = true;
	};

	useEffect(() => {
		if (!showApprovalModal && ref.current.showApprovalModal) {
			setModalStep(0);
			setCta('Create Collection');
		}
	}, [showApprovalModal]);

	return (
		<Box overflow="visible" mb="mxxl" ref={componentRef}>
			<Box ref={componentRef} />
			<ApprovalModal isOpen={showApprovalModal} setIsOpen={setShowApprovalModal} />
			<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
				Pre-sale
				<Box ml="mxxxl" />
				<Toggle value={presaleable} disabled mobile />
			</Text>
			<If
				condition={presaleable}
				then={
					<Box mt="wxs" overflow="visible">
						<LabelledTextInput
							type="number"
							label="Maximum NFTs allowed to sell during pre-sale"
							required
							placeholder="eg. 500"
							value={presaleReservedTokens}
							disableValidation
							disabled
						/>
						<Box mt="mxxxl" />
						<LabelledTextInput
							step="0.01"
							label="Price per NFT (Presale)"
							value={presalePrice}
							disabled
							disableValidation
						/>
						<Box mt="mxxxl" />
						<LabelledTextInput
							label="Maximum NFTs allowed to buy per user during pre-sale"
							required
							placeholder="eg. 2"
							value={presaleMaxHolding}
							disabled
							disableValidation
						/>
						<Box mt="mxxxl" />
						<LabelledTextInput label="Pre-Sale Launch" required>
							<DateTime value={presaleStartTime} setValue={setPresaleStartTime} disabled disableValidation />
						</LabelledTextInput>
						<Box mt="mxxxl" />
						<Text
							as="c1"
							color="simply-blue"
							textDecoration="underline"
							cursor="pointer"
							onClick={() => setShowWhitelist(!showWhitelist)}
						>
							{showWhitelist ? 'HIDE WHITELISTED ADDRESSES' : 'WHITELISTED ADDRESSES'}
						</Text>
					</Box>
				}
			/>
			<If condition={showWhitelist} then={<WhitelistComp />} />
			<Box mt="mxxxl" />
			<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
				Make Project Revealable
				<Box ml="mxxxl" />
				<Toggle value={revealable} disabled mobile />
			</Text>
			<If
				condition={revealable}
				then={
					<Box mt="wxs" overflow="visible">
						<LabelledTextInput
							label="Loading Image URI"
							placeholder="https://"
							helperText="Placeholder image that will be displayed until the set reveal time."
							value={loadingUrl}
							width="100%"
							disableValidation
							disabled
						/>
					</Box>
				}
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput label="Royalties" helperText="Maximum 10%">
				<Box row overflow="visible">
					<TextInput
						value={royaltyAddress}
						setValue={setRoyaltyAddress}
						placeholder="Wallet address"
						type="text"
						width="41.7rem"
						fontSize="1.4rem"
						disabled
						disableValidation
					/>
					<Box ml="mxs" />
					<TextInput
						value={royaltyPercentage}
						setValue={setRoyaltyPercentage}
						placeholder="eg. 5"
						type="number"
						width="21.4rem"
						unit="%"
						fontSize="1.4rem"
						disableValidation
						disabled
					/>
				</Box>
			</LabelledTextInput>
			<Box mt="mxxxl" />
			<LabelledTextInput label="Beneficiaries" required>
				<Box row overflow="visible" mb="ms">
					<TextInput value="Simplr" type="text" width="41.7rem" disabled disableValidation fontSize="1.4rem" />
					<Box ml="mxs" />
					<TextInput value="15%" type="text" width="21.4rem" disabled disableValidation fontSize="1.4rem" />
				</Box>
				{beneficiaries?.payees?.map((payee, index) => (
					<Box row overflow="visible" mb="ms" key={payee.substr(-4)}>
						<TextInput
							value={null}
							placeholder={payee}
							type="text"
							width="41.7rem"
							fontSize="1.4rem"
							disabled
							disableValidation
						/>
						<Box ml="mxs" />
						<TextInput
							value={null}
							placeholder={`${beneficiaries?.shares[index]}%`}
							type="number"
							width="21.4rem"
							disabled
							disableValidation
							fontSize="1.4rem"
						/>
					</Box>
				))}
			</LabelledTextInput>
			<Box mt="mxxl">
				<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
					Affiliate Marketing
					<Box ml="mxxxl" />
					<Toggle value={affiliable} disabled mobile />
				</Text>
			</Box>
			<Box mt="mxxxl" />
			<ButtonComp
				bg="primary"
				width="100%"
				height="56px"
				type="submit"
				onClick={() => createCollectionHandler()}
				disable={cta !== 'Create Collection'}
				center
			>
				<Text as="h4">{cta}</Text>
				<Box center ml="mxs" className="spin" display={cta === 'Creating Collection' ? 'flex' : 'none'}>
					<CircleNotch size="24" />
				</Box>
			</ButtonComp>
		</Box>
	);
};

export default PaymentSummaryPage;
