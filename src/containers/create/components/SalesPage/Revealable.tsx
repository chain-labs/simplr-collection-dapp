import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import Toggle from 'src/components/Toggle';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { revealableToggleSelector, toggleRevealable } from 'src/redux/sales';

const Revealable = () => {
	const checked = useAppSelector(revealableToggleSelector);
	const [isChecked, setIsChecked] = useState(checked);

	const [loadingUrl, setLoadingUrl] = useState<string>();
	const [revealableTime, setRevealableTime] = useState<number>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isChecked !== checked) dispatch(toggleRevealable(isChecked));
	}, [isChecked]);

	return (
		<Box overflow="visible">
			<Text as="h3" mb="mxs" color="simply-black" row alignItems="center">
				Make Project Revealable
				<Box ml="mxxxl" />
				<Toggle value={isChecked} setValue={setIsChecked} mobile />
			</Text>
			<Text as="b1" color="simply-gray" mt="mm">
				{isChecked
					? 'If you choose, you can reveal your NFT assets at a specific time.'
					: 'Would you like to reveal the NFTs at a specific time?'}
			</Text>
			<If
				condition={isChecked}
				then={
					<Box mt="wxs" overflow="visible">
						<LabelledTextInput label="Reveal Time" required>
							<DateTime value={revealableTime} setValue={setRevealableTime} />
						</LabelledTextInput>
						<Box mt="mxxxl" />
						<LabelledTextInput
							type="url"
							label="Loading Image URI"
							placeholder="https://"
							helperText="Placeholder image that will be displayed until the set reveal time."
							value={loadingUrl}
							setValue={setLoadingUrl}
							width="100%"
						/>
					</Box>
				}
			/>
		</Box>
	);
};

export default Revealable;