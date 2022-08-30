import { CaretRight, Lightning } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import theme from 'src/styleguide/theme';

interface Props {
	step: number;
	setStep: (step: number) => void;
}

const Header = ({ step, setStep }: Props) => {
	switch (step) {
		case 0:
			return (
				<Box pt="13.6rem" border="1px solid black" center>
					<Text as="h3">Select Collection Type</Text>
				</Box>
			);
		case 1:
		case 2:
		case 3:
		case 4:
			return (
				<Box pt="12.8rem">
					<Box between width="66.2rem" alignItems="center">
						<Text as="h3">New Collection</Text>
						<Box row alignItems="center" p="mxs" border={`1px solid ${theme.colors['blue-20']}`} borderRadius="64px">
							<Lightning size={24} />
							<Box ml="mxs" />
							<Toggle mobile />
						</Box>
					</Box>
					<Box mt="mxxl" row alignItems="center">
						<Text as="h5" color={step === 1 ? 'blue-40' : 'gray-30'} mr="mxxs">
							Collection Details
						</Text>
						<CaretRight color={theme.colors['gray-20']} size={24} />
						<Text as="h5" color={step === 2 ? 'blue-40' : 'gray-30'} mx="mxxs">
							Pricing
						</Text>
						<CaretRight color={theme.colors['gray-20']} size={24} />
						<Text as="h5" color={step === 3 ? 'blue-40' : 'gray-30'} mx="mxxs">
							Withdraw Details
						</Text>
						<CaretRight color={theme.colors['gray-20']} size={24} />
						<Text as="h5" color={step === 4 ? 'blue-40' : 'gray-30'} ml="mxxs">
							Deploy
						</Text>
					</Box>
				</Box>
			);
	}
};

export default Header;
