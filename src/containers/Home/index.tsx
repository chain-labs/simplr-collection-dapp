import Box from 'components/Box';
import If from 'components/If';
import Link from 'next/link';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const HomeComponent = () => {
	const user = useAppSelector(userSelector);
	return (
		<Box color="seaweed" bg="red">
			Hi! man its me
			<If
				condition={user.exists}
				then={<Box fontSize="3.2rem">Your address: {user.address}</Box>}
				else={<Box fontSize="3.2rem">Connect Wallet Address</Box>}
			/>
			<Link href="/address">Address</Link>
		</Box>
	);
};

export default HomeComponent;
