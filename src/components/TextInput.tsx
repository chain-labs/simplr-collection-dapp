import Box from 'components/Box';
import theme from 'src/styleguide/theme';
import styled from 'styled-components';
import { Prohibit, Check, WarningCircle, CaretDown } from 'phosphor-react';
import If from './If';
import { useRef, useState } from 'react';

interface Props {
	disabled?: boolean;
	placeholder?: string;
	type?: string;
	required?: boolean;
	regexp?: string;
	errorText?: string;
	value: any;
	setValue: (any) => void;
	dropdown?: boolean;
}

const TextInput = ({ disabled, placeholder, type, required, regexp, value, setValue, dropdown }: Props) => {
	const [validity, setValidity] = useState<'clear' | 'valid' | 'invalid'>('clear');

	const inputRef = useRef(null);
	const handleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		// if (!e.target.value) {
		// 	setValidity('clear');
		// } else {
		// 	const valid = e.target.validity.valid;
		// 	if (valid) {
		// 		setValidity('valid');
		// 	} else {
		// 		setValidity('invalid');
		// 	}
		// }
	};
	const handleValidity = (e) => {
		if (!value) {
			setValidity('clear');
		} else {
			const valid = e.target.validity.valid;
			if (valid) {
				setValidity('valid');
			} else {
				setValidity('invalid');
			}
			console.log(valid);
		}
	};
	return (
		<Box display="flex" alignItems="center" overflow="visible">
			<InputElement
				as="input"
				{...{ disabled, required, placeholder, type }}
				pattern={regexp}
				value={value}
				onChange={handleChange}
				validation={validity}
				ref={inputRef}
				onBlur={handleValidity}
			></InputElement>
			<If
				condition={disabled}
				then={
					<Box ml="-3.2rem" mt="0.2rem">
						<Prohibit size={24} color="#8c8ca1" />
					</Box>
				}
			/>

			<If
				condition={validity === 'valid'}
				then={
					<Box ml="-3.2rem" mt="0.2rem">
						<Check size={24} color={theme.colors['green-40']} />
					</Box>
				}
			/>
			<If
				condition={validity === 'invalid'}
				then={
					<Box ml="-3.2rem" mt="0.2rem">
						<WarningCircle size={24} color={theme.colors['red-50']} />
					</Box>
				}
			/>
		</Box>
	);
};

export default TextInput;

interface InputProps {
	theme: any;
	disabled?: boolean;
	value?: any;
	validation?: 'clear' | 'valid' | 'invalid';
}

const InputElement = styled(Box)(
	(props: InputProps) => `
	padding: ${`${props.theme.space.ms} ${props.theme.space.mm}`};
	font-size: 16px;
	font-family: 'Switzer', sans-serif;
	border-radius: 8px;
	background: ${props?.disabled || props.value ? props.theme.colors['simply-white'] : props.theme.colors['blue-00']};
	border: ${
		props.disabled
			? `1px solid ${theme.colors['black-10']}`
			: props.value
			? props.validation === 'valid'
				? `1px solid ${theme.colors['green-40']}`
				: `1px solid ${props.theme.colors['red-40']};`
			: 'none'
	};
	outline: none;
	min-width: 32rem;
	${!props.disabled && !props.value ? `box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.2);` : ''};
    ${
			props.value
				? props.validation === 'valid'
					? `box-shadow: 0 0 0 4px ${theme.colors['green-50']}33`
					: `box-shadow: 0px 0px 0px 4px ${props.theme.colors['red-50']}33;`
				: ''
		};


	&::placeholder {
		${props.disabled ? `color: #8c8ca1` : ''};
	}

	&:focus {
		border: 1px solid ${props.theme.colors['simply-blue']};
		box-shadow: 0 0 0 4px ${props.theme.colors['simply-blue']}33; 
		background: ${props.theme.colors['simply-white']};
	}

	&:blur {
		${
			props.value
				? `
				box-shadow: 0 0 0 4px ${theme.colors['green-50']}33
				border: 1px solid ${theme.colors['green-40']};`
				: `
				box-shadow: 0 0 0 4px ${props.theme.colors['simply-blue']}33; 
				border: 1px solid ${props.theme.colors['simply-blue']}
			`
		};
	}
	

	
`
);
