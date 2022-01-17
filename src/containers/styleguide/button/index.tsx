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
					<ButtonComp bg="primary" px="12px" mx="mxxs" height="33px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="12px" mx="mxxs" height="32px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="32px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="32px" disable>
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					36
					<ButtonComp bg="primary" px="12px" mx="mxxs" height="36px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="12px" mx="mxxs" height="36px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="36px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="36px" disable>
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					40
					<ButtonComp bg="primary" px="12px" mx="mxxs" height="40px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="12px" mx="mxxs" height="40px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="40px">
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="12px" mx="mxxs" height="40px" disable>
						<Text as="h6" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					48
					<ButtonComp bg="primary" px="24px" mx="mxxs" height="48px">
						<Text as="h5" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="24px" mx="mxxs" height="48px">
						<Text as="h5" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="24px" mx="mxxs" height="48px">
						<Text as="h5" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="24px" mx="mxxs" height="48px" disable>
						<Text as="h5" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
				</Box>
				<Box display="flex" justifyContent="flex-start" mb="mxl">
					56
					<ButtonComp bg="primary" px="32px" mx="mxxs" height="56px">
						<Text as="h4" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="secondary" px="32px" mx="mxxs" height="56px">
						<Text as="h4" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="32px" mx="mxxs" height="56px">
						<Text as="h4" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
					<ButtonComp bg="tertiary" px="32px" mx="mxxs" height="56px" disable>
						<Text as="h4" fontFamily="Switzer">
							Action
						</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Box>
	);
};

export default Button;
