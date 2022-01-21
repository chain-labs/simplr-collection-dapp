import React from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import If from './If';
import LabelledInput from './LabelledInput';
import Text from './Text';

const Dropdown = ({ setVisible, setValue, visible, value, data }) => {
	return (
		<Box>
			<LabelledInput
				set={setVisible}
				placeholder="blockchain"
				visible={visible}
				label="dropdown"
				value={value}
				setValue={setValue}
			/>
			<Box borderRadius="8px" width="32rem" onClick={() => setVisible(!visible)}>
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
