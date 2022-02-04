import React from 'react';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';

const Step3Modal = () => {
	const modalData = useAppSelector(editSelector);

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				{modalData.label}
			</Text>
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Successfully changed the {modalData.label}. Changes have been reflected on your dashboard.
			</Text>

			<Box mt="mm" />
			<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex">
				OLD {modalData.label.toUpperCase()} :{' '}
				{modalData.editable === 'address' ? (
					<Text as="c1" color="simply-blue">
						{modalData.data.slice(0, 4)}...{modalData.data.slice(38, 42)}
					</Text>
				) : (
					<Text as="c1" color="simply-blue">
						{modalData.data}
					</Text>
				)}
			</Text>
			<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex" mt="mxxs">
				NEW {modalData.label.toUpperCase()} :{' '}
				{modalData.editable === 'address' ? (
					<Text as="c1" color="simply-blue">
						{modalData.data.slice(0, 4)}...{modalData.data.slice(38, 42)}
					</Text>
				) : (
					<Text as="c1" color="simply-blue">
						{modalData.data}
					</Text>
				)}
			</Text>

			<Text as="c1" color="gray-00" fontFamily="Open Sauce One" display="flex" mt="mm">
				GAS COST :{' '}
				<Text as="c1" color="simply-blue">
					0.0001 ETH or 1 USD.
				</Text>
			</Text>
		</Box>
	);
};

export default Step3Modal;
