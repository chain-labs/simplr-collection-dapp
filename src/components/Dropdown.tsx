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
	subdata?: any[];
	bg?: string;
}

const Dropdown = ({ setValue, value, data, subdata, label, placeholder, width, disabled, bg }: Props) => {
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
				bg={bg}
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
					then={data.map((item, idx) => (
						<Box
							key={item}
							padding="7px 16px"
							border={`1px solid ${theme.colors['gray-20']}`}
							bg="gray-10"
							minWidth="32rem"
							css={`
								&:hover {
									background-color: ${theme.colors['blue-10']};
								}
							`}
							onClick={() => setValue(item)}
							row
							alignItems="center"
							cursor="pointer"
						>
							<Text as="b2">{item}</Text>
							<If
								condition={!!subdata?.[idx]}
								then={
									<>
										<Text as="b2" mx="mxxs">
											-
										</Text>
										<Text as="b2" color="gray-30">
											{subdata?.[idx]}
										</Text>
									</>
								}
							/>
						</Box>
					))}
				/>
			</Box>
		</Box>
	);
};

export default Dropdown;
