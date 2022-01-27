import AdminDashboardComponent from 'containers/admin';
import { useRouter } from 'next/router';

const AdminDashboardPage = () => {
	return <AdminDashboardComponent />;
};

export default AdminDashboardPage;

AdminDashboardPage.getInitalProps = async (ctx) => {
	const router = useRouter();
	const { contract } = router.query;

	const metadata = axio;
};
