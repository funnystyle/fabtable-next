// pages/year.js
import React from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import CsSearchModalContent from "@components/searchModal/CsSearchModalContent";

const CsSearchModal = ({ searchLocation, searchType, isActive }) => {

	const { openSearchModal, setOpenSearchModal } = useCsSearchModalStore();

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				title={<ModalTitle title="조건 검색" />}
				open={openSearchModal && isActive}
				onCancel={() => setOpenSearchModal(false)}
				width={900}
				footer={null}
				modalRender={(modal) => (<ModalDraggable modal={modal} />)}
			>
				<CsSearchModalContent
					searchLocation={searchLocation}
					searchType={searchType}
				/>
			</Modal>
		</div>
	);
};

export default CsSearchModal;
