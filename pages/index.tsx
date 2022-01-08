import Link from 'next/link';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectUser, userSelector } from 'src/redux/user';

const HomePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);
	return (
		<Box color="seaweed" bg="red">
			Hi! man
			<If
				condition={user.exists}
				then={<Box fontSize="3.2rem">Your address: {user.address}</Box>}
				else={<Box fontSize="3.2rem">Connect Wallet Address</Box>}
			/>
			<Link href="/address">Address</Link>
		</Box>
	);
};

export default HomePage;
