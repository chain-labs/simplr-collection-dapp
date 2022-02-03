import React, { useState } from 'react';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { networks } from 'src/redux/collection/types';
import Box from 'src/components/Box';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Dropdown from 'src/components/Dropdown';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';

const CollectionSummaryPage = ({ modalStep, setModalStep }) => {
	const collectionData = useAppSelector(collectionSelector);

	const collectionName = collectionData.name;
	const collectionSymbol = collectionData.symbol;
	const collectionURI = collectionData.project_uri;
	const collectionWebURL = collectionData.website_url;
	const collectionLogoURL = collectionData.logo_url;
	const collectionBannerURL = collectionData.banner_url;
	const email = collectionData.contact_email;
	const adminAddress = collectionData.admin;
	const networkValue = collectionData.type;
	const network = networks[networkValue]?.name;
	return (
		<Box overflow="visible" mb="20rem">
			<LabelledTextInput
				label="Blockchain"
				required
				disabled
				value={network}
				placeholder="Blockchain"
				disableValidation
			>
				{/* <Dropdown value={network} placeholder="Blockchain" /> */}
			</LabelledTextInput>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="text"
				label="Collection Name"
				placeholder="The Boomer Gang Collective"
				width="100%"
				value={collectionName}
				disableValidation
				disabled
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="text"
				label="Collection Symbol"
				placeholder="TBGC"
				width="100%"
				value={collectionSymbol}
				disableValidation
				disabled
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="url"
				label="Collection URI"
				placeholder="https://"
				width="100%"
				helperText="Paste the link where your NFT media is stored."
				value={collectionURI}
				tooltip
				disableValidation
				disabled
				tooltipText="Collection URI is the URL where your NFT media and metadata are stored. "
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="url"
				label="Collection Website URL"
				placeholder="https://www.theboomergangcollective.com"
				width="100%"
				value={collectionWebURL}
				disableValidation
				disabled
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="url"
				label="Collection Logo URL"
				placeholder="https://"
				helperText="Accepts JPEG and PNG files."
				width="100%"
				value={collectionLogoURL}
				disableValidation
				disabled
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="url"
				label="Collection Banner URL"
				placeholder="https://"
				helperText="Accepts JPEG and PNG files."
				width="100%"
				value={collectionBannerURL}
				disabled
				disableValidation
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				type="email"
				label="Contact e-mail address"
				placeholder="contact@tbgc.com"
				helperText="This e-mail will be used by Simplr for communication."
				width="100%"
				value={email}
				disableValidation
				disabled
			/>
			<Box mt="mxxxl" />
			<LabelledTextInput
				label="Admin wallet address"
				placeholder="0x....abc"
				helperText="This wallet address will be responsible for managing the smart contracts."
				width="100%"
				value={adminAddress}
				disableValidation
				disabled
			/>
			<ButtonComp bg="tertiary" height="56px" width="100%" mt="wm" type="submit" onClick={() => setModalStep(1)}>
				<Text as="h4" color="simply-blue">
					Next
				</Text>
			</ButtonComp>
		</Box>
	);
};

export default CollectionSummaryPage;
