import axios from 'axios';
import { ethers } from 'ethers';
import WhitelistManagement from 'src/utils/WhitelistManager';
import { SignerProps } from 'src/ethereum/types';
import { CollectionState, networks } from 'src/redux/collection/types';
import { WithdrawState } from 'src/redux/withdraw/types';
import { PricingState } from 'src/redux/pricing/types';
import { getTimestamp } from './SalesPage';

export const PINATA_KEY = process.env.NEXT_PUBLIC_IPFS_API_PINATA_KEY;
export const PINATA_KEY_SECRET = process.env.NEXT_PUBLIC_IPFS_PINATA_API_SECRET;
export const PINATA_URL = 'https://api.pinata.cloud/';
export const PINATA_HASH = process.env.NEXT_PUBLIC_API_KEY;

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
	sales: PricingState,
	payments: WithdrawState,
	simplrAddress: string
) => {
	const bannerData = new FormData();
	const logoData = new FormData();
	bannerData.append('file', collection.banner);
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

	logoData.append('file', collection.logo);
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
			contactEmail: collection.email,
			websiteUrl: collection.website_url,
			adminAddress: collection.admin,
			networkType: networks[collection.network],
		},
		tokenDetails: {
			basic: {
				maximumTokens: sales.totalSupply,
				maxPurchase: sales.sale.perSale,
				maxHolding: sales.sale.perWallet,
				price: ethers.utils.parseUnits(sales?.sale.price?.toString(), 18),
				publicSaleStartTime: getTimestamp(sales.sale.startTime),
			},

			presale: sales.presale.enabled
				? {
						presalePrice: ethers.utils.parseUnits(sales.presale.price?.toString(), 18),
						presaleStartTime: getTimestamp(sales.presale.startTime),
						presaleReservedTokens: sales.presale.maxTokens,
						presaleMaxHolding: sales.presale.perWallet,
						presaleWhitelist: sales.presale.allowList.list,
				  }
				: {},
			paymentSplitter: {
				payees: [...payments.paymentSplitter.map((pay) => pay.payee), simplrAddress],
				shares: [...payments.paymentSplitter.map((pay) => pay.share), ethers.utils.parseUnits('0.1', 18)],
				simplr: simplrAddress,
				simplrShares: ethers.utils.parseUnits('0.1', 18),
			},
			revealable: collection.delay_reveal.enabled
				? {
						projectURI: collection.delay_reveal.metadata_uri,
						projectURIProvenance: ethers.utils.keccak256(
							ethers.utils.defaultAbiCoder.encode(['string'], [collection.collection_metadata])
						),
				  }
				: {},
			reservedTokens: sales.reserve_NFTs,
			isAffiliable: sales.isAffiliable,
		},
	};
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
};

const getWhitelistObject = (addresses) => {
	const whitelistManager = new WhitelistManagement(addresses);
	const root = whitelistManager.getRoot();

	return { root, whitelistManager };
};

export const createCollection = async (
	contract,
	metadata: string,
	collection: CollectionState,
	sales: PricingState,
	payments: WithdrawState,
	signer: SignerProps,
	balance: string[]
) => {
	const upfrontFee = await contract.upfrontFee(); // it works without callStatic too // upfront fee should be fetched from smart contract

	const simplr = await contract.simplr(); // address of simplr should also be fetched from the smart contract
	const simplrShares = await contract.simplrShares(); // simplrShares should be dynamic and be fetched from the smart contract

	// create params
	const type = collection.contract;

	const baseCollection = {
		name: collection.name, // Name of the collection
		symbol: collection.symbol, // Symbol of the collection
		admin: collection.admin, // admin address
		maximumTokens: sales.totalSupply, // maximum tokens that can be sold
		maxPurchase: sales.sale.perSale, // maximum tokens that can be purchased at a time in single transaction
		maxHolding: sales.sale.perWallet, // maximum tokens that a wallet can hold during the sale
		price: ethers.utils.parseUnits(sales.sale.price?.toString(), 18), // 0.08 ETH  // price of public sale // expect wei value
		publicSaleStartTime: getTimestamp(sales.sale.startTime), // timestamp of public sale start
		projectURI: collection.delay_reveal.enabled ? collection.delay_reveal.metadata_uri : collection.collection_metadata, // placeholder or collection uri depending upon what they choose for reveal
	};

	const { root, whitelistManager } = getWhitelistObject(sales.presale.allowList.list);

	const presaleable = sales.presale.enabled
		? {
				presaleReservedTokens: sales.presale.maxTokens, // tokens that will be sold under presale, should be less than maximum tokens
				presalePrice: ethers.utils.parseUnits(sales.presale.price?.toString(), 18), // 0.008 ETH  // price per token during presale // expect wei value
				presaleStartTime: getTimestamp(sales.presale.startTime), // timestamp when presale starts, it should less than timestamp when public sale starts
				presaleMaxHolding: sales.presale.perWallet, // maximum tokens that a wallet can hold during presale
				presaleWhitelist: {
					root,
					cid: await whitelistManager.getCid(collection.name),
				}, // list of addresses that needs to be whiteliste // can be an empty array
		  }
		: {
				presaleReservedTokens: 0, // it can be anything, but better to pass zero
				presalePrice: 0, // it can be anything, but better to pass zero
				presaleStartTime: 0, // this needs to be zero, to make sure presale doesn't get activated
				presaleMaxHolding: 0, // it can be anything, but better to pass zero
				presaleWhitelist: {
					root: ethers.constants.HashZero,
					cid: '',
				}, // can be empty array
		  }; // should be according to PresaleableStruct

	const shares = [...payments.paymentSplitter.map((pay) => pay.share)];
	const payeeShares = [];
	shares.forEach((share) => {
		const shareFloat = share / 100;
		const shareBN = ethers.utils.parseUnits(shareFloat?.toString(), 18);
		payeeShares.push(shareBN);
	});

	const paymentSplitter = {
		simplr, // simplr address // can get it from CollectionFactoryV2
		simplrShares, // 10% // simplr shares // can get it from CollectionFactoryV2
		payees: [...payments.paymentSplitter.map((pay) => pay.payee), simplr], // list of addresses that will become beneficiaries
		shares: [...payeeShares, simplrShares], // list of respective shares for beneficiaries, both array should match
	}; // should be according to PaymentSplitterStruct

	const revealable = {
		projectURIProvenance: ethers.utils.keccak256(
			ethers.utils.defaultAbiCoder.encode(['string'], [collection.collection_metadata])
		), // encoded hash of the project uri
		// timestamp when the project will be revealed, it doesn't play a major on chain, it is only for user info
	};

	const royalties = {
		receiver: payments.royalties[0].receiver ?? collection.admin, //account that will receive royalties for secondary sale
		royaltyFraction: payments.royalties[0].royaltyFraction ? payments.royalties[0].royaltyFraction * 100 : 0, // 10% // 100% -> 10000 // percentage of the sale that will be transferred to account as royalty
	}; // should be according to LibPart.Part or Royalties struct

	const reserveTokens = sales.reserve_NFTs; // should be default, this will not activate reservable module
	const isAffiliable = sales.isAffiliable; // true if user wants affiliable to be active

	if (payments.useEarlyPass) {
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
				true,
				parseInt(balance[0])
			);
		const event = (await transaction.wait())?.events?.filter((event) => event.event === 'CollectionCreated')[0]?.args;
		return { transaction, event };
	} else {
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
				false,
				0,
				{ value: upfrontFee }
			);
		const event = (await transaction.wait())?.events?.filter((event) => event.event === 'CollectionCreated')[0]?.args;

		return { transaction, event };
	}
};
