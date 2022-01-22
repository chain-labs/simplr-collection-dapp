import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import useEthers, { requestAccount } from 'src/ethereum/useEthers';
import useListeners from 'src/ethereum/useListeners';
import useSigner from 'src/ethereum/useSigner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setUser, userSelector } from 'src/redux/user';
import Container from './Container';
import If from './If';
import Text from './Text';

import Wordmark from 'public/wordmark.svg';
import { networks } from 'src/redux/collection/types';
import { WSAEINVAL } from 'constants';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);

	const [provider, setProvider, ethers] = useEthers();
	const [signer, setSigner] = useSigner(provider);
	const [chain, setChain] = useState(null);
	useListeners(provider, setProvider, setSigner);

	useEffect(() => {
		const getChain = async () => {
			const network = await provider.getNetwork();
			setChain(network.chainId);
		};
		if (provider) {
			getChain();
		}
	}, [provider, signer]);

	useEffect(() => {
		if (process.browser) {
			// @ts-expect-error ethereum in window is not defined
			window?.ethereum.on('chainChanged', (chainId) => {
				setChain(chainId);
				window.location.reload();
			});
		}
	}, []);

	const handleConnectWallet = () => {
		requestAccount();
	};

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

			// dispatch(setUser(address));
		}
	}, [signer]);

	return (
		<Box bg="#F8F8F8" py="mxxxl">
			<Container>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Wordmark />
					<Box
						border="1px solid"
						borderColor="black-10"
						borderRadius="4px"
						bg=""
						py="1rem"
						px="mxl"
						onClick={
							!user.exists
								? handleConnectWallet
								: () => {
										return;
								  }
						}
						cursor="pointer"
						row
						center
					>
						<Box height="20px" width="20px" borderRadius="50%" bg={user.exists ? 'green-50' : 'red-50'} />
						<Text as="h5" mx="mxs">
							{networks[chain]?.name}
						</Text>
						<Box height="20px" width="0.1rem" bg="black-10" mr="mxs" />
						<Text as="h5" mx="mxs" color="simply-blue">
							{`${user.address.substring(0, 5)}...${user.address.substr(-4)}`}
						</Text>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Navbar;
