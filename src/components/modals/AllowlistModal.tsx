import { HandsClapping, Plus, UploadSimple, X } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { hideModal } from 'src/redux/modal';
import { addWhitelist, allowListSelector } from 'src/redux/pricing';
import theme from 'src/styleguide/theme';
import Box from '../Box';
import ButtonComp from '../Button';
import If from '../If';
import Text from '../Text';
import _ from 'lodash';

const allowlistToString = (allowlist: string[]) => {
	if (allowlist) {
		return allowlist.join('\n');
	}
	return '';
};

const AllowlistModal = () => {
	const allowList = useAppSelector(allowListSelector);
	const [name, setName] = useState(allowList.name);
	const [field, setField] = useState<string | ArrayBuffer>(allowlistToString(allowList?.list));
	const [manual, setManual] = useState(allowList.list.length > 0);
	const dispatch = useAppDispatch();

	const inputRef = useRef(null);

	useEffect(() => {
		if (process.browser) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = 'initial';
			};
		}
	}, []);

	const handleCSVUpload = (e) => {
		const file = e.target.files[0];
		const fileName = file.name;
		setName(fileName);
		const reader = new FileReader();

		reader.onload = function (e) {
			const text = e.target.result;
			setField(text);
			setManual(true);
		};

		reader.readAsText(file);
	};

	const handleSave = (e) => {
		e.preventDefault();
		const a = field.toString();
		const b = a.replaceAll('\n', ' ');
		const c = b.replaceAll(',', ' ');
		const d = _.trim(c, '\n');
		const f = d.split(' ');
		const g = _.compact(f);

		const h = _.uniq(g);

		dispatch(addWhitelist({ list: h, name }));
		dispatch(hideModal());
	};

	return (
		<Box
			width="100vw"
			minHeight="100vh"
			bg={`${theme.colors['simply-black']}80`}
			left="0"
			top="0"
			zIndex={100}
			position="fixed"
		>
			<Box
				p="mxl"
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="simply-white"
				borderRadius="8px"
				box-shadow="0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)"
			>
				<Box row alignItems="center" justifyContent="space-between">
					<Box row alignItems="center">
						<HandsClapping size={40} color={theme.colors['blue-40']} weight="fill" />
						<Text as="h4" ml="mxs">
							Add allowlist
						</Text>
					</Box>
					<X size={32} onClick={() => dispatch(hideModal())} style={{ cursor: 'pointer' }} />
				</Box>
				<Text as="b2" my="mm" width="45.6rem">
					Please upload the CSV for your allowlist or enter manually. You can add multiple adresses seperated by a comma
					(,).
				</Text>
				<Text as="h6" mb="mxs" color="gray-50">
					Name
				</Text>
				<Box
					as="input"
					width="100%"
					bg="gray-10"
					border="0.5px solid"
					borderColor="blue-20"
					px="mm"
					py="ms"
					boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
					borderRadius="4px"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="name-allowlist"
					fontSize="16px"
					lineHeight="150%"
					letterSpacing="-0.25px"
					fontFamily="OpenSauceOneRegular"
					css={`
						&::placeholder {
							color: ${theme.colors['gray-30']};
						}
					`}
				/>
				<Text as="b3" mt="mxs" mb="mm" color="gray-50">
					Only you will able to see this.
				</Text>
				<Text as="h6" color="gray-50" mb="mxs">
					Wallets
				</Text>
				<Box as="input" type="file" display="none" ref={inputRef} accept=".csv" onChange={handleCSVUpload} />
				<If
					condition={!manual}
					then={
						<Box bg="sky-blue-20" py="mxxxl" px="wxs" borderRadius="4px" row between>
							<Button px="mm" onClick={() => inputRef.current.click()}>
								<UploadSimple size={20} />
								<Text as="b2" ml="mxxs">
									Upload CSV
								</Text>
							</Button>
							<Box width="1px" height="8rem" borderRight={`1px solid ${theme.colors['blue-20']}`} mx="mxl"></Box>
							<Button px="mm" onClick={() => setManual(true)}>
								<Plus size={20} />
								<Text as="b2" ml="mxxs">
									Enter Manually
								</Text>
							</Button>
						</Box>
					}
					else={
						<Box
							// @ts-expect-error textarea
							as="textarea"
							bg="gray-10"
							p="mxs"
							borderRadius="4px"
							border="0.5px solid"
							borderColor="blue-20"
							width="100%"
							height="14.4rem"
							row
							between
							fontFamily="OpenSauceOneRegular"
							fontSize="14px"
							lineHeight="12.7px"
							letterSpacing="0.1px"
							outline="none"
							value={field}
							// @ts-expect-error EventTarget does not contain value it seems
							onChange={(e) => setField(e.target?.value)}
							css={`
								/* width */
								&::-webkit-scrollbar {
									width: 4px;
								}

								/* Track */
								&::-webkit-scrollbar-track {
									background: ${theme.colors['gray-10']};
								}

								/* Handle */
								&::-webkit-scrollbar-thumb {
									background: ${theme.colors['blue-30']};
									border-radius: 25px;
								}

								/* Handle on hover */
								&::-webkit-scrollbar-thumb:hover {
									background: #555;
									cursor: pointer;
								}
							`}
						/>
					}
				/>
				<Text as="c1" color="blue-40" my="mxs">
					Download Sample CSV file
				</Text>
				<Box row justifyContent="flex-end">
					<ButtonComp bg="secondary" px="mxl" py="ms" onClick={() => dispatch(hideModal())}>
						<Text as="nav">Cancel</Text>
					</ButtonComp>
					<ButtonComp
						bg="primary"
						px="mxxxl"
						py="ms"
						ml="mm"
						disable={!manual || field === '' || name === ''}
						onClick={handleSave}
					>
						<Text as="nav">Save</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Box>
	);
};

export default AllowlistModal;

const Button = ({ children, px, onClick }) => {
	return (
		<Box
			as="button"
			border="1px solid"
			borderColor="sky-blue-30"
			borderRadius="4px"
			px={px}
			py="mxs"
			row
			alignItems="center"
			bg="gray-10"
			cursor="pointer"
			css={`
				&:hover {
					border-color: ${theme.colors['blue-40']};
				}
				&:active {
					background-color: ${theme.colors['gray-20']};
				}
			`}
			onClick={onClick}
		>
			{children}
		</Box>
	);
};
