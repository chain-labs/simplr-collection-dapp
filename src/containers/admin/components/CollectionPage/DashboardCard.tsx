import { DotsThreeOutlineVertical } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { setEditDetails } from 'src/redux/edit';
import { useAppDispatch } from 'src/redux/hooks';
import theme from 'src/styleguide/theme';
import EditModal from './EditModal';

interface DashboardCardProps {
	Icon: React.ReactNode;
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
}

const DashboardCard = ({
	text,
	data,
	setData,
	editable,
	status,
	Icon,
	setShowModal,
	showModal,
	type,
	setEdit,
	edit,
	label,
	placeholder,
}: DashboardCardProps) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(data);
	const [textV, setTextV] = useState('');
	const dispatch = useAppDispatch();

	// const [edit, setEdit] = useState('');

	const handleAction = () => {
		if (editable === 'address' || editable === 'number' || editable === 'time') {
			setDrawerOpen(false);
			setShowModal(true);
			const editData = {
				type: type,
				label: text,
				placeholder: placeholder,
				data: data,
				editable: editable,
			};
			dispatch(setEditDetails(editData));
		}
		// if (status === 'Edit') {
		// 	setShowModal(true);
		// }
	};

	useEffect(() => {
		setValue(data);
	}, [data]);

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
				{/* @ts-expect-error Icon as props */}
				<Icon color={theme.colors['simply-blue']} size="20" weight="bold" />
				<If
					condition={showModal}
					then={<EditModal visible={showModal} setVisible={setShowModal} edit={edit} data={data} label={textV} />}
				/>
			</Box>
			<Box row between ml="mm" width="40rem">
				<Text as="h5">{text}</Text>
				<If
					condition={!!status}
					then={
						<Text as="h4" color={status === 'Live' || status === 'Sold Out' ? 'green-60' : 'red-50'}>
							{status}
						</Text>
					}
					else={
						<Box
							bg={editable === 'address' ? (editing ? 'simply-white' : 'blue-00') : 'transparent'}
							borderRadius="8px"
							border={editing ? '1px solid' : 'none'}
							borderColor={editing ? '#dcdce8' : 'transparent'}
							outline="none"
							px={editable === 'address' || editable === 'number' ? (editing ? 'mxs' : 'mxl') : '0'}
							py={editable === 'address' || editable === 'number' ? 'mxs' : '0'}
							as={editing ? 'input' : null}
							type={editing && editable === 'number' ? 'number' : 'text'}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							fontFamily="inherit"
							fontSize="1.4rem"
						>
							{/* {!editing ? (
								<Text as="h4" color="simply-blue">
									{editable === 'address' ? getData(value) : data}
								</Text>
							) : null} */}
							<Text as="h4" color="simply-blue">
								{editable === 'address' ? getData(value) : data}
							</Text>
						</Box>
					}
				/>
			</Box>
			<If
				condition={!!editable && (status === 'Sold Out' || status !== 'Ended')}
				then={
					<Box position="relative" onMouseLeave={() => setTimeout(() => setDrawerOpen(false), 1000)} cursor="pointer">
						<Box ml="mxl" center onClick={() => setDrawerOpen(true)}>
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
		</Box>
	);
};

export default DashboardCard;