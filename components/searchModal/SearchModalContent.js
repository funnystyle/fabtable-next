// pages/year.js
import React from "react";
import { Form, } from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalButton from "@components/searchModal/SearchModalButton";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";

const SearchModalContent = ({ searchLocation, searchType }) => {

	const [form] = Form.useForm();

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} />

				<SearchModalButton form={form} />

				{(searchLocation === "order" || searchType === "OPEN") && (<OrderCreateModalTable contentHeight={0} />)}
			</div>
		</>
	);
};


export default SearchModalContent;
