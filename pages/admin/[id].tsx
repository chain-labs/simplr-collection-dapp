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
import { networkSelector } from 'src/redux/user';
import { getNetworkByShortName } from 'src/utils/chains';

const AdminDashboardPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [provider] = useEthers();
	const [metadata, setMetadata] = useState();
	const dispatch = useDispatch();
	const currentNetwork = useAppSelector(networkSelector);
	const [ready, setReady] = useState(false);

	const getMetadata = async () => {
		const abi = getContractDetails('Collection');
		const address = `${id}`.split(':')[1];
		const contract = new ethers.Contract(`${address}`, abi, provider);
		const qid = await contract.callStatic.metadata();
		const res = await axios.get(`https://simplr.mypinata.cloud/ipfs/${qid}`);
		console.log({ met: res.data });

		setMetadata(res.data);
		dispatch(setEditDetails({ metadata: res.data }));
	};

	useEffect(() => {
		if (id && provider) {
			if (process.browser) {
				const shortName = `${id}`.split(':')[0];
				const network = getNetworkByShortName(shortName);
				const chainId = `0x${network.chainId.toString(16)}`;
				if (network.chainId !== currentNetwork.chain) {
					if (network.chainId === 137 || network.chainId === 80001) {
						// @ts-expect-error ethereum in window
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
								// @ts-expect-error ethereum in window
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
						// @ts-expect-error ethereum in window
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

	return <AdminDashboardComponent metadata={metadata} id={id} ready={ready} />;
};

export default AdminDashboardPage;

AdminDashboardPage.getInitialProps = async ({ res }) => {
	if (res) {
		res.setHeader('Cache-Control', 'no-store');
	}
	return { cache: false };
};
