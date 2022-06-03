import axios from 'axios';
import { ethers } from 'ethers';
import { keccak256 } from 'ethers/lib/utils';
import MerkleTree from 'merkletreejs';
import { PINATA_KEY, PINATA_KEY_SECRET, PINATA_URL } from 'src/containers/create/components/utils';

interface IWhitelistManager {
	addresses: string[];
	root: string;
	cid: string;
	tree: MerkleTree;
}

const getRootFromTree = (tree) => '0x' + tree.getRoot().toString('hex');

class WhitelistManagement {
	whitelist: IWhitelistManager;
	constructor(addresses) {
		this.setWhitelist(addresses);
	}

	addWhitelist = (addresses) => {
		const uniqueAddresses = addresses.filter((address) => this.whitelist.addresses.indexOf(address) === -1);
		const newWhitelistAddress = [...this.whitelist.addresses, ...uniqueAddresses];
		this.setWhitelist(newWhitelistAddress);
	};

	removeWhitelist = (addresses) => {
		const filteredAddresses = this.whitelist.addresses.filter((address) => addresses.indexOf(address) === -1);
		this.setWhitelist(filteredAddresses);
	};

	getRoot = () => {
		return this.whitelist.root;
	};

	getCid = async (name) => {
		const res = await axios.post(
			`${PINATA_URL}pinning/pinJSONToIPFS`,
			{
				pinataMetadata: {
					name: `${name.replace(' ', '_')}_whitelist`,
				},
				pinataContent: {
					addresses: this.whitelist.addresses,
				},
			},
			{
				headers: {
					pinata_api_key: PINATA_KEY,
					pinata_secret_api_key: PINATA_KEY_SECRET,
				},
			}
		);
		const hash = res?.data?.IpfsHash;
		this.whitelist.cid = hash;
		return hash;
	};

	getProof = (address) => {
		const leaf = ethers.utils.keccak256(address);
		return this.whitelist.tree.getHexProof(leaf);
	};

	setWhitelist = (addresses) => {
		const leafs = addresses.map((entry) => ethers.utils.keccak256(entry));
		const tree = new MerkleTree(leafs, keccak256, { sortPairs: true });
		this.whitelist = {
			tree,
			root: getRootFromTree(tree),
			addresses: addresses,
			cid: getRootFromTree(tree).toString(), // this is only for now, should be replace with correct IPFS hash
		};
	};
}

export default WhitelistManagement;
