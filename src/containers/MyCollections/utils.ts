import { ICollection } from 'src/graphql/query/UserCollections';

export const getUniqueCollections = (data): ICollection[] => {
	const arr = [];
	if (!data.user) return arr;
	data.user.beneficiaries.forEach((beneficiary) => {
		if (!arr.find((item) => item?.address === beneficiary?.collection?.address)) {
			arr.push(beneficiary.collection);
		}
	});
	data.user.creator.forEach((creator) => {
		if (!arr.find((item) => item?.address === creator?.address)) {
			arr.push(creator);
		}
	});
	data.user.owner.forEach((owner) => {
		if (!arr.find((item) => item?.address === owner?.address)) {
			arr.push(owner);
		}
	});

	return arr;
};

export const sanitizePinataUrl = (qid: string) => {
	return `https://simplr.mypinata.cloud/ipfs/${qid}`;
};

export const getChainIdFromNetwork = (network) => {
	switch (network) {
		case 'mainnet':
			return 1;
		case 'rinkeby':
			return 4;
		case 'matic':
			return 137;
		case 'mumbai':
			return 80001;
		default:
			return 1;
	}
};
