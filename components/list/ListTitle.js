// pages/order/create/index.js
import React from "react";
import { Flex, Typography, } from "antd";
import OrderListButtonSearch from "@components/order/list/button/OrderListButtonSearch";
import SearchAutoComplete from "@components/autoComplete/SearchAutoComplete";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";

const { Title } = Typography;

const ListTitle = ({ title, isActive, modalStore }) => {

	const { searchKeyword, setSearchKeyword } = modalStore();

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>

			<Flex gap="small">
				<SearchAutoComplete searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

				<OrderListButtonSearch isActive={isActive} modalStore={modalStore} />
			</Flex>
		</Flex>
	);
};

export default ListTitle;
