/* eslint-disable no-console */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import BeneficiaryInfo from './BeneficiaryInfo';
import Royalties from './Royalties';
import WithdrawModal from './WithdrawModal';
import WithdrawSection from './WithdrawSection';

const PaymentsPage = ({ contract, metadata, ready }) => {
	const [payees, setPayees] = useState<string[]>([]);
	const [shares, setShares] = useState<number[]>([]);
	const [simplrShares, setSimplrShares] = useState<number>(0);
	const [userShare, setUserShare] = useState('0');
	const [pendingPayment, setPendingPayment] = useState('0.0');
	const [totalFunds, setTotalFunds] = useState('0.0');
	const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(0);
	const [admin, setAdmin] = useState('');

	const user = useAppSelector(userSelector);

	useEffect(() => {
		const getDetails = async () => {
			const simplrShares = await contract.callStatic.SIMPLR_SHARES();
			setSimplrShares(simplrShares);
		};
		if (contract && ready) {
			getDetails();
		}
	}, [contract, ready]);

	useEffect(() => {
		const hydrate = () => {
			try {
				if (metadata) {
					const getPayment = async (share) => {
						if (user.provider) {
							const balance = await user.provider?.getBalance(contract.address);
							const totalReleased = await contract.callStatic['totalReleased()']();
							const totalFunds = balance.add(totalReleased);
							const totalShares = await contract.callStatic.totalShares();
							const released = await contract.callStatic['released(address)'](user.address);
							const userShare = ethers.utils.parseUnits(share.toString(), 16);
							const pendingPayment = totalFunds.mul(userShare).div(totalShares).sub(released);
							setTotalFunds(ethers.utils.formatUnits(totalFunds));
							setPendingPayment(ethers.utils.formatUnits(pendingPayment));
							const admin = await contract.callStatic.owner();
							setAdmin(admin);
						}
					};
					const { tokenDetails } = metadata;
					const payees: string[] = tokenDetails.paymentSplitter.payees;
					const shares = tokenDetails.paymentSplitter.shares;
					setPayees(payees);
					setShares(shares);
					const index = payees.findIndex((payee) => payee === user.address);
					if (index !== -1) {
						const share = shares[index];
						setUserShare(share.toString());
						if (contract) {
							getPayment(share);
						}
					} else {
						setUserShare('0');
						setPendingPayment('0.0');
						setTotalFunds('0.0');
					}
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (isWithdrawModalOpen === 0 && ready) hydrate();
	}, [metadata, user, user.provider, isWithdrawModalOpen]);

	return (
		<Box mt="6rem" width="116.8rem" mx="auto">
			<WithdrawModal isOpen={isWithdrawModalOpen} setIsOpen={setIsWithdrawModalOpen} pendingPayment={pendingPayment} />
			<Box row between alignItems="flex-start">
				<BeneficiaryInfo {...{ payees, shares, simplrShares }} />
				<WithdrawSection {...{ contract, userShare, totalFunds, pendingPayment, setIsWithdrawModalOpen }} />
			</Box>
			<Royalties {...{ contract, admin, signer: user.signer, ready }} />
		</Box>
	);
};

export default PaymentsPage;
