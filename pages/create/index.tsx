import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Text from 'src/components/Text';
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
		<Text as="h1" mt="wxxl" ml="mxl">
			Create Page
		</Text>
	);
};

CreatePage.getInitialProps = wrapper.getInitialPageProps((store) => () => {
	const user: UserState = store.getState().user;
	return { user };
});
export default CreatePage;
