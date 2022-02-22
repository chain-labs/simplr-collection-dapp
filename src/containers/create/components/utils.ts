import axios from 'axios';
import { ethers } from 'ethers';
import { SignerProps } from 'src/ethereum/types';
import { CollectionState, networks } from 'src/redux/collection/types';
import { PaymentState } from 'src/redux/payment/types';
import { SaleState } from 'src/redux/sales/types';
import { getTimestamp } from './SalesPage';

const PINATA_KEY = process.env.NEXT_PUBLIC_IPFS_API_PINATA_KEY;
const PINATA_KEY_SECRET = process.env.NEXT_PUBLIC_IPFS_PINATA_API_SECRET;
const PINATA_URL = 'https://api.pinata.cloud/';

export const unpinMetadata = async (hash) => {
	await axios.delete(`${PINATA_URL}pinning/unpin/${hash}`, {
		headers: {
			pinata_api_key: PINATA_KEY,
			pinata_secret_api_key: PINATA_KEY_SECRET,
		},
	});
};

export const uploadToIPFS = async (
	collection: CollectionState,
	sales: SaleState,
	payments: PaymentState,
	simplrAddress: string
) => {
	const bannerData = new FormData();
	const logoData = new FormData();
	bannerData.append('file', collection.banner_url);
	bannerData.append('pinataMetadata', JSON.stringify({ name: `${collection.name.replace(' ', '_')}_banner` }));
	const banner_res = await axios.post(`${PINATA_URL}pinning/pinFileToIPFS`, bannerData, {
		maxBodyLength: Infinity,
		headers: {
			// @ts-expect-error boundary not found
			'Content-Type': `multipart/form-data; boundary=${bannerData._boundary}`,
			pinata_api_key: PINATA_KEY,
			pinata_secret_api_key: PINATA_KEY_SECRET,
		},
	});

	logoData.append('file', collection.logo_url);
	logoData.append('pinataMetadata', JSON.stringify({ name: `${collection.name.replace(' ', '_')}_logo` }));

	const logo_res = await axios.post(`${PINATA_URL}pinning/pinFileToIPFS`, logoData, {
		maxBodyLength: Infinity,
		headers: {
			// @ts-expect-error boundary not found
			'Content-Type': `multipart/form-data; boundary=${bannerData._boundary}`,
			pinata_api_key: PINATA_KEY,
			pinata_secret_api_key: PINATA_KEY_SECRET,
		},
	});

	const jsonBody = {
		collectionDetails: {
			name: collection.name,
			symbol: collection.symbol,
			logoUrl: `https://simplr.mypinata.cloud/ipfs/${logo_res.data.IpfsHash}`,
			bannerImageUrl: `https://simplr.mypinata.cloud/ipfs/${banner_res.data.IpfsHash}`,
			contactEmail: collection.contact_email,
			websiteUrl: collection.website_url,
			adminAddress: collection.admin,
			networkType: networks[collection.type],
		},
		tokenDetails: {
			basic: {
				maximumTokens: sales.maximumTokens,
				maxPurchase: sales.maxPurchase,
				maxHolding: sales.maxHolding,
				price: ethers.utils.parseUnits(sales?.price?.toString(), 18),
				publicSaleStartTime: getTimestamp(sales.publicSaleStartTime),
			},

			presale: sales.presaleable.enabled
				? {
						presalePrice: ethers.utils.parseUnits(sales.presaleable.presalePrice?.toString(), 18),
						presaleStartTime: getTimestamp(sales.presaleable.presaleStartTime),
						presaleReservedTokens: sales.presaleable.presaleReservedTokens,
						presaleMaxHolding: sales.presaleable.presaleMaxHolding,
						presaleWhitelist: sales.presaleable.presaleWhitelist,
				  }
				: {},
			paymentSplitter: {
				payees: [...payments.paymentSplitter.payees, simplrAddress],
				shares: [...payments.paymentSplitter.shares, ethers.utils.parseUnits('0.1', 18)],
				simplr: simplrAddress,
				simplrShares: ethers.utils.parseUnits('0.1', 18),
			},
			revealable: sales.revealable.enabled
				? {
						projectURI: sales.revealable.loadingImageUrl,
						projectURIProvenance: ethers.utils.keccak256(
							ethers.utils.defaultAbiCoder.encode(['string'], [collection.project_uri])
						),
				  }
				: {},
			reservedTokens: sales.reserveTokens,
			isAffiliable: sales.isAffiliable,
		},
	};
	try {
		const res = await axios.post(
			`${PINATA_URL}pinning/pinJSONToIPFS`,
			{
				pinataMetadata: {
					name: `${collection.name.replace(' ', '_')}_metadata`,
				},
				pinataContent: jsonBody,
			},
			{
				headers: {
					pinata_api_key: PINATA_KEY,
					pinata_secret_api_key: PINATA_KEY_SECRET,
				},
			}
		);
		return {
			banner: jsonBody.collectionDetails.bannerImageUrl.split('ipfs/')[1],
			logo: jsonBody.collectionDetails.logoUrl.split('ipfs/')[1],
			metadata: res.data.IpfsHash,
		};
	} catch (e) {
		unpinMetadata(jsonBody.collectionDetails.logoUrl.split('ipfs/')[1]);
		unpinMetadata(jsonBody.collectionDetails.bannerImageUrl.split('ipfs/')[1]);
	}
};

export const createCollection = async (
	contract,
	metadata: string,
	collection: CollectionState,
	sales: SaleState,
	payments: PaymentState,
	signer: SignerProps
) => {
	const upfrontFee = await contract.upfrontFee(); // it works without callStatic too // upfront fee should be fetched from smart contract

	const simplr = await contract.simplr(); // address of simplr should also be fetched from the smart contract
	const simplrShares = await contract.simplrShares(); // simplrShares should be dynamic and be fetched from the smart contract

	// create params
	const type = 1; // by default

	const baseCollection = {
		name: collection.name, // Name of the collection
		symbol: collection.symbol, // Symbol of the collection
		admin: collection.admin, // admin address
		maximumTokens: sales.maximumTokens, // maximum tokens that can be sold
		maxPurchase: sales.maxPurchase, // maximum tokens that can be purchased at a time in single transaction
		maxHolding: sales.maxHolding, // maximum tokens that a wallet can hold during the sale
		price: ethers.utils.parseUnits(sales.price?.toString(), 18), // 0.08 ETH  // price of public sale // expect wei value
		publicSaleStartTime: getTimestamp(sales.publicSaleStartTime), // timestamp of public sale start
		projectURI: sales.revealable.enabled ? sales.revealable.loadingImageUrl : collection.project_uri, // placeholder or collection uri depending upon what they choose for reveal
	};
	const presaleable = sales.presaleable.enabled
		? {
				presaleReservedTokens: sales.presaleable.presaleReservedTokens, // tokens that will be sold under presale, should be less than maximum tokens
				presalePrice: ethers.utils.parseUnits(sales.presaleable.presalePrice?.toString(), 18), // 0.008 ETH  // price per token during presale // expect wei value
				presaleStartTime: getTimestamp(sales.presaleable.presaleStartTime), // timestamp when presale starts, it should less than timestamp when public sale starts
				presaleMaxHolding: sales.presaleable.presaleMaxHolding, // maximum tokens that a wallet can hold during presale
				presaleWhitelist: sales.presaleable.presaleWhitelist ?? [], // list of addresses that needs to be whiteliste // can be an empty array
		  }
		: {
				presaleReservedTokens: 0, // it can be anything, but better to pass zero
				presalePrice: 0, // it can be anything, but better to pass zero
				presaleStartTime: 0, // this needs to be zero, to make sure presale doesn't get activated
				presaleMaxHolding: 0, // it can be anything, but better to pass zero
				presaleWhitelist: [], // can be empty array
		  }; // should be according to PresaleableStruct

	const shares = [...payments.paymentSplitter.shares];
	const payeeShares = [];
	shares.forEach((share) => {
		const shareFloat = share / 100;
		const shareBN = ethers.utils.parseUnits(shareFloat?.toString(), 18);
		payeeShares.push(shareBN);
	});

	const paymentSplitter = {
		simplr, // simplr address // can get it from CollectionFactoryV2
		simplrShares, // 10% // simplr shares // can get it from CollectionFactoryV2
		payees: [...payments.paymentSplitter.payees, simplr], // list of addresses that will become beneficiaries
		shares: [...payeeShares, simplrShares], // list of respective shares for beneficiaries, both array should match
	}; // should be according to PaymentSplitterStruct

	const revealable = {
		projectURIProvenance: ethers.utils.keccak256(
			ethers.utils.defaultAbiCoder.encode(['string'], [collection.project_uri])
		), // encoded hash of the project uri
		// timestamp when the project will be revealed, it doesn't play a major on chain, it is only for user info
	};
	const royalties = {
		account: payments.royalties.account ?? collection.admin, //account that will receive royalties for secondary sale
		value: payments.royalties.value ? payments.royalties.value * 100 : 0, // 10% // 100% -> 10000 // percentage of the sale that will be transferred to account as royalty
	}; // should be according to LibPart.Part or Royalties struct

	const reserveTokens = sales.reserveTokens; // should be default, this will not activate reservable module
	const isAffiliable = sales.isAffiliable; // true if user wants affiliable to be active

	const transaction = await contract
		.connect(signer)
		.createCollection(
			type,
			baseCollection,
			presaleable,
			paymentSplitter,
			revealable.projectURIProvenance,
			royalties,
			reserveTokens,
			metadata,
			isAffiliable,
			{ value: upfrontFee.toString() }
		);
	const event = (await transaction.wait())?.events?.filter((event) => event.event === 'CollectionCreated')[0]?.args;

	return { transaction, event };
};
