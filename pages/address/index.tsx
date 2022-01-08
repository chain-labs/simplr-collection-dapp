import Link from 'next/link';
import { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setUser, removeUser, userSelector } from 'src/redux/user';

const AddressPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);

	const [name, setName] = useState('');

	return (
		<Box>
			<Box>
				<If
					condition={user.exists}
					then={<Box fontSize="3.2rem">Your address: {user.address}</Box>}
					else={<Box fontSize="3.2rem">Connect Wallet Address</Box>}
				/>
				<Box as="input" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
				<Box as="button" onClick={() => dispatch(setUser(name))}>
					Set User
				</Box>
				<Box as="button" onClick={() => dispatch(removeUser())}>
					Remove User
				</Box>
			</Box>
			<Link href="/">Home</Link>
		</Box>
	);
};

export default AddressPage;
