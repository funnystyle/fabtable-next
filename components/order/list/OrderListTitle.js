// pages/order/create/index.js
import React from "react";
import {Flex, Typography,} from "antd";
import OrderListButtonSearch from "@components/order/list/button/OrderListButtonSearch";
import useRecordModalStore from "@store/useRecordModalStore";
import SearchAutoComplete from "@components/autoComplete/SearchAutoComplete";

const { Title } = Typography;

const OrderListTitle = ({ title }) => {

	const { searchKeyword, setSearchKeyword } = useRecordModalStore();

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>

			<Flex gap="small">
				<SearchAutoComplete searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

				<OrderListButtonSearch />
			</Flex>
		</Flex>
	);
};

export default OrderListTitle;
