import React from 'react';
import animationData from '../lottie/loading.json';
import Lottie from 'react-lottie';
import Box from './Box';
import Text from './Text';

const Loader = ({ msg }) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Box minHeight="100vh" column justifyContent="center">
			<Lottie options={defaultOptions} height={64} width={64} />
			<Text as="h5" mt="mxl" textAlign="center">
				{msg}
			</Text>
		</Box>
	);
};

export default Loader;
