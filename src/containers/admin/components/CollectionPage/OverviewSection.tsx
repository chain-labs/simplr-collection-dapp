import { CurrencyEth, ImageSquare, Timer, User } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';
import DashboardCard from './DashboardCard';
import { CollectionSectionProps } from './SalesSection';

export interface IAdminCollection {
	collectionName: string;
	maxTokens: string;
	adminAddress: string;
	reservedTokens: string;
	reservedTokensCount: number[];
	price: string;
	presalePrice: string;
	totalSupply: number;
	tokensCount: string;
	totalFunds: string;
	saleStartTime: number;
	presaleStartTime: number;
	paused: string;
	projectURI: string;
	revealed: boolean;
}

const OverviewSection = ({ collection, showModal, setShowModal }: CollectionSectionProps) => {
	const [edit, setEdit] = useState('');
	const user = useAppSelector(userSelector);

	return (
		<Box row flexWrap="wrap" between mt="mxxxl">
			<DashboardCard Icon={ImageSquare} text="Total NFTs" data={collection.maxTokens} />
			<DashboardCard
				Icon={User}
				text="Admin Wallet Address"
				data={collection.adminAddress}
				editable="address"
				type="string"
				setShowModal={setShowModal}
				showModal={showModal}
				edit={edit}
				setEdit={setEdit}
				placeholder="new_admin_address"
				editfield="wallet address"
				admin={collection.adminAddress}
			/>
			<If
				condition={parseInt(collection.reservedTokens) > 0}
				then={
					<DashboardCard
						Icon={ImageSquare}
						text="Reserved Tokens"
						data={collection.reservedTokens}
						editable={parseInt(collection.tokensCount) < 1 ? 'number' : null}
						type="number"
						setShowModal={setShowModal}
						showModal={showModal}
						edit={edit}
						setEdit={setEdit}
						placeholder="Reserved Tokens"
						editfield="reserve tokens"
						admin={collection.adminAddress}
					/>
				}
			/>
			<If
				condition={collection.presalePrice !== '-1'}
				then={
					<DashboardCard
						Icon={CurrencyEth}
						text="Price per NFT (Pre-sale)"
						data={`${collection.presalePrice} ${getUnitByChainId(user.network.chain)}`}
					/>
				}
			/>
			{!collection.revealed ? (
				<DashboardCard
					Icon={Timer}
					text="Reveal NFTS"
					editfield="Reveal"
					showModal={showModal}
					type="url"
					setShowModal={setShowModal}
					placeholder="https://"
					data={collection.projectURI}
				/>
			) : (
				''
			)}
			<DashboardCard
				Icon={CurrencyEth}
				text="Price per NFT (Public sale)"
				data={`${collection.price} ${getUnitByChainId(user.network.chain)}`}
			/>
		</Box>
	);
};

export default OverviewSection;
