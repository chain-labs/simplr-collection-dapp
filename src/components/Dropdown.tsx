import React, { useState } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import If from './If';
import LabelledSelectInput from './LabelledSelectInput';
import Text from './Text';
import useOuterClick from './useOuterClick';

interface Props {
	setValue: (any) => void;
	value: any;
	data?: any[];
	label?: string;
	placeholder?: string;
	width?: string;
	disabled?: boolean;
}

const Dropdown = ({ setValue, value, data, label, placeholder, width, disabled }: Props) => {
	const [visible, setVisible] = useState(false);
	const ref = useOuterClick(() => {
		setVisible(false);
	});
	return (
		<Box className="dropdown" overflow="visible" ref={ref} width={width ?? '32rem'}>
			<LabelledSelectInput
				label={label}
				set={setVisible}
				placeholder={placeholder}
				visible={visible}
				value={value}
				width={width ?? '32rem'}
				{...{ disabled }}
			/>
			<Box
				borderRadius="8px"
				width={width ?? '32rem'}
				overflow="auto"
				maxHeight="40rem"
				position="absolute"
				onClick={() => setVisible(!visible)}
				onBlur={() => setVisible(false)}
			>
				<If
					condition={visible}
					then={data.map((item) => (
						<Box
							key={item}
							padding="7px 16px"
							border={`1px solid ${theme.colors['white-20']}`}
							backgroundColor="white-00"
							minWidth="32rem"
							css={`
								&:hover {
									background-color: ${theme.colors['blue-00']};
								}
							`}
							onClick={() => setValue(item)}
						>
							<Text as="b1" fontFamily="Switzer" fontWeight="medium">
								{item}
							</Text>
						</Box>
					))}
				/>
			</Box>
		</Box>
	);
};

export default Dropdown;
