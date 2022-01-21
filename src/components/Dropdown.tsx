import React from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import If from './If';
import LabelledSelectInput from './LabelledSelectInput';
import Text from './Text';

const Dropdown = ({ setVisible, setValue, visible, value, data, label, placeholder }) => {
	return (
		<Box position="relative" overflow="visible">
			<LabelledSelectInput
				label={label}
				set={setVisible}
				placeholder={placeholder}
				visible={visible}
				value={value}
				setValue={setValue}
			/>
			<Box borderRadius="8px" width="32rem" position="absolute" onClick={() => setVisible(!visible)}>
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
