import { ethers } from 'ethers';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';

interface Props {
	payees: string[];
	shares: number[];
	simplrShares: number;
}

const BeneficiaryInfo = ({ payees, shares, simplrShares }: Props) => {
	const getShare = (share) => {
		const shares = parseFloat(ethers.utils.formatUnits(share, 16));
		if (shares > 0.01) return shares;
		else return 0;
	};

	return (
		<Box width="55.2rem">
			<Box between mb="mm">
				<Text as="h6">Beneficiaries</Text>
			</Box>
			<Box row overflow="visible" mb="ms">
				<TextInput value="Simplr" type="text" width="45.2rem" disabled disableValidation fontSize="1.4rem" />
				<Box ml="mxs" />
				<TextInput
					value={`${getShare(simplrShares)}%`}
					type="text"
					width="9.2rem"
					disabled
					disableValidation
					fontSize="1.4rem"
				/>
			</Box>
			{payees.slice(0, payees.length - 1).map((payee, index) => (
				<Box row overflow="visible" mb="ms" key={payee.substr(-4)}>
					<TextInput
						value=""
						placeholder={payee}
						type="text"
						width="45.2rem"
						fontSize="1.4rem"
						disableValidation
						disabled
					/>
					<Box ml="mxs" />
					<TextInput
						value={undefined}
						placeholder={`${shares[index]}%`}
						type="number"
						width="9.2rem"
						disableValidation
						fontSize="1.4rem"
						disabled
					/>
				</Box>
			))}
			<Box mt="mxxl" />
		</Box>
	);
};

export default BeneficiaryInfo;
