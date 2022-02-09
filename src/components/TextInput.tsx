import Box from 'components/Box';
import theme from 'src/styleguide/theme';
import styled from 'styled-components';
import { Prohibit, Check, WarningCircle, MagnifyingGlass } from 'phosphor-react';
import If from './If';
import { useEffect, useState } from 'react';
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
	setValue?: (any) => void;
	dropdown?: boolean;
	unit?: string;
	width?: string;
	min?: string;
	max?: string;
	disableValidation?: boolean;
	fontSize?: string;
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
	disableValidation,
	fontSize,
}: Props) => {
	const [validity, setValidity] = useState<'clear' | 'valid' | 'invalid'>('clear');
	const [searchIcon, setSearchIcon] = useState<boolean>(true);

	const handleChange = (e) => {
		e.preventDefault();
		if (type === 'number') {
			setValue(parseFloat(e.target.value));
		} else {
			setValue(e.target.value);
		}
		if (e.target.value === '') setSearchIcon(true);
		else setSearchIcon(false);
	};

	const handleValidity = (e) => {
		if (disableValidation) return;
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

	useEffect(() => {
		if (!value) setValidity('clear');
	}, [value]);

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
				{...{ disabled, required, type, step, disableValidation, fontSize }}
				readOnly={!setValue}
				placeholder={placeholder}
				pattern={regexp}
				value={value}
				onChange={handleChange}
				onWheel={(e) => {
					if (type === 'number') e.target.blur();
				}}
				validation={validity}
				onBlur={handleValidity}
				color={disabled ? 'disable-black' : 'simply-black'}
				width={width ?? '32rem'}
				min={min}
				max={max}
			></InputElement>
			<If
				condition={disabled && !disableValidation}
				then={
					<Box ml="-3.2rem" mt="0.2rem">
						<Prohibit size={24} color="#8c8ca1" />
					</Box>
				}
			/>
			{type === 'text' || type === 'email' || type === 'url' || (type === 'number' && !unit) ? (
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
				condition={type === 'number' && !!unit}
				then={
					<Text ml="-9%" as="h5" color={validity === 'invalid' ? 'red-50' : 'disable-black'}>
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
	type?: string;
	disableValidation?: boolean;
	fontSize?: string;
}

export const InputElement = styled(Box)(
	(props: InputProps) => `
	padding: ${`${props.theme.space.ms} ${props.theme.space.mm}`};
	font-size: ${props.fontSize ?? '1.6rem'};
	font-family: 'Switzer', sans-serif;
	border-radius: 8px;
	background: ${props?.disabled || props.value ? props.theme.colors['simply-white'] : props.theme.colors['white-00']};
	border: ${
		props.disabled
			? `2px solid rgba(140, 140, 161, 0.2)`
			: props.value && !props.disableValidation
			? props.validation !== 'invalid'
				? `1px solid ${theme.colors['green-40']}`
				: `1px solid ${props.theme.colors['red-40']};`
			: '0.5px solid #E6E6FF'
	};
	outline: none;
	${
		!props.disabled && !props.value
			? `box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.2);`
			: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)'
	};
    ${
			props.value && !props.disableValidation
				? props.validation !== 'invalid'
					? `box-shadow: 0 0 0 4px ${theme.colors['green-50']}33`
					: `box-shadow: 0px 0px 0px 4px ${props.theme.colors['red-50']}33;`
				: ''
		};


	&::placeholder {
		${props.disabled || props.type === 'search' ? `color: #8c8ca1` : `color: ${theme.colors['gray-00']}`};
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
