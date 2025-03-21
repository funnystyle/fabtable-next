// pages/year.js
import React, { useState } from "react";
import "dayjs/locale/ko";
import { Form } from "antd";
import SearchModalDateHead from "@components/calendar/year/searchModal/year/SearchModalDateHead";
import SearchModalDateForm from "@components/calendar/year/searchModal/year/SearchModalDateForm";

const SearchModalYear = ({ form, title, order, searchLocation, searchDiv, year, setYear }) => {

	const [searchCount, setSearchCount] = useState(1);

	return (
		<>
			<SearchModalDateHead form={form} />

			<Form form={form} layout="vertical" className="modal-input-area">
				{Array.from({ length: searchCount }, (_, i) => (
					<SearchModalDateForm key={i} form={form} order={order} searchLocation={searchLocation} searchDiv={searchDiv} index={i + 1}
						year={year} setYear={setYear}
					/>
				))}
			</Form>
		</>
	);
};


export default SearchModalYear;
