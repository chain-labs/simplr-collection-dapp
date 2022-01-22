import Link from 'next/link';
import { useState } from 'react';
import TimezoneSelect, { allTimezones } from 'react-timezone-select';
import Box from 'src/components/Box';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { removeUser, setUser, userSelector } from 'src/redux/user';

console.log({ allTimezones });

const AddressComponent = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelector);

	const [name, setName] = useState('');
	const [timestamp, setTimestamp] = useState(null);
	const [timezone, setTimezone] = useState({});

	return (
		<Box minHeight="90vh" overflow="visible" bg="simply-white">
			<Box mx="auto" width="110rem">
				<If
					condition={user.exists}
					then={<Box fontSize="3.2rem">Your address: {user.address}</Box>}
					else={<Box fontSize="3.2rem">Connect Wallet Address</Box>}
				/>
				<Box as="input" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Box>
				<Box as="button" onClick={() => dispatch(setUser(name))}>
					Set User
				</Box>
				<Box as="button" onClick={() => dispatch(removeUser())}>
					Remove User
				</Box>
				<Link href="/">Home</Link>
				<DateTime value={timestamp} setValue={setTimestamp} />
			</Box>
		</Box>
	);
};

export default AddressComponent;
