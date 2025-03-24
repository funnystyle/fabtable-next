// pages/year.js
import React, {useState} from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import YearSearchModalContent from "@components/calendar/year/searchModal/YearSearchModalContent";
import ModalDraggable from "@components/drag/ModalDraggable";
import ModalTitle from "@components/modal/ModalTitle";

const YearSearchModal = ({ year, setYear, setSearchData, openSearchModal, setOpenSearchModal }) => {

	// 모달 닫기
	const closeModal = () => {
		setOpenSearchModal(false);
	};

	return (
		<div style={{ display: openSearchModal ? "block" : "none" }}>
			<Modal
				title={<ModalTitle title="조건 검색" />}
				open={openSearchModal}
				onCancel={() => setOpenSearchModal(false)}
				width={900}
				footer={null}
				modalRender={(modal) => (
					<ModalDraggable modal={modal} />
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
