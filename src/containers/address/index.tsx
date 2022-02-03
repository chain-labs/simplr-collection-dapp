import { useState } from 'react';
import toast from 'react-hot-toast';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import LabelledTextInput from 'src/components/LabelledTextInput';
import { Toaster } from 'react-hot-toast';

const AddressComponent = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		toast.success('Hoorah');
	};

	return (
		<Box minHeight="90vh" overflow="visible" bg="simply-white">
			<Toaster />
			<Box mx="auto" width="110rem">
				<form onSubmit={handleSubmit}>
					<LabelledTextInput
						value={name}
						required
						setValue={setName}
						label="Name"
						type="text"
						placeholder="Enter Name"
					/>
					<Box mt="mxxxl" />
					<LabelledTextInput
						value={email}
						setValue={setEmail}
						label="Email"
						type="email"
						required
						placeholder="Enter Email"
					/>
					<Box mt="wm" />
					<ButtonComp type="submit" bg="primary" width="50rem" height="56px">
						Submit
					</ButtonComp>
				</form>
			</Box>
		</Box>
	);
};

export default AddressComponent;
