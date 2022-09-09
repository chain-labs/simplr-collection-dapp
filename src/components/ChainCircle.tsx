import Image from 'next/image';
import React from 'react';
import Box from './Box';
import If from './If';

import { getNavProps } from 'src/utils/navbarUtils';

import PolygonSVG from 'src/../public/static/images/svgs/polygon.svg';

const ChainCircle = ({ chainId }) => {
	return (
		<Box
			as="button"
			type="button"
			borderRadius="50%"
			bg={getNavProps(chainId).logoColor}
			height="3rem"
			width="3rem"
			mr="mxs"
			center
			border="none"
		>
			<Box position="relative" height="2.4rem" width="2.4rem" p="mxxs" center>
				<If
					condition={chainId === 1 || chainId === 4}
					then={<Image src="/static/images/svgs/eth.svg" layout="fill" objectFit="contain" />}
					else={
						<Box color={chainId === 137 ? 'simply-white' : 'simply-purple'} center>
							<PolygonSVG />
						</Box>
					}
				/>
			</Box>
		</Box>
	);
};

export default ChainCircle;
