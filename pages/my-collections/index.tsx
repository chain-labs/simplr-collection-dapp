import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react';
import MyCollectionsPage from 'src/containers/MyCollections';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const MyCollectionPage = () => {
	const user = useAppSelector(userSelector);
	const { openConnectModal } = useConnectModal();

	if (!user.exists) {
		openConnectModal();
		return null;
	}

	return <MyCollectionsPage />;
};

export default MyCollectionPage;
