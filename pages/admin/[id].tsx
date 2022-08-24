/* eslint-disable no-console */
import axios from 'axios';
import AdminDashboardComponent from 'containers/admin';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';
import { setEditDetails } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';
import { getNetworkByShortName } from 'src/utils/chains';
import { useNetwork } from 'wagmi';

const AdminDashboardPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [provider] = useEthers();
	const [metadata, setMetadata] = useState();
	const dispatch = useDispatch();
	const { chain } = useNetwork();
	const [ready, setReady] = useState(false);
	const [contractName, setContractName] = useState();

	const getMetadata = async () => {
		const abi = getContractDetails('Collection');
		const address = `${id}`.split(':')[1];
		const contract = new ethers.Contract(`${address}`, abi, provider);
		const qid = await contract.callStatic.metadata();
		const CONTRACT_NAME = await contract.callStatic.CONTRACT_NAME();
		setContractName(CONTRACT_NAME);

		const res = await axios.get(`https://simplr.mypinata.cloud/ipfs/${qid}`);
		setMetadata(res.data);
		dispatch(setEditDetails({ metadata: res.data }));
	};

	useEffect(() => {
		if (id && provider) {
			if (process.browser) {
				const shortName = `${id}`.split(':')[0];
				const network = getNetworkByShortName(shortName);
				const chainId = `0x${network.chainId.toString(16)}`;
				if (network.chainId !== chain?.id) {
					if (network.chainId === 137 || network.chainId === 80001) {
						window.ethereum
							.request({
								method: 'wallet_addEthereumChain',
								params: [
									{
										chainId,
										chainName: network.name,
										rpcUrls: network.rpc,
									},
								],
							})
							.then(() => {
								window.ethereum
									.request({
										method: 'wallet_switchEthereumChain',
										params: [{ chainId }],
									})
									.then(() => {
										setReady(true);
									})
									.catch((err) => console.log({ err }));
							});
					} else {
						window.ethereum
							.request({
								method: 'wallet_switchEthereumChain',
								params: [{ chainId }],
							})
							.then(() => {
								setReady(true);
							})
							.catch((err) => console.log({ err }));
					}
				} else setReady(true);
			}
		}
	}, [id, provider]);

	useEffect(() => {
		if (ready) {
			getMetadata();
		}
	}, [ready]);

	return <AdminDashboardComponent metadata={metadata} id={id} ready={ready} contractName={contractName} />;
};

export default AdminDashboardPage;

AdminDashboardPage.getInitialProps = async ({ res }) => {
	if (res) {
		res.setHeader('Cache-Control', 'no-store');
	}
	return { cache: false };
};
