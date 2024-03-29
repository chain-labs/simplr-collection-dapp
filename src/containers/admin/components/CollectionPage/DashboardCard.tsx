import { DotsThreeOutlineVertical } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { setEditDetails } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';
import EditModal from './EditModal';
import { formatDate } from 'src/utils/time';
import { userSelector } from 'src/redux/user';
import ButtonComp from 'src/components/Button';
import TimeEditModal from './TimeEditModal';

interface DashboardCardProps {
	Icon: any;
	text: string;
	data?: string;
	editable?: 'address' | 'time' | 'number' | 'status';
	status?: 'Live' | 'Paused' | 'Sold Out' | 'Ended';
	setData?: (any) => void;
	setShowModal?: (boolean) => void;
	showModal?: boolean;
	type?: any;
	edit?: any;
	setEdit?: (any) => void;
	label?: any;
	placeholder?: any;
	editfield?: string;
	admin?: string;
	timeType?: 'presale' | 'sale';
}

const DAY_SECONDS = 86400;
const HOUR_SECONDS = 3600;
const MINUTE_SECONDS = 60;

const DashboardCard = ({
	text,
	data,
	admin,
	editable,
	status,
	Icon,
	setShowModal,
	showModal,
	type,
	placeholder,
	editfield,
	timeType,
}: DashboardCardProps) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [value, setValue] = useState(data);
	const [tooltipView, setTooltipView] = useState(false);
	const [tooltipTime, setTooltipTime] = useState('');
	const user = useAppSelector(userSelector);
	const [isTimeEditing, setIsTimeEditing] = useState(false);

	const dispatch = useAppDispatch();

	const handleAction = () => {
		if (editable === 'address' || editable === 'number') {
			setDrawerOpen(false);
			setShowModal(true);
			const editData = {
				type: type,
				label: text,
				placeholder: placeholder,
				data: data,
				editable: editable,
				editfield: editfield,
			};
			dispatch(setEditDetails(editData));
		}
		if (status === 'Live' || status === 'Paused') {
			setDrawerOpen(false);
			setShowModal(true);
			const editData = {
				type: type,
				label: text,
				placeholder: placeholder,
				editable: status,
				editfield: editfield,
			};
			dispatch(setEditDetails(editData));
		}
		if (editfield === 'Reveal') {
			setShowModal(true);
			const editData = {
				data: data,
				type: type,
				label: text,
				placeholder: placeholder,
				editable: status,
				editfield: editfield,
			};
			dispatch(setEditDetails(editData));
		}
		if (editable === 'time') {
			setIsTimeEditing(true);
		}
	};

	useEffect(() => {
		setValue(data);
		if (editable === 'time') setTooltipTime(formatDate(data));
		if (editable === 'time') {
			const time = parseInt(data);

			const interval = setInterval(() => {
				const now = Math.floor(Date.now() / 1000);
				const remaining = time - now;

				if (remaining > DAY_SECONDS) {
					const days = Math.floor(remaining / DAY_SECONDS);
					const hours = Math.floor((remaining - DAY_SECONDS * days) / HOUR_SECONDS);
					const minutes = Math.floor((remaining - DAY_SECONDS * days - hours * HOUR_SECONDS) / MINUTE_SECONDS);
					const seconds = Math.floor(remaining - DAY_SECONDS * days - hours * HOUR_SECONDS - minutes * MINUTE_SECONDS);
					const countdown = `${days < 10 ? 0 : ''}${days}:${hours < 10 ? 0 : ''}${hours}:${
						minutes < 10 ? 0 : ''
					}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;

					setValue(countdown);
				} else {
					const hours = Math.floor(remaining / HOUR_SECONDS);
					const minutes = Math.floor((remaining - hours * HOUR_SECONDS) / MINUTE_SECONDS);
					const seconds = Math.floor(remaining - hours * HOUR_SECONDS - minutes * MINUTE_SECONDS);
					const countdown = `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${
						seconds < 10 ? 0 : ''
					}${seconds}`;
					setValue(countdown);
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [data, setValue]);

	const getData = (data) => {
		if (editable === 'address') {
			if (data.length > 10) {
				return `${value.substr(0, 4)}...${value.substr(-4)}`;
			}
			return data;
		}
	};

	return (
		<Box
			row
			width="55.2rem"
			height="7.2rem"
			alignItems="center"
			border="1px solid"
			borderColor="#DCDCE880"
			borderRadius="8px"
			px="mxl"
			mb="mm"
		>
			<Box center width="4.8rem" height="4.8rem" borderRadius="50%" bg="blue-00">
				<Icon color={theme.colors['simply-blue']} size="20" weight="bold" />
				<If condition={showModal} then={<EditModal visible={showModal} setVisible={setShowModal} />} />
			</Box>
			<Box row between ml="mm" width="40rem" position="relative">
				<Text as="h5">{text}</Text>
				<If
					condition={!!status}
					then={
						<Text as="h4" color={status === 'Live' || status === 'Sold Out' ? 'green-60' : 'red-50'}>
							{status}
						</Text>
					}
					else={
						<Box>
							<If
								condition={editable === 'time'}
								then={
									<Box
										position="absolute"
										width="auto"
										top="0"
										right="0"
										display={tooltipView ? 'block' : 'none'}
										bg="white-00"
										border={`1px solid ${theme.colors['white-20']}`}
										borderRadius="4px"
										boxShadow="shadow-100"
										px="ms"
										py="mxs"
									>
										<Text as="c3">{`Goes Live on ${tooltipTime}`}</Text>
									</Box>
								}
							/>
							<Box
								bg={editable === 'address' ? 'blue-00' : 'transparent'}
								borderRadius="8px"
								outline="none"
								px={editable === 'address' ? 'mxl' : '0'}
								py={editable === 'address' || editable === 'number' ? 'mxs' : '0'}
								fontFamily="inherit"
								fontSize="1.4rem"
								onMouseOver={() => setTooltipView(true)}
								onMouseLeave={() => setTimeout(() => setTooltipView(false), 3000)}
							>
								<Text as="h4" color="simply-blue">
									{editable === 'address'
										? getData(value)
										: editable === 'time'
										? value
										: editfield === 'Reveal'
										? ''
										: data}
								</Text>
							</Box>
						</Box>
					}
				/>
			</Box>
			<If
				condition={editfield === 'Reveal'}
				then={
					<ButtonComp bg="secondary" height="36px" px="12px" py="6px" onClick={handleAction}>
						<Text as="h6">{editfield}</Text>
					</ButtonComp>
				}
			/>
			<If
				condition={!!editable && (status === 'Sold Out' || status !== 'Ended' || text !== 'Pre-Sale')}
				then={
					<Box position="relative" onMouseLeave={() => setTimeout(() => setDrawerOpen(false), 1000)} cursor="pointer">
						<Box
							ml="mxl"
							center
							onClick={admin === user.address ? () => setDrawerOpen(true) : () => setDrawerOpen(false)}
							cursor={admin === user.address ? 'pointer' : 'not-allowed'}
						>
							<DotsThreeOutlineVertical color={theme.colors['gray-00']} size="20" weight="fill" />
						</Box>
						<If
							condition={drawerOpen}
							then={
								<Box
									px="mm"
									py="mxs"
									bg="white-00"
									border="1px solid"
									borderColor="white-20"
									boxShadow="0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)"
									borderRadius="4px"
									position="absolute"
									left="25px"
									cursor="pointer"
									onClick={handleAction}
								>
									<Text as="c3">{status === 'Live' ? 'Pause' : status === 'Paused' ? 'Resume' : 'Edit'}</Text>
								</Box>
							}
						/>
					</Box>
				}
			/>
			<If
				condition={editable === 'time'}
				then={<TimeEditModal visible={isTimeEditing} setVisible={setIsTimeEditing} type={timeType} data={data} />}
			/>
		</Box>
	);
};

export default DashboardCard;
