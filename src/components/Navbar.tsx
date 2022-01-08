import { useEffect } from 'react';
import Box from 'src/components/Box';
import useEthers, { requestAccount } from 'src/ethereum/useEthers';
import useListeners from 'src/ethereum/useListeners';
import useSigner from 'src/ethereum/useSigner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setUser, userSelector } from 'src/redux/user';
import Container from './Container';
import If from './If';
import Text from './Text';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);

	const [provider, setProvider, ethers] = useEthers();
	const [signer, setSigner] = useSigner(provider);
	useListeners(provider, setProvider, setSigner);

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
		<Box bg="grey" color="white">
			<Container>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Text as="h1">Simplr Collection</Text>
					<Box
						border="2px solid white"
						borderRadius="4px"
						bg="black"
						py="1rem"
						px="2.4rem"
						onClick={
							!user.exists
								? handleConnectWallet
								: () => {
										return;
								  }
						}
						cursor="pointer"
					>
						<Text as="b1">
							<If condition={user.exists} then={`Connected to ${user.address}`} else={'Connect your wallet'} />
						</Text>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Navbar;
