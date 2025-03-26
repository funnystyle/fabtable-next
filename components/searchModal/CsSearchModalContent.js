// pages/year.js
import React from "react";
import {Form,} from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalBody from "@components/searchModal/SearchModalBody";
import OrderCreateModalTable from "@components/order/create/OrderCreateModalTable";
import CsCreateModalTable from "@components/cs/create/CsCreateModalTable";
import CsSearchModalButton from "@components/searchModal/CsSearchModalButton";

const CsSearchModalContent = ({ searchLocation, searchType }) => {

	const [form] = Form.useForm();

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalBody form={form} searchLocation={searchLocation} searchType={searchType} />

				<CsSearchModalButton form={form} />

				{(searchLocation === "cs" && searchType === "OPEN") && (<CsCreateModalTable contentHeight={0} />)}
			</div>
		</>
	);
};


export default CsSearchModalContent;
