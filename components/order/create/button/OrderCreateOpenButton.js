// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useOrderCreateLoadRecordModalStore from "@store/useOrderCreateLoadRecordModalStore";

const OrderCreateOpenButton = ({title}) => {

	const { setOpenSearchModal } = useOrderCreateLoadRecordModalStore();

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
