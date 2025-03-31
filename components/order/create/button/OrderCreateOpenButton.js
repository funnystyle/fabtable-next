// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useRecordModalStore from "@store/useRecordModalStore";

const OrderCreateOpenButton = ({title}) => {

	const { setOpenSearchModal } = useRecordModalStore();

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
