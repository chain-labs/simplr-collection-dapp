import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { editSelector } from 'src/redux/edit';
import { useAppSelector } from 'src/redux/hooks';

const Step4Modal = ({ value }: { value?: string; gas?: string }) => {
	const modalData = useAppSelector(editSelector);

	return (
		<Box>
			<Text as="h4" mb="ms" fontFamily="Switzer">
				{modalData.label}
			</Text>
			<hr />
			<Text as="h6" mt="mxxl" color="#52575C" fontFamily="Switzer">
				Successfully changed the {modalData.label}. Changes have been reflected on your dashboard.
			</Text>
			<If
				condition={
					!(modalData.editable === 'Live' || modalData.editable === 'Paused' || modalData.editfield === 'Reveal')
				}
				then={
					<Box mt="mm">
						<Text
							as="c1"
							color="gray-00"
							fontFamily="Open Sauce One"
							display={modalData.editable === 'address' ? '' : 'flex'}
						>
							OLD {modalData.label.toUpperCase()} :{' '}
							<Text as="c1" color="simply-blue">
								{modalData.data}
							</Text>
						</Text>
						<Text as="c1" color="gray-00" mt="mxxs" display={modalData.editable === 'address' ? '' : 'flex'}>
							NEW {modalData.label.toUpperCase()} :{' '}
							<Text as="c1" color="simply-blue">
								{value}
							</Text>
						</Text>
					</Box>
				}
			/>
		</Box>
	);
};

export default Step4Modal;
