import { Check, Cube, WarningCircle } from 'phosphor-react';
import React, { useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useAppDispatch } from 'src/redux/hooks';
import { setPresaleDetails, setPricingDetails, setSaleDetails } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';

interface Props {
	label?: string;
	helper?: string;
	placeholder?: string;
	value: number;
	width?: string;
	required?: boolean;
	blockchain?: boolean;
	errorHelper?: string;
	idx: number;
	type?: 'number' | 'price';
	disabled?: boolean;
	max?: number;
	min?: number;
	step?: number;
}

const InputNumber = ({
	label,
	helper,
	placeholder,
	max,
	min,
	step,
	value,
	width,
	required,
	blockchain,
	errorHelper,
	idx,
	disabled,
}: Props) => {
	const [input, setInput] = useState<string>(value?.toString());
	const [error, setError] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleBlur = (e) => {
		switch (idx) {
			case 1: {
				dispatch(setPricingDetails({ totalSupply: input }));
				break;
			}
			case 2: {
				dispatch(setPricingDetails({ reserve_NFTs: input }));
				break;
			}
			case 3: {
				dispatch(
					setPresaleDetails({
						maxTokens: input,
					})
				);
				break;
			}
			case 4: {
				dispatch(
					setPresaleDetails({
						price: input,
					})
				);
				break;
			}
			case 5: {
				dispatch(
					setPresaleDetails({
						perWallet: input,
					})
				);
				break;
			}
			case 6: {
				dispatch(setPresaleDetails({ perSale: input }));
				break;
			}
			case 7: {
				dispatch(
					setSaleDetails({
						price: input,
					})
				);
				break;
			}
			case 8: {
				dispatch(
					setSaleDetails({
						perWallet: input,
					})
				);
				break;
			}
			case 9: {
				dispatch(
					setSaleDetails({
						perSale: input,
					})
				);
				break;
			}
			case 10: {
				break;
			}
		}
	};

	return (
		<Box width={width}>
			<Box between mb="mxs" alignItems="center" width="50%">
				<Text as="h6" color="gray-50">
					{label}
					{required && <span style={{ color: theme.colors['red-40'] }}>*</span>}
				</Text>
				<If condition={blockchain} then={<Cube color={theme.colors['blue-30']} size={16} />} />
			</Box>
			<Box position="relative" row alignItems="center" width="50%">
				<Box
					as="input"
					type="number"
					max={max}
					min={min}
					step={step}
					width="100%"
					bg="gray-10"
					border="0.5px solid"
					borderColor="blue-20"
					px="mm"
					py="ms"
					boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
					borderRadius="4px"
					value={disabled ? value : input}
					onChange={(e) => setInput(e.target.value)}
					onWheel={(e) => e.target.blur()}
					onBlur={handleBlur}
					placeholder={placeholder}
					disabled={disabled}
					fontSize="16px"
					lineHeight="150%"
					letterSpacing="-0.25px"
					fontFamily="OpenSauceOneRegular"
					css={`
						&::placeholder {
							color: ${theme.colors['gray-30']};
						}
						&:disabled {
							cursor: not-allowed;
							background-color: ${theme.colors['gray-20']};
						}
					`}
				/>
				<If
					condition={value && error && !disabled}
					then={
						<Box position="absolute" right="12px">
							<WarningCircle color={theme.colors['red-40']} size={24} />
						</Box>
					}
				/>
				<If
					condition={value && !error && !disabled}
					then={
						<Box position="absolute" right="12px">
							<Check color={theme.colors['green-40']} size={24} />
						</Box>
					}
				/>
			</Box>
			<Box mt="mxs">
				<Text as="b3" color={error && value ? 'red-40' : idx > 2 ? 'gray-40' : 'gray-30'}>
					{error && value ? errorHelper : helper}
				</Text>
			</Box>
		</Box>
	);
};

export default InputNumber;
