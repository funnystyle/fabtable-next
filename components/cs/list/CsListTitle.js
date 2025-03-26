// pages/order/create/index.js
import React from "react";
import {Flex, Typography,} from "antd";
import OrderListButtonSearch from "@components/order/list/button/OrderListButtonSearch";
import useModalStore from "@store/useModalStore";
import SearchAutoComplete from "@components/autoComplete/SearchAutoComplete";
import CsListButtonSearch from "@components/cs/list/button/CsListButtonSearch";

const { Title } = Typography;

const CsListTitle = ({ title }) => {

	const { setSearchKeyword } = useModalStore();

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>

			<Flex gap="small">
				<SearchAutoComplete setSearchKeyword={setSearchKeyword} />

				<CsListButtonSearch />
			</Flex>
		</Flex>
	);
};

export default CsListTitle;
