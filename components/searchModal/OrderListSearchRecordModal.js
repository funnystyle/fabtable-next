// pages/year.js
import React from "react";
import SearchModal from "@components/searchModal/SearchModal";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";

const OrderListSearchRecordModal = ({ isActive }) => {
	return (
		<SearchModal searchLocation={"order"} searchType={"LIST"} isActive={isActive}
								 modalStore={useOrderListSearchRecordModalStore}
		/>
	);
};

export default OrderListSearchRecordModal;
