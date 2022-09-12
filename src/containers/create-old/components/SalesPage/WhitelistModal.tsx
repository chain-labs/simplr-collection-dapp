import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { allowListSelector } from 'src/redux/pricing';
import { X } from 'phosphor-react';
import If from 'src/components/If';

interface Props {
	visible: boolean;
	setVisible: (boolean) => void;
	readOnly?: boolean;
	admin?: boolean;
	handleWhitelistRemove?: (any) => any;
}

const WhitelistModal = ({ visible, setVisible }: Props) => {
	const whiteList = useAppSelector(allowListSelector);
	const [empty, setEmpty] = useState(false); // Checks if search result is empty
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const arr = whiteList.list.filter((item) => item.includes(searchInput));
		if (arr.length === 0) {
			setEmpty(true);
		} else {
			setEmpty(false);
		}
	}, [searchInput]);

	if (visible) {
		return (
			<Modal visible={visible}>
				<Box
					mx="auto"
					bg="simply-white"
					height="80vh"
					width="67rem"
					borderRadius="16px"
					p="mxxxl"
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					column
				>
					<Box position="absolute" right="32px" onClick={() => setVisible(false)} cursor="pointer">
						<X size="24px" />
					</Box>
					<Text as="h2" color="simply-blue" mb="ms">
						Whitelist addresses:
					</Text>
					<TextInput
						type="search"
						placeholder="Search Wallet Address"
						value={searchInput}
						setValue={setSearchInput}
						width="100%"
						disableValidation
					/>
					<Box mt="mxxxl" />
					<Box>
						<If
							condition={searchInput.length > 0}
							then={
								<If
									condition={empty}
									then={
										<Text as="h4" color="red-50">
											Address does not exist.
										</Text>
									}
									else={whiteList?.list
										.filter((address) => address.includes(searchInput))
										?.map((address, index) => (
											<Box row key={address.substr(-4)} mb="mxl" between>
												<Box row>
													<Text as="h4" width="4.4rem">{`${index + 1}.`}</Text>
													<Text as="h4">{address}</Text>
												</Box>
											</Box>
										))}
								/>
							}
							else={whiteList.list.map((address, index) => (
								<Box row key={address.substr(-4)} mb="mxl" between>
									<Box row>
										<Text as="h4" width="4.4rem">{`${index + 1}.`}</Text>
										<Text as="h4">{address}</Text>
									</Box>
								</Box>
							))}
						/>
					</Box>
				</Box>
			</Modal>
		);
	}
	return <></>;
};

export default WhitelistModal;
