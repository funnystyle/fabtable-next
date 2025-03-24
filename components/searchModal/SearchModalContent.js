// pages/year.js
import React from "react";
import {Form,} from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalButton from "@components/searchModal/SearchModalButton";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderOpenModalRecordList from "@components/order/create/OrderOpenModalRecordList";

const SearchModalContent = ({ searchLocation }) => {

	const pathname = window.location.pathname;
	const [form] = Form.useForm();

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} />

				<SearchModalButton form={form} />

				{pathname === "/order/create" && (<OrderOpenModalRecordList />)}
			</div>
		</>
	);
};


export default SearchModalContent;
