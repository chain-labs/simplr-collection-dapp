import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import CreateComponent from 'src/containers/create';
import { wrapper } from 'src/redux/store';
import { UserState } from 'src/redux/user';

const CreatePage = ({ user }: { user: UserState }) => {
	const router = useRouter();

	useEffect(() => {
		if (!user.exists) {
			router.replace('/my-collections');
		}
	}, []);

	return (
		<Box bg="gray-10" width="100vw" minHeight="100vh">
			<CreateComponent />
		</Box>
	);
};

CreatePage.getInitialProps = wrapper.getInitialPageProps((store) => () => {
	const user: UserState = store.getState().user;
	return { user };
});
export default CreatePage;
