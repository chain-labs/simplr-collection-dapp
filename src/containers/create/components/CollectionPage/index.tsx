import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Dropdown from 'src/components/Dropdown';
import { collectionSelector, setCollectionDetails } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { networks, rpc_urls } from 'src/redux/collection/types';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import ButtonComp from 'src/components/Button';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import { CaretRight } from 'phosphor-react';
import theme from 'src/styleguide/theme';
import { networkSelector } from 'src/redux/user';

const CollectionPage = ({ step, setStep }) => {
	const collectionData = useAppSelector(collectionSelector);
	const currentNetwork = useAppSelector(networkSelector);

	const dispatch = useAppDispatch();

	const [collectionName, setCollectionName] = useState<string>(collectionData.name);
	const [collectionSymbol, setCollectionSymbol] = useState<string>(collectionData.symbol);
	const [collectionURI, setCollectionURI] = useState<string>(collectionData.project_uri);
	const [collectionWebURL, setCollectionWebURL] = useState<string>(collectionData.website_url);
	const [collectionLogoURL, setCollectionLogoURL] = useState<string>(collectionData.logo_url);
	const [collectionBannerURL, setCollectionBannerURL] = useState<string>(collectionData.banner_url);
	const [email, setEmail] = useState<string>(collectionData.contact_email);
	const [adminAddress, setAdminAddress] = useState<string>(collectionData.admin);
	const [networkData, setNetworkData] = useState([]);
	const [networkValue, setNetworkValue] = useState<number>(collectionData.type);
	const [network, setNetwork] = useState(networks[networkValue]?.name);

	useEffect(() => {
		setNetworkValue(networkData.indexOf(network));
	}, [networkData, network]);

	useEffect(() => {
		const types = Object.keys(networks);
		const data = [];
		types.map((type) => {
			data[type] = networks[type].name;
		});
		setNetworkData(data);
	}, []);

	const addData = (Step) => {
		const data = getData();
		dispatch(setCollectionDetails(data));
		setStep(Step);
	};

	const getData = () => {
		const data = {
			type: networkValue,
			name: collectionName,
			symbol: collectionSymbol,
			project_uri: collectionURI,
			website_url: collectionWebURL,
			logo_url: collectionLogoURL,
			banner_url: collectionBannerURL,
			contact_email: email,
			admin: adminAddress,
		};
		return data;
	};

	const addCollectionDetails = async (e) => {
		e.preventDefault();
		const valid = ethers.utils.isAddress(adminAddress);
		if (networkValue === -1) {
			toast.error('Please select the newwork');
		} else if (!valid) {
			toast.error('Invalid wallet address');
		} else {
			const data = getData();
			dispatch(setCollectionDetails(data));
			toast.success('Saved');
			dispatch(setCollectionDetails({ collection_validated: true }));
			setStep(1);
		}
	};

	useEffect(() => {
		if (networkValue > 0 && process.browser) {
			const chainId = `0x${networkValue.toString(16)}`;
			const rpc = rpc_urls[networkValue];
			const name = networkData[networkValue];

			if (networkValue === 137 || networkValue === 80001) {
				console.log({ chainId, rpc, name, networkValue });

				// @ts-expect-error ethereum in window
				window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId,
							chainName: name,
							rpcUrls: [`${rpc}`],
						},
					],
				});
			}

			// @ts-expect-error ethereum in window
			window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId }],
			});
		}
	}, [networkValue]);

	return (
		<Box>
			<Text as="h2" center>
				Create new collection
			</Text>
			<Box center mt="mxxxl" mb="ws">
				<Text as="h5" color={step === 0 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(0)}>
					Collection Details
				</Text>
				<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
				<Text as="h5" color={step === 1 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(1)}>
					Sales
				</Text>
				<CaretRight size="24px" color={theme.colors['gray-00']} style={{ marginInline: '4px' }} />
				<Text as="h5" color={step === 2 ? 'simply-blue' : 'gray-00'} cursor="pointer" onClick={() => addData(2)}>
					Payment Details
				</Text>
			</Box>
			<form onSubmit={addCollectionDetails}>
				<Box overflow="visible" mb="20rem">
					<Toaster
						position="top-center"
						toastOptions={{
							duration: 5000,
						}}
					/>
					<LabelledTextInput label="Blockchain" required>
						<Dropdown setValue={setNetwork} value={network} data={networkData} placeholder="Blockchain" />
					</LabelledTextInput>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="text"
						label="Collection Name"
						placeholder="The Boomer Gang Collective"
						width="100%"
						value={collectionName}
						setValue={setCollectionName}
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="text"
						label="Collection Symbol"
						placeholder="TBGC"
						width="100%"
						value={collectionSymbol}
						setValue={setCollectionSymbol}
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="url"
						label="Collection URI"
						placeholder="https://"
						width="100%"
						helperText="Paste the link where your NFT media is stored."
						value={collectionURI}
						setValue={setCollectionURI}
						tooltip
						tooltipText="Collection URI is the URL where your NFT media and metadata are stored. "
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="url"
						label="Collection Website URL"
						placeholder="https://www.theboomergangcollective.com"
						width="100%"
						value={collectionWebURL}
						setValue={setCollectionWebURL}
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="url"
						label="Collection Logo URL"
						placeholder="https://"
						helperText="Accepts JPEG and PNG files."
						width="100%"
						value={collectionLogoURL}
						setValue={setCollectionLogoURL}
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="url"
						label="Collection Banner URL"
						placeholder="https://"
						helperText="Accepts JPEG and PNG files."
						width="100%"
						value={collectionBannerURL}
						setValue={setCollectionBannerURL}
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="email"
						label="Contact e-mail address"
						placeholder="contact@tbgc.com"
						helperText="This e-mail will be used by Simplr for communication."
						width="100%"
						value={email}
						setValue={setEmail}
						required
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						type="text"
						label="Admin wallet address"
						placeholder="0x....abc"
						helperText="This wallet address will be responsible for managing the smart contracts."
						width="100%"
						value={adminAddress}
						setValue={setAdminAddress}
						disableValidation
						required
					/>
					<ButtonComp bg="primary" height="56px" width="100%" mt="wm" type="submit">
						<Text as="h4" color="simply-white">
							Next
						</Text>
					</ButtonComp>
				</Box>
			</form>
		</Box>
	);
};

export default CollectionPage;
