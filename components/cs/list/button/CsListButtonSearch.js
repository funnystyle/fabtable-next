// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useCsListSearchCsModalStore from "@store/useCsListSearchCsModalStore";

const CsListButtonSearch = ({ isActive }) => {

	const { setOpenSearchModal, list } = useCsListSearchCsModalStore();

	useEffect(() => {
		if (isActive) {
			setOpenSearchModal(false);
		}
	}, [list]);

	return (
		<>
			<Button
				icon={<FilterOutlined />}
				iconPosition={"end"}
				size="large"
				onClick={() => setOpenSearchModal(true)}
			>
				조건 검색
			</Button>
		</>
	);
};

export default CsListButtonSearch;
