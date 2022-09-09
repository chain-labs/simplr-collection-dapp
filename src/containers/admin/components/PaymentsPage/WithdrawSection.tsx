import React from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';
import { useNetwork, useSigner } from 'wagmi';

interface Props {
	userShare: string;
	totalFunds: string;
	contract: any;
	pendingPayment: string;
	setIsWithdrawModalOpen: (boolean) => void;
}

const WithdrawSection = ({ userShare, totalFunds, contract, pendingPayment, setIsWithdrawModalOpen }: Props) => {
	const user = useAppSelector(userSelector);
	const { data: signer } = useSigner();
	const { chain } = useNetwork();

	const withdraw = async () => {
		toast.loading('Transaction is processing!', {
			duration: Infinity,
		});

		const transaction = await contract
			.connect(signer)
			['release(address)'](user.address)
			.catch(() => setIsWithdrawModalOpen(2));
		const getEvent = async (transaction) => {
			const event = (await transaction.wait())?.events?.filter((event) => event.event === 'PaymentReleased')[0]?.args;
			return event;
		};
		getEvent(transaction)
			.then(() => {
				setIsWithdrawModalOpen(1);
				toast.dismiss();
			})
			.catch(() => {
				setIsWithdrawModalOpen(2);
				toast.dismiss();
			});
	};
	return (
		<Box width="55.2rem">
			<Text as="h6" mb="mm">
				Withdraw Funds:
			</Text>
			<Box bg="white-00" p="mm" borderRadius="8px">
				<Box row alignItems="center" mb="mxl">
					<Text as="h5" width="16.5rem" mr="mm">
						Wallet Address:
					</Text>
					<Text as="h6" color="simply-blue">
						{user.address}
					</Text>
				</Box>
				<Box row alignItems="center" mb="mxl">
					<Text as="h5" width="16.5rem" mr="mm">
						Share:
					</Text>
					<Text as="h6" color="simply-blue">
						{`${userShare}%`}
					</Text>
				</Box>
				<Box row alignItems="center" mb="mxl">
					<Text as="h5" width="16.5rem" mr="mm">
						Total funds collected:
					</Text>
					<Text as="h6" color="simply-blue">
						{`${totalFunds} ${getUnitByChainId(chain?.id)}`}
					</Text>
				</Box>
				<Box row alignItems="center">
					<Text as="h5" width="16.5rem" mr="mm">
						Funds you will receive:
					</Text>
					<Text as="h6" color="simply-blue">
						{`${pendingPayment} ${getUnitByChainId(chain?.id)}`}
					</Text>
				</Box>
			</Box>
			<Box row justifyContent="flex-end" mt="mm">
				<ButtonComp bg="primary" height="40px" px="mxl" onClick={() => withdraw()}>
					Withdraw
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default WithdrawSection;
