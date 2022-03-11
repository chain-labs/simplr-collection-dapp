/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { signString } from './signDoc';
import axios from 'axios';
import { CircleNotch } from 'phosphor-react';
import toast, { Toaster } from 'react-hot-toast';
import Checkbox from 'src/components/Checkbox';
import Markdown from 'markdown-to-jsx';
import { PINATA_HASH } from './utils';

const Tnc = ({ setStep }) => {
	const [provider] = useEthers();
	const [signer] = useSigner(provider);
	const [loading, setLoading] = useState(false);
	const [checkbox, setCheckbox] = useState(false);
	const [text, setText] = useState('');

	useEffect(() => {
		fetch(`https://simplr.mypinata.cloud/ipfs/${process.env.NEXT_PUBLIC_MARKDOWN_HASH}`)
			.then((response) => response.text())
			.then((text) => {
				console.log(text);
				setText(text);
			});
	}, []);

	const handleSignature = async () => {
		setLoading(true);
		const date = new Date();
		const signature = await signString(signer, date);
		await axios
			.post('https://simplr-tnc-microservice.herokuapp.com/signDoc', {
				signer: signature.signer,
				signature: signature.signature,
				message: signature.message,
			})
			.then(
				(response) => {
					toast.success('Signed successfully');
				},
				(error) => {
					toast.error('Something went wrong');
				}
			);
		setStep(0);
		setLoading(false);
	};

	return (
		<Box center>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 5000,
				}}
			/>
			<Box width="45.9rem">
				<Text as="h2" pb="mm" textAlign="center" color="simply-blue">
					Welcome to Simplr!
				</Text>
				<Text as="b2" mb="mm" textAlign="center" color="#52575C">
					We know you’re excited about getting started with your first ever project on simplr and we are too. For that
					we need to make sure that you go through our Terms & Conditions for using Simplr.
				</Text>
				<Box mb="30px" center>
					<Text
						as="b1"
						color="#949499"
						height="33.6rem"
						width="40.6rem"
						overflowY="scroll"
						overflowX="hidden"
						className="tnc-hidden-scrollbar"
					>
						<div>
							<Markdown children={text} />
						</div>
					</Text>
				</Box>
				<Box center mb="mm">
					<Checkbox value={checkbox} setValue={setCheckbox} disabled={loading === true} />
					<Text as="h6" ml="mm">
						I hereby agree to all Simplr Terms and Conditions
					</Text>
				</Box>
				<Box px="mxxl">
					<ButtonComp
						bg="primary"
						height="40px"
						width="100%"
						onClick={handleSignature}
						disable={checkbox === false || loading === true}
						center
					>
						<Box center ml="mxs" className="spin" display={loading === true ? 'flex' : 'none'}>
							<CircleNotch size="24" />
						</Box>
						<Text as="h5">{loading ? 'Opening Metasmask' : 'Sign and Proceed'}</Text>
					</ButtonComp>
				</Box>
			</Box>
		</Box>
	);
};

export default Tnc;
