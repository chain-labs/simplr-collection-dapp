import { useState } from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import CollectionPage from './components/CollectionPage';
import PaymentsPage from './components/PaymentsPage';

const AdminDashboardComponent = () => {
	const [step, setStep] = useState(0);

	const getPage = (step) => {
		if (step === 0) {
			return <CollectionPage />;
		}
		if (step === 1) {
			return <PaymentsPage />;
		}
	};

	return (
		<Box>
			<Box bg="yellow-40" height="36rem" width="100%" />
			<Box mt={`-${theme.space.wxs}`} mb="wxs" mx="auto" column center>
				<Box bg="simply-blue" height="10rem" width="10rem" borderRadius="50%" mb="wxxs" />
				<Text as="h3">The Boomer Gang Collective</Text>
				<Text as="h3">(TGBC)</Text>
			</Box>
			<Box row between mx="auto" width="21.6rem">
				<Text as="h4" mr="wxs" color={step === 0 ? 'simply-blue' : 'simply-black'}>
					Collection
				</Text>
				<Text as="h4" mr="wxs" color={step === 1 ? 'simply-blue' : 'simply-black'}>
					Payments
				</Text>
			</Box>
			<Box height="0.1rem" width="115.7rem" mx="auto" bg="rgba(220, 220, 229, 0.5)" mt="mm" />
			{getPage(step)}
		</Box>
	);
};

export default AdminDashboardComponent;
