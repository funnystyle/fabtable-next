// pages/year.js
import React, {useState} from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import SearchModalContent from "@components/searchModal/SearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";

const SearchModal = ({ searchLocation, handleListUpdate, openSearchModal, setOpenSearchModal }) => {

	const [disabled, setDisabled] = useState(true);

	// 모달 닫기
	const closeModal = () => {
		setOpenSearchModal(false);
	};

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				title={<ModalTitle title="조건 검색" setDisabled={setDisabled} />}
				open={openSearchModal}
				onCancel={() => setOpenSearchModal(false)}
				width={900}
				footer={null}
				modalRender={(modal) => (
					<ModalDraggable modal={modal} disabled={disabled} />
				)}
			>
				<SearchModalContent
					closeModal={closeModal}
					searchLocation={searchLocation}
					handleListUpdate={handleListUpdate} />
			</Modal>
		</div>
	);
};

export default SearchModal;
