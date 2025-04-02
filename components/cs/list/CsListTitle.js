// pages/order/create/index.js
import React from "react";
import {Flex, Typography,} from "antd";
import SearchAutoComplete from "@components/autoComplete/SearchAutoComplete";
import CsListButtonSearch from "@components/cs/list/button/CsListButtonSearch";
import useCsSearchModalStore from "@store/useCsSearchModalStore";

const { Title } = Typography;

const CsListTitle = ({ title, isActive }) => {

	const { searchKeyword, setSearchKeyword } = useCsSearchModalStore();

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>

			<Flex gap="small">
				<SearchAutoComplete searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

				<CsListButtonSearch isActive={isActive} />
			</Flex>
		</Flex>
	);
};

export default CsListTitle;
