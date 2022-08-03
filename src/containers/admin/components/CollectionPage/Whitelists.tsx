import { ethers } from 'ethers';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import LabelledTextInput from 'src/components/LabelledTextInput';
import Text from 'src/components/Text';
import TextArea from 'src/components/TextArea';
import WhitelistModal from 'src/containers/create/components/SalesPage/WhitelistModal';
import { setEditDetails } from 'src/redux/edit';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { presaleWhitelistSelector } from 'src/redux/sales';
import { userSelector } from 'src/redux/user';
import EditModalv2 from '../EditModalv2';

const Whitelists = ({ admin }) => {
	const [whitelistAdder, setWhitelistAdder] = useState('');
	const [whitelistRemover, setWhitelistRemover] = useState('');
	const [whitelistModalOpen, setWhitelistModalOpen] = useState(false);
	const [whitelistArray, setWhitelistArray] = useState([]);
	const [editType, setEditType] = useState<'whitelist_add' | 'whitelist_remove'>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const presaleWhitelist = useAppSelector(presaleWhitelistSelector);
	const user = useAppSelector(userSelector);

	const handleAdd = () => {
		const whitelistString = whitelistAdder.replace(/\s+/g, '');
		const whitelistsArray = whitelistString.split(',');
		const list = [...whitelistsArray, ...presaleWhitelist];
		let err = false;

		whitelistsArray.every((address, index) => {
			if (!ethers.utils.isAddress(address)) {
				toast.error('Please check if all addresses are valid.');
				err = true;
				return false;
			} else if (list.lastIndexOf(address) !== index) {
				toast.error('Please remove duplicate addresses found in the list.');
				err = true;
				return false;
			}
			return true;
		});

		if (!err) {
			setEditType('whitelist_add');
			setShowModal(true);
			setWhitelistArray(whitelistsArray);
			dispatch(setEditDetails({ data: whitelistsArray }));
		}
	};

	const handleRemove = () => {
		const whitelistString = whitelistRemover.replace(/\s+/g, '');
		const whitelistsArray = whitelistString.split(',');
		const list = [...whitelistsArray];
		let err = false;

		whitelistsArray.every((address, index) => {
			if (!ethers.utils.isAddress(address)) {
				toast.error('Please check if all addresses are valid.');
				err = true;
				return false;
			} else if (list.lastIndexOf(address) !== index) {
				toast.error('Please remove duplicate addresses found in the list.');
				err = true;
				return false;
			}
			return true;
		});

		if (!err) {
			setEditType('whitelist_remove');
			setShowModal(true);
			setWhitelistArray(whitelistsArray);
			dispatch(setEditDetails({ data: whitelistsArray }));
		}
	};

	return (
		<Box>
			<Text as="h3" color="simply-blue" mt="wxl">
				Whitelists:
			</Text>
			<Box row between>
				<Box mt="mxl" width="55.2rem">
					<LabelledTextInput
						placeholder="Enter a valid wallet address"
						label="Add Whitelist:"
						helperText="You can add multiple addresses seperated by a comma ( , )."
						disableValidation
						width="100%"
						disabled={admin !== user.address}
					>
						<TextArea width="100%" value={whitelistAdder} setValue={setWhitelistAdder} />
					</LabelledTextInput>
					<Box row justifyContent="flex-end" mt="mxl" mb="wm">
						<ButtonComp bg="tertiary" height="40px" px="mxl" onClick={() => setWhitelistModalOpen(true)} mr="mxs">
							<Text as="h6">View Whitelist</Text>
						</ButtonComp>
						<ButtonComp
							bg="primary"
							height="40px"
							px="mxl"
							disable={!whitelistAdder}
							onClick={() => handleAdd()}
							display={admin === user.address ? 'block' : 'none'}
							mr="mxs"
						>
							<Text as="h6">Add</Text>
						</ButtonComp>
						<WhitelistModal visible={whitelistModalOpen} setVisible={setWhitelistModalOpen} admin />
						<EditModalv2
							visible={showModal}
							setVisible={setShowModal}
							data={[...whitelistArray]}
							type={editType}
							clearInput={() => setWhitelistAdder('')}
						/>
					</Box>
				</Box>
				<Box mt="mxl" width="55.2rem">
					<LabelledTextInput
						placeholder="Enter a valid wallet address"
						label="Remove Whitelist:"
						helperText="You can add multiple addresses seperated by a comma ( , )."
						disableValidation
						width="100%"
						disabled={admin !== user.address}
					>
						<TextArea width="100%" value={whitelistRemover} setValue={setWhitelistRemover} />
					</LabelledTextInput>
					<Box row justifyContent="flex-end" mt="mxl" mb="wm">
						<ButtonComp
							bg="secondary"
							height="40px"
							px="mxl"
							disable={!whitelistRemover}
							onClick={() => handleRemove()}
							display={admin === user.address ? 'block' : 'none'}
						>
							<Text as="h6">Remove</Text>
						</ButtonComp>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Whitelists;
