// pages/year.js
import React from "react";
import { Form, } from "antd";
import "dayjs/locale/ko";
import SearchModalButton from "@components/searchModal/SearchModalButton";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";
import CsCreateModalTable from "@components/cs/create/CsCreateModalTable";
import CsHistoryModalTable from "@components/cs/create/CsHistoryModalTable";
import CsDetailHistoryModalTable from "@components/cs/create/CsDetailHistoryModalTable";
import SearchModalHead from "@components/searchModal/SearchModalHead";

const SearchModalContent = ({ searchLocation, searchType, modalStore, inBoxType}) => {

	const [form] = Form.useForm();

	return (
		<>
			<SearchModalHead form={form} modalStore={modalStore} searchType={searchType}/>

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} inBoxType={inBoxType} modalStore={modalStore} />

				<SearchModalButton form={form} modalStore={modalStore} searchType={searchType} />

				{(searchLocation === "order" && searchType === "OPEN") && (
					<OrderCreateModalTable modalStore={modalStore} />)}

				{(searchLocation === "cs" && searchType === "OPEN") && (
					<CsCreateModalTable modalStore={modalStore} />)}
				{(searchLocation === "cs" && searchType === "HISTORY") && (
					<CsHistoryModalTable form={form} modalStore={modalStore} />)}
				{(searchLocation === "cs" && searchType === "HISTORY_DETAIL") && (
					<CsDetailHistoryModalTable form={form} modalStore={modalStore} />)}
			</div>
		</>
	);
};


export default SearchModalContent;
