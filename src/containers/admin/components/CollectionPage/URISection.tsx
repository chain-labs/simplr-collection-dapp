import { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { setEditDetails } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { CollectionSectionProps } from './SalesSection';

const URISection = ({ collection, setShowModal }: CollectionSectionProps) => {
	const user = useAppSelector(userSelector);
	const dispatch = useAppDispatch();
	const [adminAddress, setAdminAddress] = useState('');
	const [collectionUri, setCollectionURI] = useState('');

	const handleAction = (editData, type, placeholder, valueData) => {
		setShowModal(true);
		const editableData = {
			type: type,
			label: editData,
			placeholder: placeholder,
			data: valueData,
			editable: type,
			editfield: editData,
			adminAddress: collection.adminAddress,
		};
		dispatch(setEditDetails(editableData));
	};

	return (
		<Box row between mt="mxxxl" mb="wxl">
			<Box>
				<Box row between mb="mxs">
					<Text as="h6">Collection URI</Text>

					<Text
						as="h6"
						color="simply-blue"
						textDecoration="underline"
						cursor={collection.adminAddress === user.address ? 'pointer' : 'not-allowed'}
						onClick={
							collection.adminAddress === user.address
								? () => handleAction('Collection URI', 'url', 'https://', collectionUri)
								: () => setAdminAddress(adminAddress)
						}
					>
						Edit
					</Text>
				</Box>
				<TextInput
					placeholder="https://gdrive.com/***"
					value={''}
					setValue={setCollectionURI}
					disableValidation
					width="100%"
					disabled
				/>
				<Text as="b1" mt="mxs" color="gray-00">
					Collection URI is the URL where your NFT media and metadata are stored.{' '}
				</Text>
			</Box>
			<Box ml="wm" />
			<If
				condition={!collection.revealed}
				then={
					<Box flex={1}>
						<Text as="h6" mb="mxs">
							Loading Image URI
						</Text>
						<TextInput
							placeholder="https://gdrive.com/somethingurl"
							value={collection.projectURI}
							disableValidation
							disabled
							width="100%"
						/>
						<Text as="b1" mt="mxs" color="gray-00">
							Placeholder image that will be displayed until the set reveal time.
						</Text>
					</Box>
				}
			/>
		</Box>
	);
};

export default URISection;
