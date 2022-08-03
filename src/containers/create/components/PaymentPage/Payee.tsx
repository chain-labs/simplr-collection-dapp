import { XCircle } from 'phosphor-react';
import { useState } from 'react';
import Box from 'src/components/Box';
import TextInput from 'src/components/TextInput';
import theme from 'src/styleguide/theme';

const Payee = ({ percentage, payee, maxShare, handleRemove }) => {
	const [deleteButton, setDeleteButton] = useState(false);
	return (
		<Box
			row
			overflow="visible"
			mb="ms"
			key={payee.substr(-4)}
			onMouseOver={() => setDeleteButton(true)}
			onMouseOut={() => setDeleteButton(false)}
			width="105%"
		>
			<TextInput value="" placeholder={payee} type="text" width="41.7rem" fontSize="1.4rem" disableValidation />
			<Box ml="mxs" />
			<TextInput
				value={undefined}
				placeholder={`${percentage}%`}
				max={`${maxShare}`}
				type="number"
				width="21.4rem"
				disableValidation
				fontSize="1.4rem"
			/>
			<Box
				ml="mxs"
				onClick={() => handleRemove(payee, percentage)}
				cursor="pointer"
				display={deleteButton ? 'block' : 'none'}
				height="20px"
			>
				<XCircle color={theme.colors['red-50']} size="18" weight="fill" />
			</Box>
		</Box>
	);
};

export default Payee;