// pages/order/create/index.js
import React, {useState} from "react";
import {Button,} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import YearSearchModal from "@components/calendar/year/YearSearchModal";
import SearchModal from "@components/searchModal/SearchModal";

const OrderListButtonSearch = () => {

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
				size="large"
				onClick={showSearchModal}
			>
				조건 검색
			</Button>

			<SearchModal
				handleListUpdate={handleListUpdate}
				openSearchModal={openSearchModal}
				setOpenSearchModal={setOpenSearchModal}
			/>
		</>
	);
};

export default OrderListButtonSearch;
