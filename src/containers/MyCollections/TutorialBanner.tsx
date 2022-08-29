import { PlayCircle, X } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { HOW_TO_CREATE_URL } from 'src/utils/constants';

const TutorialBanner = () => {
	const [close, setClose] = React.useState(false);

	const handleClose = (e) => {
		e.preventDefault();
		setClose(true);
	};

	if (close) {
		return null;
	} else
		return (
			<Box row between bg="yellow-20" mb="mxl" px="mxl" py="ms" borderRadius="8px">
				<Box row alignItems="center">
					<Box as="a" href={HOW_TO_CREATE_URL} target="_blank" cursor="pointer">
						<PlayCircle size={32} />
					</Box>
					<Box ml="ml">
						<Text as="h6" mb="mxxs">
							Let’s begin the adventure
						</Text>
						<Text as="b3">Watch a walkthrough of how to create a collection using Simplr</Text>
					</Box>
				</Box>
				<Box cursor="pointer" onClick={handleClose}>
					<X size={24} />
				</Box>
			</Box>
		);
};

export default TutorialBanner;
