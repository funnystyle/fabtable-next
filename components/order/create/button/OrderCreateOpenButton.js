// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useModalStore from "@store/useModalStore";

const OrderCreateOpenButton = () => {

	const { setOpenSearchModal } = useModalStore();

	return (
		<>
			<Button
				icon={<FilterOutlined />}
				iconPosition={"end"}
				color="primary"
				variant="outlined"
				size="large"
				onClick={() => setOpenSearchModal(true)}
			>
				수주 불러오기
			</Button>
		</>
	);
};

export default OrderCreateOpenButton;
