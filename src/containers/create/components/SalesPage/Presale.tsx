import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addWhitelist, presaleableToggleSelector, togglePresale } from 'src/redux/sales';
import { getUnit } from '..';
import WhitelistModal from './WhitelistModal';

const Presale = ({ unit }: { unit: number }) => {
	const checked = useAppSelector(presaleableToggleSelector);
	const [isChecked, setIsChecked] = useState(checked);
	const [showWhitelistModal, setShowWhitelistModal] = useState(false);

	const [presaleReservedTokens, setPresaleReservedTokens] = useState<number>();
	const [presalePrice, setPresalePrice] = useState<number>();
	const [presaleMaxHolding, setPresaleMaxHolding] = useState<number>();
	const [whitelist, setWhitelist] = useState<string>();
	const [presaleStartTime, setPresaleStartTime] = useState<number>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isChecked !== checked) dispatch(togglePresale(isChecked));
	}, [isChecked]);

	const handleAdd = () => {
		const valid = ethers.utils.isAddress(whitelist);
		if (!valid) {
			toast.error(`Invalid address`);
			setWhitelist('');
		} else {
			try {
				dispatch(addWhitelist(whitelist));
				setWhitelist('');
				toast.success(`Added to whitelist`);
			} catch (error) {
				toast.error(`Failed to add to whitelist`);
			}
		}
	};

	return (
		<Box overflow="visible">
			<WhitelistModal visible={showWhitelistModal} setVisible={setShowWhitelistModal} />
			<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
				Pre-sale
				<Box ml="mxxxl" />
				<Toggle value={isChecked} setValue={setIsChecked} mobile />
			</Text>
			<If
				condition={isChecked}
				then={
					<Box mt="wxs" overflow="visible">
						<LabelledTextInput
							type="number"
							min="1"
							label="Maximum NFTs allowed to sell during pre-sale"
							required
							placeholder="eg. 500"
							value={presaleReservedTokens}
							setValue={setPresaleReservedTokens}
						/>
						<Box mt="mxxxl" />
						<LabelledTextInput
							type="number"
							step="0.01"
							min="0.01"
							unit={unit ? getUnit(unit) : 'ETH'}
							label="Price per NFT (Presale)"
							required
							placeholder="eg. 0.08"
							value={presalePrice}
							setValue={setPresalePrice}
						/>
						<Box mt="mxxxl" />
						<LabelledTextInput
							type="number"
							min="1"
							label="Maximum NFTs allowed to buy per user during pre-sale"
							required
							placeholder="eg. 2"
							value={presaleMaxHolding}
							setValue={setPresaleMaxHolding}
						/>
						<Box mt="mxxxl" />
						<Box column overflow="visible">
							<LabelledTextInput
								label="Whitelist address"
								helperText="Adding whitelists is optional and will make the pre-sale exclusive for the addded addresses."
								placeholder="0x...abc"
								type="text"
								width="100%"
								value={whitelist}
								setValue={setWhitelist}
								disableValidation
							/>
							<Box mt="mm" alignSelf="flex-end">
								<ButtonComp bg="tertiary" height="40px" px="ml" onClick={() => setShowWhitelistModal(true)}>
									View Whitelist
								</ButtonComp>
								<ButtonComp bg="primary" height="40px" px="ml" ml="mm" disable={!whitelist} onClick={handleAdd}>
									Add
								</ButtonComp>
							</Box>
						</Box>
						<Box mt="mxxxl" />
						<LabelledTextInput label="Pre-Sale Launch" required>
							<DateTime value={presaleStartTime} setValue={setPresaleStartTime} />
						</LabelledTextInput>
					</Box>
				}
				else={
					<Text as="b1" color="simply-gray" mt="mm">
						Would you like to conduct a pre-sale for whitelisted addresses?
					</Text>
				}
			/>
		</Box>
	);
};

export default Presale;
