import axios from 'axios';
import AdminDashboardComponent from 'containers/admin';
import { ethers } from 'ethers';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';

const AdminDashboardPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [provider] = useEthers();
	const [metadata, setMetadata] = useState();

	const getMetadata = async () => {
		const abi = getContractDetails('AffiliateCollection');
		const contract = new ethers.Contract(`${id}`, abi, provider);
		console.log({ provider });
		const qid = await contract.callStatic.metadata();
		const res = await axios.get(`https://simplr.mypinata.cloud/ipfs/${qid}`);
		setMetadata(res.data);
	};

	useEffect(() => {
		if (id && provider) {
			getMetadata();
		}
	}, [id, provider]);

	return <AdminDashboardComponent metadata={metadata} id={id} />;
};

export default AdminDashboardPage;
