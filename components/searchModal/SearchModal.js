// pages/year.js
import React from "react";
import { Modal, } from "antd";
import SearchModalContent from "@components/searchModal/SearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";

const SearchModal = ({ searchLocation, searchType, isActive, modalStore }) => {

	const { openSearchModal, setOpenSearchModal } = modalStore();

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				centered
				title={<ModalTitle title="조건 검색" />}
				open={openSearchModal && isActive}
				onCancel={() => setOpenSearchModal(false)}
				width={900}
				footer={null}
				modalRender={(modal) => (<ModalDraggable modal={modal} />)}
			>
				<SearchModalContent
					searchLocation={searchLocation}
					searchType={searchType}
					modalStore={modalStore}
				/>
			</Modal>
		</div>
	);
};

export default SearchModal;
