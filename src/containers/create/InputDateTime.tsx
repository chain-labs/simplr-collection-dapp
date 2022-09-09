import { ethers } from 'ethers';
import { Check, Cube, WarningCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { setCollectionDetails } from 'src/redux/collection';
import { useAppDispatch } from 'src/redux/hooks';
import { setValidation } from 'src/redux/validation';
import { timezones } from 'src/utils/timezones';
import theme from 'src/styleguide/theme';
import { DateType } from 'src/redux/pricing/types';
import Dropdown from 'src/components/Dropdown';
import { setPresaleDetails, setPricingDetails } from 'src/redux/pricing';

export interface InputFieldProps {
	label?: string;
	placeholder?: string;
	helper?: string;
	errorMessage?: string;
	required?: boolean;
	blockchain?: boolean;
	type?: 'address' | 'email' | 'price' | 'url' | 'text';
	disabled?: boolean;
	value?: DateType;
	width?: string;
}

const InputDateTime = ({ width, label, required, blockchain, helper, errorMessage, value }: InputFieldProps) => {
	const [date, setDate] = useState(value?.date ?? '');
	const [time, setTime] = useState(value?.time ?? '');
	const [timezone, setTimezone] = useState(value?.timezone ?? 'GMT');
	const [error, setError] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setTimezone(timezone);
		dispatch(
			setPresaleDetails({
				startTime: {
					date,
					time,
					timezone,
				},
			})
		);
	}, [date, time, timezone]);

	useEffect(() => {
		if (value?.timezone) {
			setTimezone(value?.timezone);
		} else {
			const now = new Date().toString();
			const timezone = now.split(' ')[5];
			setTimezone(`${timezone.substring(0, 6)}:${timezone.substr(-2)}`);
		}
	}, []);

	return (
		<Box width={width}>
			<Box between mb="mxs" alignItems="center">
				<Text as="h6" color="gray-50">
					{label}
					{required && <span style={{ color: theme.colors['red-40'] }}>*</span>}
				</Text>
				<If condition={blockchain} then={<Cube color={theme.colors['blue-30']} size={16} />} />
			</Box>
			<Box>
				<Box display="grid" gridTemplateColumns="1fr 1fr" gridGap="mxl" mb="ms">
					<Input type="date" placeholder="DD/MM/YYYY" />
					<Input type="time" placeholder="HH:MM AM/PM" />
				</Box>
				<Dropdown data={timezones} bg="gray-10" value={timezone} setValue={setTimezone} width="64rem" />
			</Box>
			<Box mt="mxs">
				<Text as="b3" color={error && value ? 'red-40' : 'gray-40'}>
					{error && value ? errorMessage : helper}
				</Text>
			</Box>
		</Box>
	);
};

export default InputDateTime;

export const Input = ({ type, ...props }) => {
	return (
		<Box
			as="input"
			type="text"
			onFocus={(e) => (e.target.type = type)}
			bg="gray-10"
			border="1px solid"
			borderColor="blue-20"
			boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
			borderRadius="4px"
			px="mm"
			py="ms"
			fontSize="16px"
			lineHeight="150%"
			letterSpacing="-0.25px"
			fontFamily="OpenSauceOneRegular"
			css={`
				&::placeholder {
					color: ${theme.colors['gray-30']};
				}
			`}
			{...props}
		/>
	);
};
