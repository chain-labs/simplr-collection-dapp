import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Dropdown from 'src/components/Dropdown';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { networks } from 'src/redux/collection/types';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import ButtonComp from 'src/components/Button';

const CollectionPage = () => {
	const [collectionName, setCollectionName] = useState<string>('');
	const [collectionSymbol, setCollectionSymbol] = useState<string>('');
	const [collectionURI, setCollectionURI] = useState<string>('');
	const [collectionWebURL, setCollectionWebURL] = useState<string>('');
	const [collectionLogoURL, setCollectionLogoURL] = useState<string>('');
	const [collectionBannerURL, setCollectionBannerURL] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [adminAddress, setAdminAddress] = useState<string>('');
	const [network, setNetwork] = useState();
	const [networkData, setNetworkData] = useState([]);

	useEffect(() => {
		const types = Object.keys(networks);
		const data = [];
		types.map((type) => {
			data[type] = networks[type].name;
		});
		setNetworkData(data);
		console.log(networkData.indexOf(network));
	}, [networks, network]);

	return (
		<Box overflow="visible" mb="20rem">
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
				type="text"
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
				type="text"
				label="Collection Website URL"
				placeholder="https://www.theboomergangcollective.com"
				width="100%"
				value={collectionWebURL}
				setValue={setCollectionWebURL}
				required
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="text"
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
				type="text"
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
				required
			/>
			<ButtonComp bg="primary" height="56px" width="100%" mt="wm">
				<Text as="h4" color="simply-white">
					Next
				</Text>
			</ButtonComp>
		</Box>
	);
};

export default CollectionPage;
