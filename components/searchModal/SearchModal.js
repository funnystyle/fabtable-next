// pages/year.js
import React, {useRef, useState} from "react";
import {Modal,} from "antd";
import "dayjs/locale/ko";
import Draggable from "react-draggable";
import SearchModalContent from "@components/searchModal/SearchModalContent";

const SearchModal = ({ handleListUpdate, openSearchModal, setOpenSearchModal }) => {

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
				<SearchModalContent
					closeModal={closeModal}
					searchLocation={"order"}
					handleListUpdate={handleListUpdate} />
			</Modal>
		</div>
	);
};

export default SearchModal;
