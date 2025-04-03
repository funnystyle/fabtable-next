// pages/order/create/index.js
import React from "react";
import { Button, message, } from "antd";
import useCsListHistoryCsModalStore from "@store/useCsListHistoryCsModalStore";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";

const CsHistoryButton = () => {

	const { setOpenSearchModal } = useCsListHistoryCsModalStore();

	const {selectedRowKeys} = useTableSelectKeysStore();


  const onClick = () => {
		if (selectedRowKeys.length === 0) {
			message.warning("이력 조회할 행을 선택해주세요.");
			return;
		}
		if (selectedRowKeys.length > 1) {
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
