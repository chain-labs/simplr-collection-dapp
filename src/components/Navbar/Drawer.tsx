import { motion, useAnimationControls } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CaretDown } from 'phosphor-react';
import { useEffect, useState } from 'react';
import theme from 'src/styleguide/theme';
import { FAQ_URL, DOCS_URL, HOW_TO_CREATE_URL, HOW_TO_MANAGE_URL } from 'src/utils/constants';
import Box from 'components/Box';
import Text from 'components/Text';

const Drawer = ({ drawerOpen, setDrawerOpen }) => {
	const [expandable, setExpandable] = useState(false);

	const controls = useAnimationControls();
	const drawerControls = useAnimationControls();

	useEffect(() => {
		if (drawerOpen) {
			drawerControls.start('open');
		} else {
			drawerControls.start('closed');
		}

		return () => {
			drawerControls.stop();
		};
	}, [drawerOpen]);

	useEffect(() => {
		if (expandable) {
			controls.start('open');
		} else {
			controls.start('closed');
		}
		return () => {
			controls.stop();
		};
	}, [expandable]);

	return (
		<Box
			bg="transparent"
			height="100vh"
			width="100vw"
			position="absolute"
			top="0"
			left="0"
			zIndex={4}
			display={drawerOpen ? 'block' : 'none'}
			onClick={() => {
				setDrawerOpen(false);
			}}
		>
			<motion.div
				initial="closed"
				variants={{
					closed: { x: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
					open: { x: '0', transition: { duration: 0.5, ease: 'easeInOut' } },
				}}
				animate={drawerControls}
				style={{ height: '100%' }}
			>
				<Box
					bg="simply-blue"
					color="simply-white"
					pl="mxxxl"
					pt="mxxl"
					height="100%"
					width="75%"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<Box row mb="wl" onClick={() => setDrawerOpen(false)} alignItems="center">
						<ArrowLeft color={theme.colors['gray-80']} size={16} />
						<Text as="b1" color="gray-80" ml="0.2rem">
							Back
						</Text>
					</Box>
					<Box row mb="wxs" as="a" href={FAQ_URL} target="_blank">
						<Text as="nav" color="gray-80" mr="0.2rem">
							FAQs
						</Text>
						<ArrowUpRight color={theme.colors['gray-80']} size={24} />
					</Box>
					<Box row mb="wxs" as="a" href={DOCS_URL} target="_blank">
						<Text as="nav" color="gray-80" mr="0.2rem">
							Docs
						</Text>
						<ArrowUpRight color={theme.colors['gray-80']} size={24} />
					</Box>
					<Box
						row
						mb="mm"
						onClick={() => {
							setExpandable(!expandable);
						}}
						alignItems="center"
					>
						<Text as="nav" color="gray-80" mr="0.2rem">
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
							animate={controls}
							style={{ height: '24px' }}
						>
							<CaretDown color={theme.colors['gray-80']} size={24} />
						</motion.div>
					</Box>
					<motion.div
						initial="closed"
						variants={{
							closed: {
								clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
								transition: { duration: 0.4, ease: 'easeInOut' },
							},
							open: {
								clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
								transition: { duration: 0.4, ease: 'easeInOut' },
							},
						}}
						animate={controls}
					>
						<Box borderLeft="1px solid white" className="expandable">
							<Box as="a" href={HOW_TO_CREATE_URL} target="_blank">
								<Text as="b1" color="gray-80" ml="mxl" mb="mm">
									Create Collection
								</Text>
							</Box>
							<Box as="a" href={HOW_TO_MANAGE_URL} target="_blank">
								<Text as="b1" color="gray-80" ml="mxl">
									Manage Collection
								</Text>
							</Box>
						</Box>
					</motion.div>
				</Box>
			</motion.div>
		</Box>
	);
};

export default Drawer;
