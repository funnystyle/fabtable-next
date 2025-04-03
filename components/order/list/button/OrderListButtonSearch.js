// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";

const OrderListButtonSearch = ({ isActive }) => {

	const { setOpenSearchModal, list } = useOrderListSearchRecordModalStore();

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

export default OrderListButtonSearch;
