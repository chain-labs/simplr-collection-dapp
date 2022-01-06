import Box from 'src/components/Box';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from 'src/redux/reducers/counterSlice';

const HomePage = () => {
	const dispatch = useDispatch();
	const count = useSelector(selectCount);
	return (
		<Box color="seaweed" bg="red">
			Hi! man
			<Box color="yellow" bg="green">
				Counter: {count}
			</Box>
			<Box as="button" onClick={() => dispatch(increment())}>
				+
			</Box>
			<Box as="button" onClick={() => dispatch(decrement())}>
				-
			</Box>
		</Box>
	);
};

export default HomePage;
