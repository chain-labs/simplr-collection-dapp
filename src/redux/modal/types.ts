import AllowlistModal from 'src/components/modals/AllowlistModal';

export interface ModalState {
	isOpen: boolean;
	modalType: string;
	props: any;
}

export const MODALS_LIST = {
	ALLOWLIST_MODAL: 'ALLOWLIST_MODAL',
};

export const MODALS = {
	[MODALS_LIST.ALLOWLIST_MODAL]: AllowlistModal,
};
