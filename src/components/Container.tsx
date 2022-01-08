import styled from 'styled-components';
import Box from 'components/Box';

export const containerPaddingX = {
	mobS: 'mm',
	mobL: 'mxl',
	tabS: 'wxxs',
	tabL: 'ws',
	deskM: 'wxxl',
	deskL: 0,
};

const Container = ({ children }) => {
	return <ContainerBox width={{ deskM: '110rem', deskL: '150rem' }}>{children}</ContainerBox>;
};

const ContainerBox = styled(Box).attrs(() => ({
	px: containerPaddingX,
}))(
	({ theme }) => `
	padding: 0;
	margin: 0 auto;

	@media screen and (max-width: 1600px) and (min-width: 1200px) {
		max-width: 200rem;
		margin: 0 auto;
	}

	@media screen and (min-width: 1600px) {
		max-width: 150rem;
		margin: 0 auto;
	}

	@media only screen and (min-width: ${theme.breakpoints.deskM}) and (orientation: landscape) {
		padding: 0;
		margin: 0 auto;
	}
`
);

export default Container;
