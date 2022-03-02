import { CaretRight, Check, CheckCircle } from 'phosphor-react';
import ReactDom from 'react-dom';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import Link from 'next/link';
import Navbar from 'src/components/Navbar';
import { SEAT_TOGGLE, toBoolean } from 'src/utils/constants';

interface Props {
	isOpen: boolean;
	setIsOpen: (boolean) => void;
	earlyPass?: boolean;
	loading?: boolean;
}

const SEATModal = ({ isOpen, setIsOpen, earlyPass, loading }: Props) => {
	if (!isOpen) {
		return null;
	} else {
		return (
			<Modal visible={isOpen}>
				<Navbar />
				<Box column minHeight="100vh" position="absolute" top="0" zIndex="-1">
					<Box width="100vw" minHeight="100vh" pt="16rem" bg="simply-white" column center overflowY="auto" mb="0">
						<If
							condition={!loading}
							then={
								<>
									<Box borderRadius="16px" boxShadow="shadow-500" py="wxs" px="mxxxl" maxWidth="43rem" column mb="wxs">
										<Text as="h2" color="simply-blue" textAlign="center" mb="mxxxl">
											{earlyPass ? 'Thank you for getting a SEAT!' : 'Oops... Looks like you don’t hold a SEAT.'}
										</Text>
										<Box ml="mxl" mb={earlyPass ? '7.2rem' : 'wxs'}>
											<Text as="h5" mb="ml">
												{earlyPass
													? 'These are the benefits you avail:'
													: 'At the moment, only Simplr Early Access Token (SEAT) holders can access the Simplr Collection. SEAT gets you access to the Simplr Collection and these benefits:  '}
											</Text>
											<Benefit title="Zero upfront fees" />
											<Box mt="ms" />
											<Benefit title="Zero Simplr shares" />
											<Box mt="ms" />
											<Benefit title="Dedicated Discord Channel for Support" />
											<Box mt="ms" />
											<Benefit title="Skip Waitlist" />
										</Box>
										<ButtonComp
											bg="primary"
											height="48px"
											width="100%"
											onClick={earlyPass ? () => setIsOpen(false) : null}
										>
											<Text as="h5">{earlyPass ? "Let's Go!" : 'Get a SEAT!'}</Text>
										</ButtonComp>
										<If
											condition={!toBoolean(SEAT_TOGGLE) && !earlyPass}
											then={
												<Text
													as="h5"
													mt="mxl"
													color="simply-blue"
													center
													row
													cursor="pointer"
													onClick={() => setIsOpen(false)}
												>
													Continue without SEAT
													<CaretRight size="16" color={theme.colors['simply-blue']} />
												</Text>
											}
										/>
									</Box>
									<Text as="h5" color="#949499" textAlign="center" row mb="wxxs">
										To learn more about launching your NFT collection with Simplr, join our{' '}
										<Box as="a" href="https://discord.gg/rar3aWrwUF" target="_blank">
											<Text as="h5" color="simply-blue" ml="mxxs">
												Discord Server
											</Text>
										</Box>
										.
									</Text>
								</>
							}
						/>
					</Box>
				</Box>
			</Modal>
		);
	}
};

export default SEATModal;

const Benefit = ({ title }) => {
	return (
		<Box row alignItems="center">
			<CheckCircle color={theme.colors['green-50']} weight="fill" size="22" />
			<Text as="h6" ml="mxs">
				{title}
			</Text>
		</Box>
	);
};
