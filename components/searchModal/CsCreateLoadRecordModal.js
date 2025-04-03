// pages/year.js
import React from "react";
import SearchModal from "@components/searchModal/SearchModal";
import useCsCreateLoadRecordModalStore from "@store/useCsCreateLoadRecordModalStore";

const CsCreateLoadRecordModal = ({ isActive }) => {

	return (
		<SearchModal searchLocation={"order"} searchType={"OPEN"} isActive={isActive}
								 modalStore={useCsCreateLoadRecordModalStore}
		/>
	);
};

export default CsCreateLoadRecordModal;
