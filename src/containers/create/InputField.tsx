import { ethers } from 'ethers';
import { Check, Cube, WarningCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { setCollectionDetails } from 'src/redux/collection';
import { useAppDispatch } from 'src/redux/hooks';
import { setValidation } from 'src/redux/validation';
import theme from 'src/styleguide/theme';

export interface InputFieldProps {
	label?: string;
	placeholder?: string;
	helper?: string;
	errorMessage?: string;
	required?: boolean;
	blockchain?: boolean;
	type?: 'address' | 'email' | 'price' | 'url' | 'text';
	disabled?: boolean;
	value?: string | number;
	width?: string;
	idx: number;
}

const InputField = ({
	width,
	label,
	required,
	blockchain,
	helper,
	errorMessage,
	value,
	placeholder,
	idx,
}: InputFieldProps) => {
	const [input, setInput] = useState(value);
	const [error, setError] = useState(false);
	const dispatch = useAppDispatch();

	const setValidationError = () => {
		dispatch(setValidation({ collection: false }));
	};

	useEffect(() => {
		setError(false);
	}, [input]);

	const handleBlur = (e) => {
		switch (idx) {
			case 1: {
				if (!ethers.utils.isAddress(input.toString())) {
					setError(true);
					setValidationError();
				} else {
					setError(false);
				}
				dispatch(setCollectionDetails({ admin: input }));
				break;
			}
			case 2: {
				if (input.toString().length < 1) {
					setError(true);
					setValidationError();
				} else {
					setError(false);
					setValidationError();
				}
				dispatch(setCollectionDetails({ name: input }));
				break;
			}
			case 3: {
				dispatch(setCollectionDetails({ symbol: input }));
				break;
			}
			case 4: {
				dispatch(setCollectionDetails({ website_url: input }));
				break;
			}
			case 5: {
				dispatch(setCollectionDetails({ email: input }));
				break;
			}
			case 6: {
				dispatch(setCollectionDetails({ collection_metadata: input }));
				break;
			}
			case 7: {
				dispatch(
					setCollectionDetails({
						delay_reveal: {
							enabled: true,
							metadata_uri: input,
						},
					})
				);
				break;
			}
		}
	};

	return (
		<Box width={width}>
			<Box between mb="mxs" alignItems="center">
				<Text as="h6" color="gray-50">
					{label}
					{required && <span style={{ color: theme.colors['red-40'] }}>*</span>}
				</Text>
				<If condition={blockchain} then={<Cube color={theme.colors['blue-30']} size={16} />} />
			</Box>
			<Box position="relative" row alignItems="center">
				<Box
					as="input"
					width="100%"
					bg="gray-10"
					border="0.5px solid"
					borderColor="blue-20"
					px="mm"
					py="ms"
					boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
					borderRadius="4px"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onBlur={handleBlur}
					placeholder={placeholder}
					fontSize="16px"
					lineHeight="150%"
					letterSpacing="-0.25px"
					fontFamily="OpenSauceOneRegular"
					css={`
						&::placeholder {
							color: ${theme.colors['gray-30']};
						}
					`}
				/>
				<If
					condition={value && error}
					then={
						<Box position="absolute" right="12px">
							<WarningCircle color={theme.colors['red-40']} size={24} />
						</Box>
					}
				/>
				<If
					condition={value && !error}
					then={
						<Box position="absolute" right="12px">
							<Check color={theme.colors['green-40']} size={24} />
						</Box>
					}
				/>
			</Box>
			<Box mt="mxs">
				<Text as="b3" color={error && value ? 'red-40' : 'gray-30'}>
					{error && value ? errorMessage : helper}
				</Text>
			</Box>
		</Box>
	);
};

export default InputField;
