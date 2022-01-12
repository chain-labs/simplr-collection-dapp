import React from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';

const Button = () => {
	return (
		<Box display="flex" justifyContent="space-evenly">
			<Box display="flex" flexDirection="column" mt="mxxl">
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					32
					<ButtonComp bg="primary" px="12px" mx="mxxs" height="33px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="12px" mx="mxxs" height="32px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="32px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="32px" active={false}>
						<Text>Action</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					36
					<ButtonComp bg="primary" px="12px" mx="mxxs" height="36px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="12px" mx="mxxs" height="36px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="36px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="36px" active={false}>
						<Text>Action</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					40
					<ButtonComp bg="primary" px="12px" mx="mxxs" height="40px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="12px" mx="mxxs" height="40px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="40px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="40px" active={false}>
						<Text>Action</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					48
					<ButtonComp bg="primary" px="24px" mx="mxxs" height="48px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="24px" mx="mxxs" height="48px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="24px" mx="mxxs" height="48px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="24px" mx="mxxs" height="48px" active={false}>
						<Text>Action</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					56
					<ButtonComp bg="primary" px="32px" mx="mxxs" height="56px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="32px" mx="mxxs" height="56px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="32px" mx="mxxs" height="56px" active={true}>
						<Text>Action</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="32px" mx="mxxs" height="56px" active={false}>
						<Text>Action</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Box>
	);
};

export default Button;
