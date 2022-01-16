import Box from 'src/components/Box';
import theme from 'src/styleguide/theme';

const BoxShadows = () => {
	return (
		<Box bg="simply-white" height="100vh" px="20rem" py="12rem" display="grid" gridTemplateColumns="repeat(4, 1fr)">
			<ShadowBox text="Shadow-100" shadowType="shadow-100" />
			<ShadowBox text="Shadow-200" shadowType="shadow-200" />
			<ShadowBox text="Shadow-300" shadowType="shadow-300" />
			<ShadowBox text="Shadow-400" shadowType="shadow-400" />
			<ShadowBox text="Shadow-500" shadowType="shadow-500" />
			<ShadowBox text="Shadow-600" shadowType="shadow-600" />
			<ShadowBox text="Shadow-700" shadowType="shadow-700" />
			<ShadowBox text="Shadow-800" shadowType="shadow-800" />
		</Box>
	);
};

export default BoxShadows;

const ShadowBox = ({ text, shadowType }) => {
	return (
		<Box
			height="10rem"
			width="16rem"
			bg="simply-white"
			boxShadow={shadowType}
			borderRadius="8px"
			display="flex"
			center
			color="black-30"
			cursor="pointer"
			css={`
				&:hover {
					box-shadow: none;
					border: 1px solid ${theme.colors['black-30']};
					background: ${theme.colors['simply-blue']};
					color: ${theme.colors['simply-white']};
				}
			`}
		>
			{text}
		</Box>
	);
};
