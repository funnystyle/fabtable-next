// pages/year.js
import React, { useState } from "react";
import "dayjs/locale/ko";
import SearchModalDateForm from "@components/calendar/year/searchModal/date/SearchModalDateForm";
import { Form } from "antd";
import SearchModalFormHead from "@components/calendar/year/searchModal/SearchModalFormHead";

const SearchModalDate = ({ form, title, order, searchLocation, searchType, searchDiv }) => {

	const [searchCount, setSearchCount] = useState(searchLocation === "order" && searchType === "LIST" ? 2 : 1);

	return (
		<>
			<SearchModalFormHead form={form} title={title} />

			<Form form={form} layout="vertical" className="modal-input-area">
				{Array.from({ length: searchCount }, (_, i) => (
					<SearchModalDateForm key={i} form={form} order={order} searchLocation={searchLocation} searchType={searchType} searchDiv={searchDiv} index={i + 1} searchCount={searchCount} setSearchCount={setSearchCount} />
				))}
			</Form>

		</>
	);
};


export default SearchModalDate;
