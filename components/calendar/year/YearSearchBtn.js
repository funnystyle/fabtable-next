// pages/year.js
import React, { useRef, useState } from "react";
import { Button, Flex, Modal, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";
import Draggable from "react-draggable";
import SearchModal from "@components/calendar/year/searchModal/SearchModal";
import YearSearchModal from "@components/calendar/year/YearSearchModal";

const YearSearchBtn = ({ year, setYear }) => {

	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태
	const [modalContent, setModalContent] = useState(null); // Modal 내용

	// 모달 닫기
	const closeModal = () => {
		setOpenSearchModal(false);
	};

	const showSearchModal = () => {
		setModalContent(
			<SearchModal closeModal={closeModal} searchLocation={"year"} />
		);

		setOpenSearchModal(true);
	}
	return (
		<>
			<Flex gap="small">
				<Button variant="outlined" icon={<SearchOutlined />}
					onClick={showSearchModal}
				>
					조건 검색
				</Button>
			</Flex>

			{/* ModalComponent 추가 - "조건 검색" 클릭 시 열림 */}
			<YearSearchModal
				openSearchModal={openSearchModal}
				setOpenSearchModal={setOpenSearchModal}
				modalContent={modalContent}
			/>
		</>
	);
};

export default YearSearchBtn;
