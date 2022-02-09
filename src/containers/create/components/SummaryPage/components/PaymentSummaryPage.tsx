import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import Toggle from 'src/components/Toggle';
import useContract from 'src/ethereum/useContract';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { beneficiariesSelector, paymentSelector } from 'src/redux/payment';
import {
	affiliableToggleSelector,
	presaleableToggleSelector,
	revealableToggleSelector,
	saleSelector,
} from 'src/redux/sales';
import { DateType } from 'src/redux/sales/types';
import { createCollection, unpinMetadata, uploadToIPFS } from '../../utils';
import DeployedModal from './DeployedModal';
import WhitelistComp from './WhitelistComp';

const PaymentSummaryPage = () => {
	const [provider] = useEthers();
	const [signer] = useSigner(provider);
	const collection = useAppSelector(collectionSelector);
	const sales = useAppSelector(saleSelector);
	const presaleable = useAppSelector(presaleableToggleSelector);
	const revealable = useAppSelector(revealableToggleSelector);
	const affiliable = useAppSelector(affiliableToggleSelector);
	const presaleReservedTokens = sales.presaleable.presaleReservedTokens;
	const presalePrice = sales.presaleable.presalePrice;
	const presaleMaxHolding = sales.presaleable.presaleMaxHolding;
	const [presaleStartTime, setPresaleStartTime] = useState<DateType>(sales.presaleable.presaleStartTime);
	const loadingUrl = sales.revealable.loadingImageUrl;
	const [revealableTime, setRevealableTime] = useState<DateType>(sales.revealable.timestamp);
	const payments = useAppSelector(paymentSelector);
	const beneficiaries = useAppSelector(beneficiariesSelector);

	const [royaltyAddress, setRoyaltyAddress] = useState<string>(payments?.royalties?.account);
	const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(payments?.royalties?.value);

	// const [maxShare, setMaxShare] = useState<number>(getMaxShares(beneficiaries?.shares));
	const CollectionFactory = useContract('CollectionFactoryV2', collection.type, provider);
	const [metadata, setMetadata] = useState<string>();
	const [transactionResult, setTransactionResult] = useState<any>();
	const [ready, setReady] = useState(false);
	const [simplrAddress, setSimplrAddress] = useState<string>();
	const [simplrShares, setSimplrShares] = useState<number>(10);
	const [showWhitelist, setShowWhitelist] = useState<boolean>(false);
	const [isDeploymentComplete, setIsDeploymentComplete] = useState<boolean>(false);

	useEffect(() => {
		const getAddress = async () => {
			try {
				const address = await CollectionFactory?.callStatic.simplr();
				const share = await CollectionFactory?.callStatic.simplrShares();

				const sharePercentage = ethers.utils.formatUnits(share?.toString());
				const shareValue = parseFloat(sharePercentage) * 100;

				setSimplrAddress(address);
				setSimplrShares(shareValue);
			} catch (err) {
				console.log({ err });
			}
		};
		getAddress();
	}, [CollectionFactory]);

	const sendData = async () => {
		const res = uploadToIPFS(collection, sales, payments, simplrAddress)
			.then((hash) => {
				setMetadata(hash);
			})
			.catch((err) => {
				console.log({ err });
			});
		toast.promise(res, {
			loading: 'Pinning Metadata to IPFS',
			success: 'Metadata Pinned to IPFS',
			error: 'Something went wrong! Try Again.',
		});
		setReady(true);
	};

	useEffect(() => {
		if (metadata && ready) {
			const transaction = async () => {
				const id = toast.loading('Transaction is processing', { duration: Infinity });
				const res = createCollection(CollectionFactory, metadata, collection, sales, payments, signer)
					.then((tx) => {
						toast.remove(id);
						toast.success('Transaction Successful', { duration: 3000 });
						setTransactionResult(tx);
					})
					.catch((err) => {
						toast.remove(id);
						toast.error('Something went wrong! Try Again.');
						unpinMetadata(metadata);
					});
			};
			transaction();
		}
	}, [metadata, ready]);

	useEffect(() => {
		if (transactionResult?.event) {
			setIsDeploymentComplete(true);
		}
	}, [transactionResult]);

	return (
		<Box overflow="visible">
			{/* <WhitelistComp visible={showWhitelistModal} setVisible={setShowWhitelistModal} /> */}
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
						<LabelledTextInput label="Reveal Time">
							<DateTime value={revealableTime} setValue={setRevealableTime} disabled disableValidation />
						</LabelledTextInput>
						<Box mt="mxxxl" />
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
				<Text as="b1" color="simply-gray" mt="mm">
					Would you like to turn on affiliate marketing for this collection?
				</Text>
			</Box>
			<Box mt="mxxxl" />
			<ButtonComp bg="primary" width="100%" height="56px" type="submit" onClick={() => sendData()}>
				<Text as="h4">Create Collection</Text>
			</ButtonComp>
			<DeployedModal isOpen={isDeploymentComplete} transactionResult={transactionResult} />
		</Box>
	);
};

export default PaymentSummaryPage;
