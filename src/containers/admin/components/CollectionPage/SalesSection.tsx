import { CurrencyEth, ImageSquare, Timer } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';
import DashboardCard from './DashboardCard';
import { IAdminCollection } from './OverviewSection';

export interface CollectionSectionProps {
	collection: IAdminCollection;
	showModal?: boolean;
	setShowModal: (boolean) => void;
}

const SalesSection = ({ collection, showModal, setShowModal }: CollectionSectionProps) => {
	const user = useAppSelector(userSelector);

	return (
		<Box row flexWrap="wrap" between mt="mxxxl">
			<If
				condition={collection.presalePrice !== '-1'}
				then={
					<If
						condition={collection.presaleStartTime > Date.now() / 1000}
						then={
							<DashboardCard
								Icon={Timer}
								text="Pre-sale goes live in"
								data={`${collection.presaleStartTime}`}
								editable="time"
								showModal={showModal}
								setShowModal={setShowModal}
								admin={collection.adminAddress}
								timeType="presale"
							/>
						}
						else={
							<DashboardCard
								Icon={Timer}
								text="Pre-Sale"
								status={collection.saleStartTime > Date.now() / 1000 ? 'Live' : 'Ended'}
								editable="status"
								showModal={showModal}
								setShowModal={setShowModal}
								admin={collection.adminAddress}
							/>
						}
					/>
				}
			/>
			<If
				condition={collection.presaleStartTime > Date.now() / 1000 || collection.saleStartTime > Date.now() / 1000}
				then={
					<DashboardCard
						Icon={Timer}
						text="Public-sale goes live in"
						data={`${collection.saleStartTime}`}
						editable="time"
						admin={collection.adminAddress}
						timeType="sale"
					/>
				}
				else={
					<DashboardCard
						Icon={Timer}
						admin={collection.adminAddress}
						text="Sale"
						status={
							collection.saleStartTime < Date.now() / 1000 && !collection.paused
								? 'Live'
								: collection.paused
								? 'Paused'
								: 'Ended'
						}
						data={`${collection.saleStartTime}`}
						editable="status"
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				}
			/>
			<DashboardCard
				Icon={ImageSquare}
				text="NFTs sold"
				data={
					collection.collectionName === 'CollectionA'
						? `${collection.totalSupply - parseInt(collection.reservedTokens)}`
						: `${collection.totalSupply}`
				}
			/>
			<DashboardCard
				Icon={ImageSquare}
				text="NFTs remaining"
				data={
					collection.collectionName === 'CollectionA'
						? `${parseInt(collection.maxTokens) - collection.totalSupply}`
						: `${parseInt(collection.maxTokens) - collection.totalSupply - parseInt(collection.reservedTokens)}`
				}
			/>
			<DashboardCard
				Icon={CurrencyEth}
				text="Funds Collected"
				data={`${collection.totalFunds} ${getUnitByChainId(user.network.chain)}`}
			/>
			<DashboardCard
				Icon={ImageSquare}
				text="Reserved Tokens remaining"
				data={`${collection.reservedTokensCount.length}`}
			/>
		</Box>
	);
};

export default SalesSection;
