import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { CaretDown, PlayCircle, PlusCircle, X } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { HOW_TO_CREATE_URL } from 'src/utils/constants';
import CollectionGrid from './CollectionGrid';
import TutorialBanner from './TutorialBanner';

const MyCollectionsPage = () => {
	const user = useAppSelector(userSelector);
	const { openConnectModal } = useConnectModal();

	if (!user.exists) {
		openConnectModal();
		return <ConnectButton />;
	}
	return (
		<Box bg="gray-10" pt="15rem" pb="wm">
			<Box width="126rem" mx="auto">
				<Text as="h3">My Collections</Text>
				<Box mt="wxxs" width="94.8rem">
					<Box row alignItems="center" mb="mxl">
						<Text as="b2" mr="mxs">
							Last Created
						</Text>
						<CaretDown size={16} />
					</Box>
					<TutorialBanner />
					<CollectionGrid />
				</Box>
			</Box>
		</Box>
	);
};

export default MyCollectionsPage;
