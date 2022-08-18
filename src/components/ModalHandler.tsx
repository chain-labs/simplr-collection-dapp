import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { modalSelector } from 'src/redux/modal';
import { MODALS, MODALS_LIST } from 'src/redux/modal/types';

const ModalHandler = () => {
	const modal = useAppSelector(modalSelector);
	const Modal = MODALS[MODALS_LIST[modal.modalType]];

	if (modal.isOpen) return <Modal {...{ ...modal.props }} />;
	return <div></div>;
};

export default ModalHandler;
