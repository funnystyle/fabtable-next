// pages/year.js
import React, {useState} from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import SearchModalContent from "@components/searchModal/SearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";
import useRecordModalStore from "@store/useRecordModalStore";

const SearchModal = ({ searchLocation, searchType, isActive }) => {

	const { openSearchModal, setOpenSearchModal } = useRecordModalStore();

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
				/>
			</Modal>
		</div>
	);
};

export default SearchModal;
