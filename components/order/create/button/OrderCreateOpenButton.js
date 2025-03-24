// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import SearchModal from "@components/searchModal/SearchModal";
import useModalStore from "@store/useModalStore";

const OrderCreateOpenButton = () => {

	const { setOpenSearchModal, list } = useModalStore();

	const showSearchModal = () => {
		setOpenSearchModal(true);
	}

	useEffect(() => {
			console.log("list", list);
	}, [list]);


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
				searchLocation={"order"}
			/>
		</>
	);
};

export default OrderCreateOpenButton;
