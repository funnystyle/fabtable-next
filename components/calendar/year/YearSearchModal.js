// pages/year.js
import React, { useRef, useState } from "react";
import { Button, Flex, Modal, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";
import Draggable from "react-draggable";
import SearchModal from "@components/calendar/year/searchModal/SearchModal";

const YearSearchModal = ({ year, setYear, handleListUpdate, openSearchModal, setOpenSearchModal }) => {

	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

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
					<Draggable
						disabled={disabled}
						bounds={bounds}
						nodeRef={draggleRef}
						onStart={(event, uiData) => onStart(event, uiData)}
					>
						<div ref={draggleRef}>{modal}</div>
					</Draggable>
				)}
			>
				<SearchModal
					year={year}
					setYear={setYear}
					closeModal={closeModal}
					searchLocation={"year"}
					handleListUpdate={handleListUpdate} />
			</Modal>
		</div>
	);
};

export default YearSearchModal;
