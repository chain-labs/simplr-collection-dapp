import { ArrowUpRight } from 'phosphor-react';
import React from 'react';
import theme from 'src/styleguide/theme';
import { FAQ_URL } from 'src/utils/constants';
import Box from '../Box';
import Text from '../Text';

const NavItem = ({ url, text }) => {
	return (
		<Box
			row
			mr="wxs"
			display={{ mobS: 'none', tabS: 'flex' }}
			as="a"
			href={FAQ_URL}
			target="_blank"
			css={`
				&:hover {
					color: ${theme.colors['simply-blue']};
				}
			`}
		>
			<Text as="nav" mr="0.2rem">
				FAQs
			</Text>
			<ArrowUpRight className="nav-icon" size={16} />
		</Box>
	);
};

export default NavItem;
