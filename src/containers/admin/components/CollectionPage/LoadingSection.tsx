import Box from 'src/components/Box';
import Text from 'src/components/Text';

const LoadingSection = ({ loadPercentage }) => {
	return (
		<Box center my="mxxxl" column>
			<Text as="b1">Fetching collection information...</Text>
			<Box mt="mm">
				<Box height="0.4rem" width="10rem" bg="#c4c4c4" borderRadius="16px">
					<Box
						height="100%"
						borderRadius="16px"
						width={`${loadPercentage}%`}
						css={`
							transition: width ${loadPercentage > 95 ? '0.5s' : '7s'} ease-in-out;
						`}
						bg="simply-blue"
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default LoadingSection;
