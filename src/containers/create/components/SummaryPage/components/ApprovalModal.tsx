import { ethers } from 'ethers';
import { gsap } from 'gsap';
import { Check, CircleNotch, Warning, X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Modal from 'src/components/Modal';
import Text from 'src/components/Text';
import useContract from 'src/ethereum/useContract';
import { getContractDetails } from 'src/ethereum/useCustomContract';
import useEthers from 'src/ethereum/useEthers';
import useSigner from 'src/ethereum/useSigner';
import { collectionSelector } from 'src/redux/collection';
import { useAppSelector } from 'src/redux/hooks';
import { paymentSelector } from 'src/redux/payment';
import { saleSelector } from 'src/redux/sales';
import { networkSelector, userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { createCollection, uploadToIPFS } from '../../utils';
import DeployedModal from './DeployedModal';

const ApprovalModal = ({ isOpen, setIsOpen }) => {
	const payments = useAppSelector(paymentSelector);
	const [provider] = useEthers();
	const [signer] = useSigner(provider);
	const [SEATInstance, setSEATInstance] = useState(null);
	const [step, setStep] = useState(payments.useEarlyPass ? 0 : 1);
	const network = useAppSelector(networkSelector);
	const user = useAppSelector(userSelector);
	const collection = useAppSelector(collectionSelector);
	const sales = useAppSelector(saleSelector);
	const [error, setError] = useState([false, false, false]);
	const [finish, setFinish] = useState<string>(null);

	const CollectionFactory = useContract('CollectionFactoryV2', network.chain, provider);

	const getSEATDetails = async () => {
		const abi = getContractDetails('AffiliateCollection');
		const seatAddress = await CollectionFactory.callStatic.freePass();
		const SEATInstance = new ethers.Contract(`${seatAddress}`, abi, provider);
		setSEATInstance(SEATInstance);
	};

	const approvePass = async () => {
		const walletAddress = user.address;

		const operator = await CollectionFactory.address;
		const allowance = await SEATInstance.isApprovedForAll(walletAddress, operator);

		if (!allowance) {
			console.log({ allowance });
			const transaction = await SEATInstance.connect(signer).setApprovalForAll(operator, true);
			const event = (await transaction.wait()).events?.filter((event) => event.event === 'ApprovalForAll');
			return event;
		} else {
			return true;
		}
	};

	const handleApprove = async () => {
		approvePass()
			.then(async (res) => {
				console.log({ res });

				setStep(1);
				const address = await CollectionFactory?.callStatic.simplr();
				uploadToIPFS(collection, sales, payments, address)
					.then(async (res) => {
						setStep(2);
						createCollection(CollectionFactory, res.metadata, collection, sales, payments, signer)
							.then((res) => {
								setStep(3);
								setFinish(res?.event?.collection);
							})
							.catch(async (err) => {
								console.error({ err });
								const er = [...error];
								er[2] = true;
								setError(er);
								setStep(3);
								// SEATInstance.connect(signer).setApprovalForAll(await CollectionFactory.address, false);
							});
					})
					.catch(async (err) => {
						const er = [...error];
						er[1] = true;

						setError(er);
						setStep(2);
						// SEATInstance.connect(signer).setApprovalForAll(await CollectionFactory.address, false);
					});
			})
			.catch((err) => {
				console.error({ err });
				const er = [...error];
				er[0] = true;
				setError(er);
				setStep(1);
			});
	};

	useEffect(() => {
		if (error[0] || error[1] || error[2]) {
			gsap.fromTo('#toast-slider', { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.5 });
		}
	}, [error]);

	useEffect(() => {
		if (isOpen) {
			getSEATDetails();
		}
	}, [isOpen]);

	useEffect(() => {
		if (SEATInstance) {
			handleApprove();
		}
	}, [SEATInstance]);

	if (finish) return <DeployedModal isOpen={true} transactionResult={finish} />;

	if (!isOpen) {
		return null;
	} else {
		return ReactDom.createPortal(
			<Modal visible={isOpen} bg="#f6f6ffe0">
				<Box
					width="53rem"
					opacity="0"
					id="toast-slider"
					py="mm"
					bg="simply-white"
					borderRadius="8px"
					boxShadow="shadow-100"
					row
					center
					position="absolute"
					left="50%"
					top="50%"
					transform="translate(-50%, -50%)"
					mt={payments.useEarlyPass ? '-29rem' : '-24rem'}
				>
					<Warning size="20" color={theme.colors['red-50']} />
					<Text as="h6" color={theme.colors['red-50']} ml="ms">
						{error[1] ? 'Upload Failed' : error[0] || error[2] ? 'Transaction Failed' : ''}
					</Text>
				</Box>
				<Box
					bg="simply-white"
					borderRadius="16px"
					boxShadow="shadow-100"
					border={`1px solid ${theme.colors['simply-black']}18`}
					className="absolute-center"
					p="wxs"
					column
					center
				>
					<If
						condition={payments.useEarlyPass}
						then={
							<>
								<Box width="100%" row>
									<If
										condition={step <= 0}
										then={
											<Box className="spin" height="32px">
												<CircleNotch size="32" color={theme.colors['simply-blue']} />
											</Box>
										}
										else={
											<If
												condition={!error[0]}
												then={<Check size="34" color={theme.colors['green-50']} />}
												else={<X size="32" color={theme.colors['red-50']} />}
											/>
										}
									/>
									<Box ml="mxl" maxWidth="38rem">
										<Text as="h4" color="simply-blue" mb="mxs">
											Approve Pass Burn
										</Text>
										<Text as="h6" color="#8c8c8c">
											To claim the benifits of the early adopter pass, it needs to be burned. Please approve the
											transaction from your wallet.
										</Text>
									</Box>
								</Box>
								<Box my="mm" height="1px" bg="#dcdce580" width="95%" />
							</>
						}
					/>
					<Box width="100%" row>
						<If
							condition={step <= 1}
							then={
								<Box className="spin" height="32px">
									<CircleNotch
										size="32"
										color={theme.colors[step === 1 && !error[0] ? 'simply-blue' : 'simply-white']}
									/>
								</Box>
							}
							else={
								<If
									condition={!error[1]}
									then={<Check size="32" color={theme.colors['green-50']} />}
									else={<X size="32" color={theme.colors['red-50']} />}
								/>
							}
						/>
						<Box ml="mxl" maxWidth="38rem">
							<Text as="h4" color="simply-blue" mb="mxs">
								Uploading files to IPFS
							</Text>
							<Text as="h6" color="#8c8c8c">
								Please wait while we upload your images and metadata to IPFS.
							</Text>
						</Box>
					</Box>
					<Box my="mm" height="1px" bg="#dcdce580" width="95%" />
					<Box width="100%" row mb="wxs">
						<If
							condition={step <= 2}
							then={
								<Box className="spin" height="32px">
									<CircleNotch
										size="32"
										color={theme.colors[step === 2 && !error[1] ? 'simply-blue' : 'simply-white']}
									/>
								</Box>
							}
							else={
								<If
									condition={!error[2]}
									then={<Check size="32" color={theme.colors['green-50']} />}
									else={<X size="32" color={theme.colors['red-50']} />}
								/>
							}
						/>
						<Box ml="mxl" maxWidth="38rem">
							<Text as="h4" color="simply-blue" mb="mxs">
								Create Collection
							</Text>
							<Text as="h6" color="#8c8c8c">
								Confirm the wallet transaction to create your collection.
							</Text>
						</Box>
					</Box>
					<ButtonComp
						bg="secondary"
						height="48px"
						width="100%"
						onClick={() => setIsOpen(false)}
						disable={!error[0] && !error[1] && !error[2]}
					>
						<Text as="h5" color={!error[0] && !error[1] && !error[2] ? 'disable-black' : 'simply-blue'}>
							Go back to Summary
						</Text>
					</ButtonComp>
				</Box>
			</Modal>,
			document.getElementById('portal')
		);
	}
};

export default ApprovalModal;
