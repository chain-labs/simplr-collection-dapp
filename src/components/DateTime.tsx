import { useEffect, useState } from 'react';
import Box from './Box';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import { timezones } from 'src/utils/timezones';

const DateTime = ({ value, setValue }) => {
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [timezone, setTimezone] = useState('(GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London');

	useEffect(() => {
		setTimezone(timezone);

		const label = timezone?.split(' ')[0];

		setValue(
			Date.parse(
				`${date} ${time} ${label?.substring(1, label.length - 1) ?? `GMT${new Date().toString().split('GMT')[1]}`}`
			) / 1000
		);
	}, [date, time, value, timezone, setValue]);

	return (
		<Box overflowX="visible" overflowY="visible">
			<Box overflow="visible" between width="64rem">
				<TextInput placeholder="DD/MM/YYYY" type="date" value={date} setValue={setDate} width="30rem" />
				<TextInput placeholder="hh:mm:ss AM/PM" type="time" step="1" value={time} setValue={setTime} width="30rem" />
			</Box>
			<Dropdown data={timezones} value={timezone} setValue={setTimezone} width="64rem" />
		</Box>
	);
};

export default DateTime;
