// pages/year.js
import React, { useEffect } from "react";
import { Form, } from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalButton from "@components/searchModal/SearchModalButton";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";
import CsCreateModalTable from "@components/cs/create/CsCreateModalTable";
import CsHistoryModalTable from "@components/cs/create/CsHistoryModalTable";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";

const SearchModalContent = ({ searchLocation, searchType, modalStore, inBoxType}) => {

	const [form] = Form.useForm();

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} inBoxType={inBoxType} />

				<SearchModalButton form={form} modalStore={modalStore} />

				{(searchLocation === "order" && searchType === "OPEN") && (
					<OrderCreateModalTable modalStore={modalStore} />)}

				{(searchLocation === "cs" && searchType === "OPEN") && (
					<CsCreateModalTable modalStore={modalStore} />)}
				{(searchLocation === "cs" && searchType === "HISTORY") && (
					<CsHistoryModalTable form={form} modalStore={modalStore} />)}
			</div>
		</>
	);
};


export default SearchModalContent;
