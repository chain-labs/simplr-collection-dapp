import HomeComponent from 'containers/Home';

const HomePage = () => {
	return <HomeComponent />;
};

export default HomePage;

HomePage.getInitialProps = async ({ res }) => {
	if (res) {
		res.writeHead(301, {
			Location: '/create',
		});
		res.end();
	}

	return {};
};
