import Box from 'src/components/Box';
import Container from 'src/components/Container';
import Text from 'src/components/Text';

const StyleguideTypescale = () => {
	return (
		<Container>
			<Box mt="wm">
				<Text as="headline">Display Headline</Text>
				<Box height="2px" bg="black-10"></Box>
				<Text as="h1">Heading 1</Text>
				<Text as="h2">Heading 2</Text>
				<Text as="h3">Heading 3</Text>
				<Text as="h4">Heading 4</Text>
				<Text as="h5">Heading 5</Text>
				<Text as="h6">Heading 6</Text>
				<Box my="mm" />

				<Text as="b1">
					SIMPLR IS a simple, cost-effective and easy to use platform to start any NFT Project. We believe in building
					an open community with non-existing entry barriers.
				</Text>
				<Box my="mm" />
				<Text as="b2" my="wl">
					SIMPLR IS a simple, cost-effective and easy to use platform to start any NFT Project. We believe in building
					an open community with non-existing entry barriers.
				</Text>
				<Box my="mm" />
				<Text as="b3" my="ml">
					SIMPLR IS a simple, cost-effective and easy to use platform to start any NFT Project. We believe in building
					an open community with non-existing entry barriers.
				</Text>
			</Box>
		</Container>
	);
};

export default StyleguideTypescale;
