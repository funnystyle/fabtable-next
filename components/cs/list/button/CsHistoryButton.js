// pages/order/create/index.js
import React from "react";
import { Button, message, } from "antd";
import useCsListHistoryCsModalStore from "@store/useCsListHistoryCsModalStore";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";

const CsHistoryButton = ({ openLength, modalStore }) => {

	const { setOpenSearchModal } = modalStore();

  const onClick = () => {
		if (openLength === 0) {
			message.warning("이력 조회할 행을 선택해주세요.");
			return;
		}
		if (openLength > 1) {
			message.warning("이력 조회는 1개만 가능합니다.");
			return;
		}
		setOpenSearchModal(true);
	}

	return (
		<Button variant="outlined" onClick={onClick}>C/S 이력</Button>
	);
};

export default CsHistoryButton;
