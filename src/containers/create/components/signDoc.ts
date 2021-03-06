import { ethers } from 'ethers';

export const signString = async (signer, date) => {
	const messageToSign = `I agree to the terms and conditions of
using Simplr Collection stored at ipfs:/ at 
${date}`;
	const signature = await signMessage(messageToSign, signer);
	const whoWasTheSigner = verifySignature(messageToSign, signature);
	const signatureData = {
		signature: signature,
		signer: whoWasTheSigner,
		message: messageToSign,
	};
	return signatureData;
};

const signMessage = async (message, signer) => await signer.signMessage(message);
const verifySignature = (message, signature) => ethers.utils.verifyMessage(message, signature);
