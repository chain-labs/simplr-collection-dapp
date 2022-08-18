import TestModal from 'src/components/modals/TestModal';

export interface ModalState {
	isOpen: boolean;
	modalType: string;
	props: any;
}

export const MODALS_LIST = {
	TEST_MODAL: 'TEST_MODAL',
};

export const MODALS = {
	[MODALS_LIST.TEST_MODAL]: TestModal,
};
