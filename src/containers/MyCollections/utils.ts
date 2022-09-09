import { ICollection } from 'src/graphql/query/UserCollections';
import _ from 'lodash';

export const getUniqueCollections = (data): ICollection[] => {
	const arr = [];
	if (!data.user) return arr;
	const { beneficiaries, creator, owner } = data.user;
	beneficiaries.forEach((beneficiary) => {
		arr.push(beneficiary.collection);
	});
	const result = _.unionBy(arr, creator, owner, 'address');
	return result;
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
