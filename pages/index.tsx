const HomePage = () => {
	return <></>;
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
