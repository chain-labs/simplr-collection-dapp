import Box from 'src/components/Box';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';

const Affiliable = ({ isChecked, setIsChecked }) => {
	return (
		<Box>
			<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
				Affiliate Marketing
				<Box ml="mxxxl" />
				<Toggle value={isChecked} setValue={setIsChecked} mobile />
			</Text>
			<Text as="b1" color="simply-gray" mt="mm">
				Would you like to turn on affiliate marketing for this collection?
			</Text>
		</Box>
	);
};

export default Affiliable;
