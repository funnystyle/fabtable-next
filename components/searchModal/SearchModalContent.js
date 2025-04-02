// pages/year.js
import React from "react";
import {Form,} from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalButton from "@components/searchModal/SearchModalButton";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";
import CsCreateModalTable from "@components/cs/create/CsCreateModalTable";
import {useGetRecords} from "@components/api/useGetRecords";

const SearchModalContent = ({ searchLocation, searchType }) => {

	const [form] = Form.useForm();

	const { handleReload, isPending } = useGetRecords(true, false);

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} />

				<SearchModalButton form={form} handleReload={handleReload} />

				{(searchLocation === "order" && searchType === "OPEN") && (<OrderCreateModalTable isPending={isPending} />)}
			</div>
		</>
	);
};


export default SearchModalContent;
