// pages/year.js
import React from "react";
import { Modal, } from "antd";
import SearchModalContent from "@components/searchModal/SearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";

const SearchModal = ({ searchLocation, searchType, isActive, modalStore, inBoxType, width=900 }) => {

	const { openSearchModal, setOpenSearchModal } = modalStore();

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				centered
				title={<ModalTitle title="조건 검색" />}
				open={openSearchModal && isActive}
				onCancel={() => setOpenSearchModal(false)}
				width={width}
				footer={null}
				modalRender={(modal) => (<ModalDraggable modal={modal} />)}
			>
				<SearchModalContent
					inBoxType={inBoxType}
					searchLocation={searchLocation}
					searchType={searchType}
					modalStore={modalStore}
				/>
			</Modal>
		</div>
	);
};

export default SearchModal;
