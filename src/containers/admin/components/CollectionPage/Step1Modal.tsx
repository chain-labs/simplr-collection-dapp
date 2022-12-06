import { Question } from 'phosphor-react';
import { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/user';
import { getUnitByChainId } from 'src/utils/chains';

const Step1Modal = ({ value, setValue, gas }) => {
	const modalData = useAppSelector(editSelector);
	const currentNetwork = useAppSelector(networkSelector);
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<Box>
			<If
				condition={modalData.editfield === 'Reveal'}
				then={
					<Text as="b3" fontWeight="medium" mb="ms" fontFamily="Satoshi" row alignItems="center">
						Enter Collection URI
						<Box
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
							ml="mxs"
							center
							cursor="pointer"
							width="30px"
						>
							<Question color="simply-black" weight="fill" />
						</Box>
						<If
							condition={showTooltip}
							then={
								<Box
									overflow="visible"
									position="absolute"
									width="31rem"
									backgroundColor="#F6F6FF"
									padding="16px"
									borderRadius="12px"
									zIndex={25}
									mt="-10rem"
									ml="17rem"
									boxShadow="shadow-100"
									border="1px solid rgba(171, 171, 178, 0.3)"
								>
									<Text as="c1">Collection URI is the URL where your NFT media and metadata are stored.</Text>
								</Box>
							}
						/>
					</Text>
				}
				else={
					<Text as="b3" fontWeight="medium" mb="ms" fontFamily="Satoshi">
						Enter new {modalData.label.toLocaleLowerCase()}
					</Text>
				}
			/>
			<If
				condition={modalData.type === 'number'}
				then={
					<Box between>
						<TextInput
							type={modalData.type}
							placeholder={modalData.placeholder}
							value={modalData.placeholder}
							width="100%"
							disableValidation
							disabled
						/>
						<Box ml="mxs" />
						<TextInput
							type={modalData.type}
							placeholder={modalData.data}
							value={value}
							width="100%"
							setValue={setValue}
							disableValidation
						/>
					</Box>
				}
				else={
					<TextInput
						type={modalData.type}
						placeholder={modalData.placeholder}
						value={value}
						width="100%"
						setValue={setValue}
						disableValidation
					/>
				}
			/>

			<Box mt="mxxl" />
			<If
				condition={modalData.editfield !== 'Reveal'}
				then={
					<Text as="c1" color="gray-00">
						OLD DATA : {modalData.data}
					</Text>
				}
				else={<Text as="h6">Every change in the smart contract costs gas. Do you want to commit these changes?</Text>}
			/>
		</Box>
	);
};

export default Step1Modal;
