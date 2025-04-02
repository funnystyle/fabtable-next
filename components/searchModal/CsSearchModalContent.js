// pages/year.js
import React from "react";
import {Form,} from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";
import CsCreateModalTable from "@components/cs/create/CsCreateModalTable";
import CsSearchModalButton from "@components/searchModal/CsSearchModalButton";
import {useGetCsList} from "@components/api/useGetCsList";

const CsSearchModalContent = ({ searchLocation, searchType }) => {

	const [form] = Form.useForm();

	const { handleReload, isPending } = useGetCsList(true, false);

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} />

				<CsSearchModalButton form={form} handleReload={handleReload} />

				{(searchLocation === "cs" && searchType === "OPEN") && (<CsCreateModalTable contentHeight={0} isPending={isPending} />)}
			</div>
		</>
	);
};


export default CsSearchModalContent;
