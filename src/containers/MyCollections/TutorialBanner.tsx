import { PlayCircle, X } from 'phosphor-react';
import React, { useRef } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { HOW_TO_CREATE_URL } from 'src/utils/constants';

const TutorialBanner = () => {
	const [close, setClose] = React.useState(false);
	const [hover, setHover] = React.useState(false);

	const handleClose = (e) => {
		e.preventDefault();
		setClose(true);
	};

	if (close) {
		return null;
	} else
		return (
			<Box as="a" href={HOW_TO_CREATE_URL} target="_blank" cursor="pointer">
				<Box
					row
					between
					bg="yellow-30"
					mb="mxl"
					px="mxl"
					py="ms"
					borderRadius="8px"
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					css={`
						transition: all 0.2s ease-in-out;
						cursor: pointer;
						&:hover {
							box-shadow: 0px 6px 8px -6px rgba(24, 39, 75, 0.12), 0px 8px 16px -6px rgba(24, 39, 75, 0.08);
							transform: translateY(-5px);
						}
					`}
				>
					<Box row alignItems="center">
						<PlayCircle size={32} weight={hover ? 'fill' : 'regular'} />
						<Box ml="ml">
							<Text as="h6" mb="mxxs">
								Let’s begin the adventure
							</Text>
							<Text as="b3">Watch a walkthrough of how to create your own NFT collection using Simplr Collection</Text>
						</Box>
					</Box>
					<Box cursor="pointer" onClick={handleClose}>
						<X size={24} />
					</Box>
				</Box>
			</Box>
		);
};

export default TutorialBanner;
