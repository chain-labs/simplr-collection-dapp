import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';
import { setEditDetails } from 'src/redux/edit';
import theme from 'src/styleguide/theme';
import CollectionPage from './components/CollectionPage';
import PaymentsPage from './components/PaymentsPage';
import { blockExplorer } from 'src/utils/links';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const AdminDashboardComponent = ({ metadata, id, ready }) => {
	const [step, setStep] = useState(0);
	const [provider] = useEthers();
	const [contract, setContract] = useState<ethers.Contract>();
	const user = useAppSelector(userSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (id && provider) {
			const abi = getContractDetails('AffiliateCollection');
			const address = `${id}`.split(':')[1];
			const contract = new ethers.Contract(address, abi, provider);
			dispatch(setEditDetails({ contract: contract }));
			setContract(contract);
		}
	}, [id, provider]);

	return (
		<Box>
			<Toaster position="top-center" />
			<Box
				backgroundImage={`url(${metadata?.collectionDetails.bannerImageUrl})`}
				// @ts-expect-error bgPosition data error
				backgroundPosition="50% 25%"
				backgroundColor="black"
				backgroundRepeat="no-repeat"
				backgroundSize="cover"
				height="36rem"
				width="100%"
			/>
			<Box mt={`-${theme.space.wxs}`} mb="wxs" mx="auto" column center>
				<Box
					backgroundImage={`url(${metadata?.collectionDetails.logoUrl})`}
					backgroundPosition="center"
					backgroundSize="cover"
					height="10rem"
					width="10rem"
					borderRadius="50%"
					mb="wxxs"
				/>
				<Text as="h3">{metadata?.collectionDetails.name}</Text>
				<Text as="h3">({metadata?.collectionDetails.symbol ?? '...'})</Text>
				<Box mt="ms" row>
					<Text as="b1" mr="mxxs">
						Contract Address:
					</Text>
					<Box as="a" href={`${blockExplorer(user.network.chain)}/address/${id}`} target="_blank" rel="noreferrer">
						<Text as="b1" color="simply-blue">
							{`${id}`.split(':')[1]}
						</Text>
					</Box>
				</Box>
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
			<Box display={step === 0 ? 'block' : 'none'}>
				<CollectionPage contract={contract} metadata={metadata} ready={ready} />
			</Box>
			<Box display={step === 1 ? 'block' : 'none'}>
				<PaymentsPage contract={contract} metadata={metadata} ready={ready} />
			</Box>
		</Box>
	);
};

export default AdminDashboardComponent;
