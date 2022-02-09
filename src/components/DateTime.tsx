import { useEffect, useState } from 'react';
import Box from './Box';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import { timezones } from 'src/utils/timezones';
import { DateType } from 'src/redux/sales/types';

interface props {
	value: DateType;
	disabled?: boolean;
	disableValidation?: boolean;
	setValue?: (DateType) => void;
	width?: string;
}

const DateTime = ({ value, setValue, disabled, disableValidation, width }: props) => {
	const [date, setDate] = useState(value?.date ?? '');
	const [time, setTime] = useState(value?.time ?? '');
	const [timezone, setTimezone] = useState(value?.timezone ?? 'GMT');

	useEffect(() => {
		setTimezone(timezone);
		setValue({
			date,
			time,
			timezone,
		});
	}, [date, time, timezone, setValue]);

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
		<Box overflowX="visible" overflowY="visible">
			<Box overflow="visible" between width={width} mb="mxxs">
				<TextInput
					placeholder="DD/MM/YYYY"
					type="date"
					value={date}
					setValue={setDate}
					width="32rem"
					required
					{...{ disabled, disableValidation }}
				/>
				<TextInput
					placeholder="hh:mm:ss AM/PM"
					type="time"
					step="1"
					value={time}
					setValue={setTime}
					width="31rem"
					required
					{...{ disabled, disableValidation }}
				/>
			</Box>
			<Dropdown
				data={disabled ? [] : timezones}
				value={timezone}
				setValue={setTimezone}
				width="64rem"
				{...{ disabled }}
			/>
		</Box>
	);
};

export default DateTime;
