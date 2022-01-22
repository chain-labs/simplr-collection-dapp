import { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';
import Box from 'src/components/Box';
import Dropdown from 'src/components/Dropdown';
import InputSlider from 'src/components/InputSlider';
import LabelledInput from 'src/components/LabelledSelectInput';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextArea from 'src/components/TextArea';
import TextInput, { InputElement } from 'src/components/TextInput';
import theme from 'src/styleguide/theme';

const InputComponents = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [text, setText] = useState('');
	const [percentage, setPercentage] = useState(15);
	const [selectInput, setSelectInput] = useState('');
	const networks = ['Ethereum', 'Polygon', 'Solana'];
	const [dropdown, setDropdown] = useState<boolean>(false);
	const [date, setDate] = useState('');
	const [price, setPrice] = useState<number>(0);
	const [search, setSearch] = useState('');
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

	const unit = 'ETH';

	return (
		<Box px="wm" py="mm" display="grid" gridTemplateColumns="1fr 2fr" gridGap="mm">
			<Box gridColumn="span 2">
				<Text as="h1">Input Components</Text>
				<Box bg="black-10" height="2px" mb="mm" />
			</Box>
			<LabelledTextInput
				placeholder="Field Text"
				type="text"
				regexp=".{8,}"
				label="Textfield Default"
				value={name}
				setValue={setName}
				required
			/>

			<LabelledTextInput
				placeholder="Field Text"
				disabled
				type="text"
				label="Disabled Input Field"
				helperText="This input field is disabled"
				value={pass}
				setValue={setPass}
				required
			/>
			{/* <TimezoneSelect
				value={timezone}
				onChange={setTimezone}
			/> */}
			<Box gridRow="5" overflow="visible">
				<TextInput placeholder="Field Text" type="email" value={email} setValue={setEmail} required />
			</Box>
			<Box gridColumn="2" gridRow="2 / 6">
				<TextArea value={text} setValue={setText} />
			</Box>
			<Box gridColumn="2" gridRow="5 / 7" overflow="visible">
				<InputSlider value={percentage} setValue={setPercentage} max={100} min={0} />
				<Text as="h3">{percentage}</Text>
			</Box>
			<Dropdown
				setVisible={setDropdown}
				setValue={setSelectInput}
				visible={dropdown}
				value={selectInput}
				data={networks}
				label="Network"
				placeholder="Blockchain"
			/>
			<LabelledTextInput label="enter date" type="date" value={date} setValue={setDate} placeholder="DD/MM/YY" />
			<LabelledTextInput
				label="Enter price"
				type="number"
				value={price}
				setValue={setPrice}
				placeholder="eg. 0.08"
				unit={unit}
				regexp={'/^[-]?[0-9]+[.]?[0-9]+$/'}
				required
			/>
			<LabelledTextInput
				label=""
				type="search"
				value={search}
				setValue={setSearch}
				placeholder="search"
				unit={unit}
				regexp="/^[-]?[0-9]+[\.]?[0-9]+$/"
			/>
		</Box>
	);
};

export default InputComponents;
