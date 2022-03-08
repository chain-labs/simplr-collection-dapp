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

	return (
		<Box>
			<Text as="b3" fontWeight="medium" mb="ms" fontFamily="Switzer">
				Enter new {modalData.label.toLocaleLowerCase()}
			</Text>
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
			<Text as="c1" color="gray-00">
				OLD DATA : {modalData.data}
			</Text>
			<Text as="c1" color="gray-00" display="flex">
				ESTIMATED GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					{gas ? `${gas} ${getUnitByChainId(currentNetwork.chain)}` : 'Fetching...'}
				</Text>
			</Text>
		</Box>
	);
};

export default Step1Modal;
