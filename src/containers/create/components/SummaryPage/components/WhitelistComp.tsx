import { X } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector } from 'src/redux/sales';

const WhitelistComp = ({ setVisible }) => {
	const whiteList = useAppSelector(presaleWhitelistSelector);
	const [empty, setEmpty] = useState(false); // Checks if search result is empty
	const [searchInput, setSearchInput] = useState('');
	return (
		<Box
			mx="auto"
			bg="pink"
			height="80vh"
			width="67rem"
			borderRadius="16px"
			p="mxxxl"
			position="relative"
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
							else={whiteList
								?.filter((address) => address.includes(searchInput))
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
					else={whiteList.map((address, index) => (
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
	);
};

export default WhitelistComp;
