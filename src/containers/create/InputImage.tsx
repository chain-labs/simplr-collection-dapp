import { Trash, UploadSimple } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { collectionSelector, setCollectionDetails } from 'src/redux/collection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';

const InputImage = ({ width, label, required, helper }) => {
	const { logo, banner } = useAppSelector(collectionSelector);
	const logoRef = useRef(null);
	const bannerRef = useRef(null);
	const dispatch = useAppDispatch();

	const handleLogoChange = (e) => {
		const file = e?.target?.files?.[0] ?? null;
		dispatch(setCollectionDetails({ logo: file }));
	};

	useEffect(() => {
		if (!logo) {
			logoRef.current.value = null;
		}
		if (!banner) {
			bannerRef.current.value = null;
		}
	}, [logo, banner]);

	const handleBannerChange = (e) => {
		const file = e.target.files?.[0] ?? null;
		dispatch(setCollectionDetails({ banner: file }));
	};

	return (
		<Box width={width}>
			<Box between mb="mxl" alignItems="center">
				<Text as="h6" color="gray-50">
					{label}
					{required && <span style={{ color: theme.colors['red-40'] }}>*</span>}
				</Text>
			</Box>
			<Box>
				<Box row alignItems="center">
					<Text as="b2" width="5.7rem" mr="wxs">
						Logo:
					</Text>
					<input type="file" ref={logoRef} onChange={handleLogoChange} style={{ display: 'none' }} />
					<If
						condition={!logo}
						then={
							<UploadBtn
								onClick={(e) => {
									e.preventDefault();
									logoRef.current.click();
								}}
							>
								<UploadSimple size={20} />
								<Text as="btn2" ml="mxxs">
									Upload
								</Text>
							</UploadBtn>
						}
						else={<UploadedInfo type="logo" />}
					/>
				</Box>
				<Box row alignItems="center" mt="wxs">
					<Text as="b2" width="5.7rem" mr="wxs">
						Banner:
					</Text>
					<Box as="input" type="file" accept="image/*" display="none" ref={bannerRef} onChange={handleBannerChange} />

					<If
						condition={!banner}
						then={
							<UploadBtn
								onClick={(e) => {
									e.preventDefault();
									bannerRef.current.click();
								}}
							>
								<UploadSimple size={20} />
								<Text as="btn2" ml="mxxs">
									Upload
								</Text>
							</UploadBtn>
						}
						else={<UploadedInfo type="banner" />}
					/>
				</Box>
			</Box>
			<Box mt="mxxxl">
				<Text as="b3" color="gray-30">
					{helper}
				</Text>
			</Box>
		</Box>
	);
};

export default InputImage;

export const UploadBtn = ({ children, onClick }) => {
	return (
		<Box
			as="button"
			border="1px solid"
			borderColor="sky-blue-30"
			borderRadius="4px"
			px="mxl"
			py="mxs"
			row
			alignItems="center"
			bg="gray-10"
			cursor="pointer"
			onClick={onClick}
			css={`
				&:hover {
					border-color: ${theme.colors['blue-40']};
				}
				&:active {
					background-color: ${theme.colors['gray-20']};
				}
			`}
		>
			{children}
		</Box>
	);
};

const condenseFileName = (name) => {
	if (name.length > 20) {
		return name.slice(0, 7) + '...' + name.slice(-7);
	}
	return name;
};

export const UploadedInfo = ({ type }: { type: 'logo' | 'banner' }) => {
	const { logo, banner } = useAppSelector(collectionSelector);
	const [file, setFile] = useState<File>(type === 'logo' ? logo : banner);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log({ logo, banner });
		if (type === 'logo') {
			setFile(logo);
		} else {
			setFile(banner);
		}
	}, [logo, banner]);
	return (
		<Box row alignItems="center">
			<Box borderRadius="4px" px="mxl" py="mxs" row alignItems="center" bg="gray-20" cursor="pointer" mr="mxs">
				<Text as="btn2" color="gray-50">
					{condenseFileName(file.name)}
				</Text>
			</Box>
			<Trash
				color={theme.colors['gray-50']}
				size={24}
				weight="fill"
				onClick={() => {
					dispatch(setCollectionDetails(type === 'logo' ? { logo: null } : { banner: null }));
				}}
				style={{ cursor: 'pointer' }}
			/>
		</Box>
	);
};
