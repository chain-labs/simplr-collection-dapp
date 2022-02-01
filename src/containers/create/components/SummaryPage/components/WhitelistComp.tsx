import { X } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector } from 'src/redux/sales';

const WhitelistComp = () => {
	const whiteList = useAppSelector(presaleWhitelistSelector);
	const [empty, setEmpty] = useState(false); // Checks if search result is empty
	const [searchInput, setSearchInput] = useState('');
	return (
		<Box
			mx="auto"
			bg="white"
			height="32rem"
			width="65rem"
			column
			mt="mxxxl"
			overflowY="scroll"
			css={`
				::-webkit-scrollbar {
					width: 4px;
				}

				::-webkit-scrollbar-track {
					display: none;
				}
				::-webkit-scrollbar-button {
					height: 40px;
				}

				::-webkit-scrollbar-thumb {
					border-radius: 10px;
					background-color: #dcdce5;
				}
			`}
		>
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
						<Box row key={address.substr(-4)} mb="mxl" between color="simply-gray">
							<Box row>
								<Text as="h4" width="4.4rem">{`${index + 1}.`}</Text>
								<Text as="h4">{address}</Text>
							</Box>
							<Text as="h4" color="simply-gray" textAlign="end" cursor="not-allowed">
								Remove
							</Text>
						</Box>
					))}
				/>
			</Box>
		</Box>
	);
};

export default WhitelistComp;
