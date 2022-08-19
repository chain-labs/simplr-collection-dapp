import Link from 'next/link';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';

const HomePage = () => {
	return (
		<Box>
			<Text as="h1" mt="wxxl" ml="mxl">
				Home Page
			</Text>
			<Box mt="mxl" ml="mxl">
				<Link href="/my-collections">
					<ButtonComp bg="secondary" height="48px" px="mm" mr="ml">
						My Collection
					</ButtonComp>
				</Link>
				<Link href="/create">
					<ButtonComp bg="secondary" height="48px" px="mm">
						Create Form
					</ButtonComp>
				</Link>
			</Box>
		</Box>
	);
};

export default HomePage;
