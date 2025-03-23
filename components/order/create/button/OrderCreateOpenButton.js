// pages/order/create/index.js
import React, {useState} from "react";
import {Button,} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import SearchModal from "@components/searchModal/SearchModal";

const OrderCreateOpenButton = () => {

	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태

	const handleListUpdate = (list) => {
		console.log("handleListUpdate");
		console.log(list);
	}

	const showSearchModal = () => {
		setOpenSearchModal(true);
	}


	return (
		<>
			<Button
				icon={<FilterOutlined />}
				iconPosition={"end"}
				color="primary"
				variant="outlined"
				size="large"
				onClick={showSearchModal}
			>
				수주 불러오기
			</Button>

			<SearchModal
				handleListUpdate={handleListUpdate}
				openSearchModal={openSearchModal}
				setOpenSearchModal={setOpenSearchModal}
				searchLocation={"order"}
			/>
		</>
	);
};

export default OrderCreateOpenButton;
