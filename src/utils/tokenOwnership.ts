const tokensOfOwner = async (contract, account) => {
	const filterReceive = contract.filters.Transfer(null, account, null);
	const filterSent = contract.filters.Transfer(account, null, null);
	const tokenReceived = (await contract.queryFilter(filterReceive)).map((event) => event.args.tokenId.toString());
	const tokenSent = (await contract.queryFilter(filterSent)).map((event) => event.args.tokenId.toString());
	let i = 0;
	for (i; i <= tokenReceived.length; i++) {
		if (tokenSent.indexOf(tokenReceived[i]) !== -1) {
			tokenReceived.splice(i, 1);
			i--;
		}
	}
	return tokenReceived;
};

export default tokensOfOwner;
