import { Trash, UploadSimple } from 'phosphor-react';
import React, { useEffect, useRef } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import ButtonComp from './Button';
import If from './If';
import Text from './Text';

const Dropzone = React.memo(
	({ image, setImage, disabled }: { image: File; setImage?: (File) => void; disabled?: boolean }) => {
		const fileEl = useRef(null);
		const containerRef = useRef(null);
		const hoverRef = useRef(null);

		const handleChange = (e) => {
			e.preventDefault();
			if (e.target.files[0]) {
				const file = e.target.files[0];
				containerRef.current.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
				setImage(file);
			}
		};

		useEffect(() => {
			if (image) {
				containerRef.current.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
			} else {
				containerRef.current.style.backgroundImage = `transparent`;
			}
		}, [image]);

		const handleDragEnter = (e) => {
			e.preventDefault();
			containerRef.current.style.backgroundColor = theme.colors['blue-00'];
		};

		const handleDragLeave = (e) => {
			e.preventDefault();
			const target = e.toElement || e.relatedTarget;
			if (target.parentNode !== containerRef.current && target !== containerRef.current) {
				containerRef.current.style.backgroundColor = 'transparent';
			}
		};

		const handleDragOver = (e) => {
			e.preventDefault();
		};

		const fileDrop = (e) => {
			e.preventDefault();
			containerRef.current.style.backgroundColor = 'transparent';
			const file = e.dataTransfer.files[0];
			setImage(file);
		};

		return (
			<React.Fragment>
				<Box
					center
					column
					border={image ? 'none' : '1px dashed'}
					position="relative"
					overflow="hidden"
					backgroundImage={image ? `url(${URL.createObjectURL(image)})` : 'none'}
					backgroundSize="cover"
					backgroundPosition="center"
					backgroundRepeat="no-repeat"
					borderColor={theme.colors['gray-00']}
					borderRadius="6px"
					py="wxs"
					ref={containerRef}
					minHeight="18rem"
					onDragEnter={!disabled ? handleDragEnter : null}
					onDragLeave={!disabled ? handleDragLeave : null}
					onDrop={!disabled ? fileDrop : null}
					onDragOver={!disabled ? handleDragOver : null}
					onMouseEnter={
						image && !disabled
							? (e) => {
									e.preventDefault();
									hoverRef.current.style.display = 'block';
							  }
							: null
					}
					onMouseLeave={
						image
							? (e) => {
									e.preventDefault();
									hoverRef.current.style.display = 'none';
							  }
							: null
					}
				>
					<If
						condition={!image}
						then={
							<>
								<ButtonComp
									bg="secondary"
									height="36px"
									px="mxl"
									row
									center
									mb="mxs"
									onClick={(e) => {
										e.preventDefault();
										fileEl?.current?.click();
									}}
									type="none"
									disable={disabled}
									css={`
										* {
											pointer-events: none;
										}
									`}
								>
									<UploadSimple size="16" color={theme.colors['simply-blue']} />
									<Text as="h6" ml="mxxs">
										Upload
									</Text>
								</ButtonComp>
								<Text as="c3" color="gray-00" textAlign="center">
									Click or drag and drop to upload. (JPEG and
									<br /> PNG files accepted.)
								</Text>
							</>
						}
						else={
							<Box
								position="absolute"
								height="18rem"
								width="100%"
								ref={hoverRef}
								bg={`${theme.colors['simply-black']}bc`}
								display="none"
								column
								alignItems="center"
								px="mm"
								py="mxs"
							>
								<Box row justifyContent="flex-end" height="100%" alignItems="flex-end">
									<Box
										cursor="pointer"
										onClick={(e) => {
											e.preventDefault();
											setImage(null);
											containerRef.current.style.backgroundImage = 'none';
										}}
										css={`
											svg {
												color: ${theme.colors['simply-white']};
											}
											&:hover {
												svg {
													color: ${theme.colors['red-50']};
												}
											}
										`}
									>
										<Trash size="20" weight="fill" />
									</Box>
								</Box>
							</Box>
						}
					/>
					<Box
						as="input"
						type="file"
						accept="image/jpeg, image/png, image/jpg"
						ref={fileEl}
						display="none"
						onChange={handleChange}
					/>
				</Box>
			</React.Fragment>
		);
	}
);

export default Dropzone;
