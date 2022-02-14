import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

const RoyaltyEditModal = ({ visible, setVisible, data, setData, address, percentage }) => {
	const [royalty, setRoyalty] = useState({ account: '', value: 0 });

	useEffect(() => {
		setRoyalty(data);

		return () => {
			setRoyalty({ account: '', value: 0 });
		};
	}, [data]);

	if (!visible) return null;
	return ReactDom.createPortal(
		<Modal visible={visible}>
			<Box className="absolute-center" bg="white" borderRadius="16px" p="mxl" maxWidth="38rem">
				<Text as="h4">Updated Royalties</Text>
				<Box height="0.1rem" bg={`${theme.colors['simply-black']}33`} width="100%" my="mxl" />
				<Box mb="mxl">
					<Text as="h6" mb="mm">
						Successfully updated the royalties. Changes might take a while to reflect on your dashboard.
					</Text>
					<Box>
						<Text as="c1" color="gray-00">
							OLD ROYALTY ADDRESS
						</Text>
						<Text as="c3" color="simply-blue">
							{royalty.account}
						</Text>
						<Text as="c1" color="gray-00" mt="mxxs" row alignItems="center">
							OLD ROYALTY PERCENTAGE
							<Text as="c3" color="simply-blue" ml="mxxs">
								{royalty.value}%
							</Text>
						</Text>
					</Box>
					<Box>
						<Text as="c1" color="gray-00">
							NEW ROYALTY ADDRESS
						</Text>
						<Text as="c3" color="simply-blue">
							{address}
						</Text>
						<Text as="c1" color="gray-00" mt="mxxs" row alignItems="center">
							NEW ROYALTY PERCENTAGE
							<Text as="c3" color="simply-blue" ml="mxxs">
								{percentage}%
							</Text>
						</Text>
					</Box>
				</Box>
				<ButtonComp
					bg="primary"
					width="100%"
					height="40px"
					onClick={() => {
						setVisible(false);
						setData({ account: address, value: percentage });
					}}
				>
					Return to Dashboard
				</ButtonComp>
			</Box>
		</Modal>,
		document.getElementById('portal')
	);
};

export default RoyaltyEditModal;
