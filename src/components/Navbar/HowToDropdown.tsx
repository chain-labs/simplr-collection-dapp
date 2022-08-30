import { motion, useAnimationControls } from 'framer-motion';
import { CaretDown } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import theme from 'src/styleguide/theme';
import { CALENDLY_URL, HOW_TO_CREATE_URL, HOW_TO_MANAGE_URL } from 'src/utils/constants';
import Box from '../Box';
import Text from '../Text';
import useOuterClick from '../useOuterClick';

const HowToDropdown = () => {
	const [howToMenu, setHowToMenu] = useState(false);

	const animateCaret = useAnimationControls();
	const animateMenu = useAnimationControls();

	useEffect(() => {
		if (howToMenu) {
			animateCaret.start('open');
			animateMenu.start('open');
		} else {
			animateCaret.start('closed');
			animateMenu.start('closed');
		}
	}, [howToMenu]);

	const ref = useOuterClick(() => {
		setHowToMenu(false);
	});

	return (
		<Box
			row
			mr="wxs"
			display={{ mobS: 'none', tabS: 'flex' }}
			onClick={() => {
				setHowToMenu(!howToMenu);
			}}
			alignItems="center"
			position="relative"
			ref={ref}
			cursor="pointer"
			css={`
				&:hover {
					color: ${theme.colors['simply-blue']} !important;
				}
			`}
		>
			<Text as="nav" mr="0.2rem">
				How to
			</Text>
			<motion.div
				initial="closed"
				variants={{
					closed: {
						rotate: '0deg',
						transformOrigin: '50% 50%',
						transition: { duration: 0.3, ease: 'easeInOut' },
					},
					open: {
						rotate: '180deg',
						transition: { duration: 0.3, ease: 'easeInOut' },
					},
				}}
				animate={animateCaret}
				style={{ height: '16px' }}
			>
				<CaretDown className="nav-icon" size={16} weight="bold" />
			</motion.div>
			<motion.div
				initial="closed"
				variants={{
					closed: {
						display: 'none',
						transition: { duration: 0.4, ease: 'easeInOut' },
					},
					open: {
						display: 'block',
						transition: { duration: 0.4, ease: 'easeInOut' },
					},
				}}
				animate={animateMenu}
			>
				<Box
					position="absolute"
					zIndex={6}
					bg="gray-10"
					borderRadius="8px"
					pl="ms"
					pr="mxs"
					py="ms"
					width="16rem"
					boxShadow="0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)"
					column
					top="150%"
					left="-10%"
					cursor="auto"
				>
					<Box mb="mm" as="a" href={HOW_TO_CREATE_URL} target="_blank">
						<Text as="nav" color="gray-50" display="inline-block">
							Launch Collection
						</Text>
					</Box>
					<Box as="a" href={HOW_TO_MANAGE_URL} target="_blank">
						<Text as="nav" color="gray-50" display="inline-block">
							Manage Collection
						</Text>
					</Box>
					<Box mt="mm" bg="gray-50" height="1px" mb="ms" />
					<Text as="c2" color="gray-50">
						Still need help?{' '}
						<span>
							<Box as="a" href={CALENDLY_URL} target="_blank" color="simply-blue" cursor="pointer">
								Contact Us
							</Box>
						</span>
					</Text>
				</Box>
			</motion.div>
		</Box>
	);
};

export default HowToDropdown;
