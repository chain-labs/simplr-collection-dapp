import React from 'react';
import ReactTooltip from 'react-tooltip';
import theme from 'src/styleguide/theme';
import Box from '../Box';

const TooltipPortal = () => {
	return (
		<Box
			css={`
				.tooltip {
					opacity: 1 !important;
					box-shadow: 0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08);
					border-radius: 4px;
					padding: 4px 8px;
				}
			`}
		>
			<ReactTooltip
				className="tooltip"
				place="bottom"
				arrowColor="transparent"
				backgroundColor={theme.colors['blue-10']}
				textColor={theme.colors['simply-black']}
				effect="solid"
			/>
		</Box>
	);
};

export default TooltipPortal;
