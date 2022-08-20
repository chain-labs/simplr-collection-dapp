/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { userSelector, setUser } from 'src/redux/user';
import ReactTooltip from 'react-tooltip';

import { List } from 'phosphor-react';
import { DOCS_URL, FAQ_URL } from 'src/utils/constants';
import Link from 'next/link';
import { useNetwork, useSigner } from 'wagmi';
import If from '../If';
import Drawer from './Drawer';
import TooltipPortal from './TooltipPortal';
import NavItem from './NavItem';
import HowToDropdown from './HowToDropdown';
import ConnectWallet from './ConnectWallet';
import Banners from './Banners';
import { Toaster } from 'react-hot-toast';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	const { data: signer } = useSigner();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [networkProps, setNetworkProps] = useState({
		logoColor: '',
		bannerColor: '',
		bannerTextColor: '',
		currency: '',
		bannerText: '',
	});

	const { chain } = useNetwork();

	useEffect(() => {
		if (drawerOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [drawerOpen]);

	useEffect(() => {
		if (signer) {
			try {
				signer
					.getAddress()
					.then((address) => {
						dispatch(setUser(address));
					})
					.catch((err) => {
						console.log({ err });
					});
			} catch (err) {
				console.log(err);
			}
		}
	}, [signer]);

	useEffect(() => {
		ReactTooltip.rebuild();
	});

	return (
		<Box position="fixed" top="0" left="0" width="100%" zIndex={14} column>
			<TooltipPortal />
			<Toaster position="top-center" />
			<Box bg="sky-blue-10" py={!user.exists ? 'ms' : '0'} order={{ mobS: 2, tabS: 1 }}>
				<Box width={{ mobS: '95%', tabS: '90vw', deskM: '136rem' }} mx="auto">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box row alignItems="center">
							<Box
								display={{ mobS: 'block', tabS: 'none' }}
								mr="mm"
								row
								alignItems="center"
								height="2.4rem"
								onClick={() => setDrawerOpen(true)}
							>
								<List size={24} />
							</Box>
							<Drawer {...{ drawerOpen, setDrawerOpen }} />
							<Link href="/" passHref>
								<Box as="img" src="/static/images/svgs/logo.svg" cursor="pointer" />
							</Link>
						</Box>
						<Box row center>
							<NavItem url={FAQ_URL} text="FAQs" />
							<NavItem url={DOCS_URL} text="Docs" />
							<HowToDropdown />
							<ConnectWallet networkProps={networkProps} />
						</Box>
					</Box>
				</Box>
			</Box>
			<If condition={user.exists} then={<Banners {...{ networkProps, setNetworkProps }} />} />
		</Box>
	);
};

export default Navbar;
