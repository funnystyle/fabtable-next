// pages/year.js
import React, {useState} from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import SearchModalContent from "@components/searchModal/SearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";
import useModalStore from "@store/useModalStore";

const SearchModal = ({ searchLocation }) => {

	const { openSearchModal, setOpenSearchModal } = useModalStore();

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				title={<ModalTitle title="조건 검색" />}
				open={openSearchModal}
				onCancel={() => setOpenSearchModal(false)}
				width={900}
				footer={null}
				modalRender={(modal) => (<ModalDraggable modal={modal} />)}
			>
				<SearchModalContent
					searchLocation={searchLocation} />
			</Modal>
		</div>
	);
};

export default SearchModal;
