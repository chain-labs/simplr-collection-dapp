import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react';
import Loader from 'src/components/Loader';
import MyCollectionsPage from 'src/containers/MyCollections';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const MyCollectionPage = () => {
	const user = useAppSelector(userSelector);
	const { openConnectModal } = useConnectModal();

	if (!user.exists) {
		openConnectModal();
		return <Loader msg="Fetching your collections..." />;
	}
	return <MyCollectionsPage />;
};

export default MyCollectionPage;
