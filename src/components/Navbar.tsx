import { useEffect } from 'react';
import Box from 'src/components/Box';
import useEthers, { requestAccount } from 'src/ethereum/useEthers';
import useListeners from 'src/ethereum/useListeners';
import useSigner from 'src/ethereum/useSigner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { networkSelector, setNetwork, setUser, userSelector } from 'src/redux/user';
import Container from './Container';
import Text from './Text';

import Wordmark from 'public/wordmark.svg';
import { networks } from 'src/redux/collection/types';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);

	const network = useAppSelector(networkSelector);

	const [provider, setProvider] = useEthers();
	const [signer, setSigner] = useSigner(provider);
	useListeners(provider, setProvider, setSigner);

	useEffect(() => {
		const getChain = async () => {
			const network = await provider.getNetwork();
			const chainId = network.chainId;
			dispatch(setNetwork({ chain: chainId, name: networks[chainId].name, id: networks[chainId].id }));
		};
		if (provider) {
			getChain();
		}
	}, [provider, signer]);

	useEffect(() => {
		if (process.browser) {
			// @ts-expect-error ethereum in window is not defined
			window?.ethereum.on('chainChanged', (chainId) => {
				const chain = parseInt(chainId, 16);
				const network = {
					chain: chain,
					name: networks?.[chain]?.name,
					id: networks?.[chain]?.id,
				};
				if (chain !== network.chain) dispatch(setNetwork(network));
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
							{network.name}
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
