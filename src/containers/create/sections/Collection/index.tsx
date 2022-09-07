import { Globe, PlayCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import { collectionSelector, setCollectionDetails } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';
import { DISCORD_INVITE } from 'src/utils/constants';
import InputField from '../../InputField';
import InputImage from '../../InputImage';

const CollectionSection = () => {
	const collection = useAppSelector(collectionSelector);
	const [toggleReveal, setToggleReveal] = useState(collection.delay_reveal.enabled);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCollectionDetails({ delay_reveal: { enabled: toggleReveal } }));
	}, [toggleReveal]);

	return (
		<Box row mt="wm" mb="wl">
			<Box width="66.2rem">
				<Box width="63.8rem">
					<InputField
						idx={1}
						label="Admin Wallet Address"
						required
						width="100%"
						blockchain
						helper="Copied from connected wallet. This address will be the owner and responsible for managing the smart contract."
						value={collection.admin}
						type="address"
					/>
					<Box mt="wxs" />
					<InputField
						idx={2}
						label="Your Collection Name"
						helper="Collection Symbol is also the Token Symbol. We recommend using 3-5 characters."
						value={collection.name}
						required
						width="100%"
						blockchain
						type="text"
						placeholder="The Boomer Gang Collective"
					/>
					<Box mt="wxs" />
					<InputField
						idx={3}
						label="Your Collection Symbol"
						helper="Collection Symbol is also the Token Symbol. We recommend using 3-5 characters."
						value={collection.symbol}
						required
						width="100%"
						blockchain
						type="text"
						placeholder="TBGC"
					/>
					<Box mt="wxs" />
					<InputField
						idx={4}
						label="Collection Website URL"
						helper="Link to your official website"
						value={collection.website_url}
						required
						width="100%"
						type="url"
						placeholder="https://www.theboomergangcollective.com"
					/>
					<Box mt="wxs" />
					<InputField
						idx={5}
						label="Contact e-mail address"
						helper="We will use this email for communication and we promise not to share it with anyone."
						value={collection.email}
						required
						width="100%"
						type="email"
						placeholder="contact@tgbc.com"
					/>
					<Box mt="wxs" />
					<InputImage
						label="Collection Logo and Banner"
						required
						helper="The Logo and Banner will only be used to display on the dashboard."
						width="100%"
					/>
					<Box mt="wxs" />
					<InputField
						idx={6}
						label="Link where your collection metadata is stored"
						helper="Collection metadata is a folder containing JSON files where the JSON files are named in sequential order starting with 1.json."
						value={collection.collection_metadata}
						required
						width="100%"
						type="url"
						placeholder="https://"
					/>
					<Box row alignItems="center" mt="mm" cursor="pointer">
						<PlayCircle size={16} color={theme.colors['blue-30']} weight="fill" />
						<Text as="c1" ml="mxxs" color="blue-30">
							How to upload Metadata to IPFS
						</Text>
					</Box>
				</Box>
				<Box bg="sky-blue-10" borderRadius="8px">
					<Box mt="wxs" bg="sky-blue-20" borderRadius="8px" px="ms" py="mxs" row between>
						<Box>
							<Text as="h5">Delayed Reveal</Text>
							<Text as="b3" color="gray-50" width="48.8rem" mt="mxs">
								Delay the reveal of your NFTs. If not activated, the NFTs will be revealed instantly when minted.
							</Text>
						</Box>
						<Toggle mobile value={toggleReveal} setValue={setToggleReveal} />
					</Box>
					<If
						condition={toggleReveal}
						then={
							<Box bg="transparent" width="61.4rem" ml="ms" mt="mxl" pb="mm">
								<InputField
									idx={7}
									label="Preview Image Metadata Link"
									helper="Preview metadata is a JSON file which will be used untill you reveal the real metadata using dashboard."
									value={collection.delay_reveal.metadata_uri}
									required
									width="100%"
									type="url"
									placeholder="https://gdrive/tbgc/assets/preview.json"
								/>
								<Box row alignItems="center" mt="mm" cursor="pointer">
									<PlayCircle size={16} color={theme.colors['blue-30']} weight="fill" />
									<Text as="c1" ml="mxxs" color="blue-30">
										How to upload Metadata to IPFS
									</Text>
								</Box>
							</Box>
						}
					/>
				</Box>
			</Box>
			<Box flex={1}>
				<Box height="101rem" mb="wl" ml="ws" border="1px solid transparent">
					<Box
						mt="17.8rem"
						p="ms"
						borderRadius="8px"
						bg="sky-blue-20"
						width="37.4rem"
						column
						position="sticky"
						top="17.8rem"
					>
						<Box
							row
							height="14rem"
							borderRadius="4px 4px 0 0"
							overflow="hidden"
							bg="sky-blue-10"
							backgroundImage={collection?.banner ? `url(${URL.createObjectURL(collection.banner)})` : ''}
							backgroundSize="cover"
							backgroundPosition="center"
						/>
						<Box
							width="7rem"
							height="7rem"
							borderRadius="50%"
							bg="blue-30"
							mx="auto"
							mt="-3.5rem"
							zIndex="5"
							backgroundImage={collection?.logo ? `url(${URL.createObjectURL(collection.logo)})` : ''}
							backgroundSize="cover"
							backgroundPosition="center"
						/>
						<Text as="h6" color="blue-40" textAlign="center">
							{collection.name !== '' ? collection.name : 'Collection Name'}
						</Text>
						<Text as="c1" mt="mxxs" textAlign="center">
							{collection.symbol !== '' ? `(${collection.symbol})` : '(Symbol)'}
						</Text>
						<Box row alignItems="center" mx="auto" mt="mxxs" mb="ms">
							<Globe size={16} color={theme.colors['blue-40']} />
							<Text as="c2" ml="mxxs" textAlign="center">
								{collection.symbol !== '' ? collection.website_url : 'https://www.website.domain'}
							</Text>
						</Box>
					</Box>
				</Box>
				<Box ml="ws">
					<Box borderRadius="4px" bg="yellow-20" p="mm" width="33rem">
						<Text as="b2">
							In case you have any queries regarding the metadata for your collection, please reach out to us using
							<span style={{ color: theme.colors['blue-40'] }}>
								<a href={DISCORD_INVITE}> Discord.</a>
							</span>
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default CollectionSection;
