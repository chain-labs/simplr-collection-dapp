import Box from 'components/Box';
import theme from 'src/styleguide/theme';
import styled from 'styled-components';
import { Prohibit, Check, WarningCircle, MagnifyingGlass } from 'phosphor-react';
import If from './If';
import { useRef, useState } from 'react';
import Text from './Text';

interface Props {
	disabled?: boolean;
	placeholder?: string;
	type?: string;
	required?: boolean;
	regexp?: string;
	errorText?: string;
	value: any;
	step?: string;
	setValue: (any) => void;
	dropdown?: boolean;
	unit?: string;
	width?: string;
	min?: string;
	max?: string;
}

const TextInput = ({
	disabled,
	placeholder,
	type,
	required,
	step,
	regexp,
	value,
	setValue,
	unit,
	width,
	min,
	max,
}: Props) => {
	const [validity, setValidity] = useState<'clear' | 'valid' | 'invalid'>('clear');
	const [searchIcon, setSearchIcon] = useState<boolean>(true);

	const inputRef = useRef(null);
	const handleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		if (e.target.value === '') setSearchIcon(true);
		else setSearchIcon(false);
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
		}
	};
	return (
		<Box
			display="flex"
			alignItems="center"
			overflow="visible"
			color="disable-black"
			cursor={disabled ? 'not-allowed' : 'auto'}
		>
			<InputElement
				as="input"
				{...{ disabled, required, type, step }}
				placeholder={placeholder}
				pattern={regexp}
				value={value}
				onChange={handleChange}
				validation={validity}
				ref={inputRef}
				onBlur={handleValidity}
				color="simply-black"
				width={width ?? '32rem'}
				min={min}
				max={max}
			></InputElement>
			<If
				condition={disabled}
				then={
					<Box ml="-3.2rem" mt="0.2rem">
						<Prohibit size={24} color="#8c8ca1" />
					</Box>
				}
			/>
			{type === 'text' || type === 'email' ? (
				<Box overflow="visible">
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
			) : (
				''
			)}
			<If
				condition={type === 'number'}
				then={
					<Text ml="-4.2rem" as="h5" color={validity === 'invalid' ? 'red-50' : 'disable-black'}>
						{unit}
					</Text>
				}
			/>
			<If
				condition={searchIcon && type === 'search'}
				then={
					<Box ml="-4.2rem" mt="0.3rem">
						<MagnifyingGlass size={24} />
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

export const InputElement = styled(Box)(
	(props: InputProps) => `
	padding: ${`${props.theme.space.ms} ${props.theme.space.mm}`};
	font-size: 16px;
	font-family: 'Switzer', sans-serif;
	border-radius: 8px;
	background: ${props?.disabled || props.value ? props.theme.colors['simply-white'] : props.theme.colors['white-00']};
	border: ${
		props.disabled
			? `2px solid rgba(140, 140, 161, 0.2)`
			: props.value
			? props.validation === 'valid'
				? `1px solid ${theme.colors['green-40']}`
				: `1px solid ${props.theme.colors['red-40']};`
			: '0.5px solid #E6E6FF'
	};
	outline: none;
	min-width: 30rem;
	${
		!props.disabled && !props.value
			? `box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.2);`
			: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)'
	};
    ${
			props.value
				? props.validation === 'valid'
					? `box-shadow: 0 0 0 4px ${theme.colors['green-50']}33`
					: `box-shadow: 0px 0px 0px 4px ${props.theme.colors['red-50']}33;`
				: ''
		};


	&::placeholder {
		${props.disabled ? `color: #8c8ca1` : `${theme.colors['gray-00']}`};
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
	cursor: ${props.disabled ? 'not-allowed' : ''}
	

	
`
);
