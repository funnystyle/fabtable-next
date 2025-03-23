// pages/year.js
import React, {useState} from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import YearSearchModalContent from "@components/calendar/year/searchModal/YearSearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";

const YearSearchModal = ({ year, setYear, setSearchData, openSearchModal, setOpenSearchModal }) => {

	const [disabled, setDisabled] = useState(true);

	// 모달 닫기
	const closeModal = () => {
		setOpenSearchModal(false);
	};

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				title={
					<div
						className="modal-title"
						onMouseOver={() => setDisabled(false)}
						onMouseOut={() => setDisabled(true)}
					>
						조건 검색
					</div>
				}
				open={openSearchModal}
				onCancel={() => setOpenSearchModal(false)}
				width={900}
				footer={null}
				modalRender={(modal) => (
					<ModalDraggable modal={modal} disabled={disabled} />
				)}
			>
				<YearSearchModalContent
					year={year}
					setYear={setYear}
					closeModal={closeModal}
					searchLocation={"year"}
					setSearchData={setSearchData} />
			</Modal>
		</div>
	);
};

export default YearSearchModal;
