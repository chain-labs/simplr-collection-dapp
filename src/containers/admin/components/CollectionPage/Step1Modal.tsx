import React, { useState } from 'react';
import Box from 'src/components/Box';
import DateTime from 'src/components/DateTime';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';

const Step1Modal = ({ value, setValue }) => {
	const modalData = useAppSelector(editSelector);

	return (
		<Box>
			<Text as="b3" fontWeight="medium" mb="ms">
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
			<Text as="c1" color="gray-00" fontFamily="Open Sauce One">
				OLD DATA : {modalData.data}
			</Text>
			<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex">
				ESTIMATED GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					0.0001 ETH or 1 USD.
				</Text>
			</Text>
		</Box>
	);
};

export default Step1Modal;
