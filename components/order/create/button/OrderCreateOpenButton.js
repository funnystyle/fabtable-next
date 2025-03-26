// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useModalStore from "@store/useModalStore";

const OrderCreateOpenButton = ({title}) => {

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
				{title}
			</Button>
		</>
	);
};

export default OrderCreateOpenButton;
