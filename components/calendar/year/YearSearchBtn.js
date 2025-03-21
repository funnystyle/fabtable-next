// pages/year.js
import React, { useRef, useState } from "react";
import { Button, Flex, Modal, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";
import Draggable from "react-draggable";
import YearSearchModal from "@components/calendar/year/YearSearchModal";

const YearSearchBtn = ({ year, setYear, handleListUpdate }) => {

	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태

	const showSearchModal = () => {
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
				year={year}
				setYear={setYear}
				handleListUpdate={handleListUpdate}
				openSearchModal={openSearchModal}
				setOpenSearchModal={setOpenSearchModal}
			/>
		</>
	);
};

export default YearSearchBtn;
