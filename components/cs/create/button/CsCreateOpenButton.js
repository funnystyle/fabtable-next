// pages/order/create/index.js
import React from "react";
import {Button,} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import useCsSearchModalStore from "@store/useCsSearchModalStore";

const CsCreateOpenButton = ({title}) => {

	const { setOpenSearchModal } = useCsSearchModalStore();

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

export default CsCreateOpenButton;
