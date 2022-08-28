import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { CaretDown, PlayCircle, X } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { HOW_TO_CREATE_URL } from 'src/utils/constants';
import TutorialBanner from './TutorialBanner';

const MyCollectionsPage = () => {
	const user = useAppSelector(userSelector);
	const { openConnectModal } = useConnectModal();

	if (!user.exists) {
		openConnectModal();
		return <ConnectButton />;
	}
	return (
		<Box width="126rem" mx="auto" mt="15rem">
			<Text as="h3">My Collections</Text>
			<Box mt="wxxs" width="95rem">
				<Box row alignItems="center">
					<Text as="b2" mr="mxs">
						Last Created
					</Text>
					<CaretDown size={16} />
				</Box>
				<TutorialBanner />
				<Box mt="mxl"></Box>
			</Box>
		</Box>
	);
};

export default MyCollectionsPage;
