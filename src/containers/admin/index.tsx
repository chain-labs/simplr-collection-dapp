import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import useContract from 'src/ethereum/useContract';
import useCustomContract, { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';
import theme from 'src/styleguide/theme';
import CollectionPage from './components/CollectionPage';
import PaymentsPage from './components/PaymentsPage';

const AdminDashboardComponent = ({ metadata, id }) => {
	const [step, setStep] = useState(0);
	const [provider] = useEthers();
	const [contract, setContract] = useState<ethers.Contract>();

	useEffect(() => {
		if (id) {
			const abi = getContractDetails('AffiliateCollection');
			const contract = new ethers.Contract(id, abi, provider);
			setContract(contract);
		}
	}, [id]);

	useEffect(() => {
		console.log({ metadata });
	}, [metadata]);

	const getPage = (step) => {
		if (step === 0) {
			return <CollectionPage contract={contract} />;
		}
		if (step === 1) {
			return <PaymentsPage contract={contract} />;
		}
	};

	return (
		<Box>
			<Toaster position="top-center" />
			<Box
				backgroundImage={`url(${metadata?.collectionDetails.bannerImageUrl})`}
				backgroundPosition="top"
				backgroundColor="black"
				backgroundRepeat="no-repeat"
				height="36rem"
				width="100%"
			/>
			<Box mt={`-${theme.space.wxs}`} mb="wxs" mx="auto" column center>
				<Box
					backgroundImage={`url(${metadata?.collectionDetails.logoUrl})`}
					backgroundPosition="center"
					backgroundSize="contain"
					height="10rem"
					width="10rem"
					borderRadius="50%"
					mb="wxxs"
				/>
				<Text as="h3">{metadata?.collectionDetails.name}</Text>
				<Text as="h3">({metadata?.collectionDetails.symbol})</Text>
			</Box>
			<Box row between mx="auto" width="21.6rem">
				<Text
					as="h4"
					mr="wxs"
					color={step === 0 ? 'simply-blue' : 'simply-black'}
					onClick={() => setStep(0)}
					cursor="pointer"
				>
					Collection
				</Text>
				<Text
					as="h4"
					mr="wxs"
					color={step === 1 ? 'simply-blue' : 'simply-black'}
					onClick={() => setStep(1)}
					cursor="pointer"
				>
					Payments
				</Text>
			</Box>
			<Box height="0.1rem" width="115.7rem" mx="auto" bg="rgba(220, 220, 229, 0.5)" mt="mm" />
			{getPage(step)}
		</Box>
	);
};

export default AdminDashboardComponent;
