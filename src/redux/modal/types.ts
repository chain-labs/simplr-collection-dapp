import TestModal from 'src/components/modals/TestModal';
import TestModal2 from 'src/components/modals/TestModal2';

export interface ModalState {
	isOpen: boolean;
	modalType: string;
	props: any;
}

export const MODALS_LIST = {
	TEST_MODAL: 'TEST_MODAL',
	TEST_MODAL_2: 'TEST_MODAL_2',
};

export const MODALS = {
	[MODALS_LIST.TEST_MODAL]: TestModal,
	[MODALS_LIST.TEST_MODAL_2]: TestModal2,
};
