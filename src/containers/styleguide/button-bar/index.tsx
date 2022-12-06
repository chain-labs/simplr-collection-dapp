import React, { useState } from 'react';
import Box from 'src/components/Box';
import ButtonBarComp from 'src/components/ButtonBar';
import SingleButton from 'src/components/SingleButton';
import Text from 'src/components/Text';

const ButtonBar = () => {
	const [first, setFirst] = useState<string>('first');
	const [second, setSecond] = useState<string>('second');
	const [third, setThird] = useState<string>('third');
	const [fourth, setFourth] = useState<string>('fourth');
	const [activeButton, setActiveButton] = useState<string>('first');

	return (
		<Box mt="mxxl" mx="mxxl">
			<ButtonBarComp>
				<SingleButton currentActive={activeButton} setValue={setActiveButton} value={first}>
					<Text as="h5" fontWeight="medium" fontFamily="Satoshi">
						Hi
					</Text>
				</SingleButton>
				<SingleButton currentActive={activeButton} setValue={setActiveButton} value={second}>
					{' '}
					<Text as="h5" fontWeight="medium" fontFamily="Satoshi">
						Its
					</Text>
				</SingleButton>
				<SingleButton currentActive={activeButton} setValue={setActiveButton} value={third}>
					{' '}
					<Text as="h5" fontWeight="medium" fontFamily="Satoshi">
						My
					</Text>
				</SingleButton>
				<SingleButton currentActive={activeButton} setValue={setActiveButton} value={fourth}>
					{' '}
					<Text as="h5" fontWeight="medium" fontFamily="Satoshi">
						Button
					</Text>
				</SingleButton>
			</ButtonBarComp>
		</Box>
	);
};

export default ButtonBar;
