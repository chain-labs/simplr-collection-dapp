import CreateComp from 'containers/create';
import Head from 'next/head';

const CreatePage = () => {
	return (
		<>
			<Head>
				<title>Simplr | Create Collection</title>
			</Head>
			<CreateComp />;
		</>
	);
};

export default CreatePage;
