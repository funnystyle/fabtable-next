// pages/year.js
import React from "react";
import useOrderCreateLoadRecordModalStore from "@store/useOrderCreateLoadRecordModalStore";
import SearchModal from "@components/searchModal/SearchModal";

const OrderCreateLoadRecordModal = ({ isActive }) => {

	return (
		<SearchModal searchLocation={"order"} searchType={"OPEN"} isActive={isActive}
								 modalStore={useOrderCreateLoadRecordModalStore}
		/>
	);
};

export default OrderCreateLoadRecordModal;
