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
}

const DateTime = ({ value, setValue, disabled, disableValidation }: props) => {
	const [date, setDate] = useState(value?.date ?? '');
	const [time, setTime] = useState(value?.time ?? '');
	const [timezone, setTimezone] = useState(
		value?.timezone ?? '(GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London'
	);

	useEffect(() => {
		setTimezone(timezone);
		setValue({
			date,
			time,
			timezone,
		});
	}, [date, time, timezone, setValue]);

	return (
		<Box overflowX="visible" overflowY="visible">
			<Box overflow="visible" between width="64rem" mb="mxxs">
				<TextInput
					placeholder="DD/MM/YYYY"
					type="date"
					value={date}
					setValue={setDate}
					width="30rem"
					required
					{...{ disabled, disableValidation }}
				/>
				<TextInput
					placeholder="hh:mm:ss AM/PM"
					type="time"
					step="1"
					value={time}
					setValue={setTime}
					width="30rem"
					required
					{...{ disabled, disableValidation }}
				/>
			</Box>
			<Dropdown data={timezones} value={timezone} setValue={setTimezone} width="64rem" disabled />
		</Box>
	);
};

export default DateTime;
