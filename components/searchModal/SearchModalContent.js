// pages/year.js
import React from "react";
import {Form,} from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalButton from "@components/searchModal/SearchModalButton";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";
import CsCreateModalTable from "@components/cs/create/CsCreateModalTable";

const SearchModalContent = ({ searchLocation, searchType }) => {

	const [form] = Form.useForm();

	console.log("SearchModalContent", searchLocation, searchType);
	console.log((searchLocation === "order" && searchType === "OPEN"));

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} />

				<SearchModalButton form={form} />

				{(searchLocation === "order" && searchType === "OPEN") && (<OrderCreateModalTable />)}
			</div>
		</>
	);
};


export default SearchModalContent;
