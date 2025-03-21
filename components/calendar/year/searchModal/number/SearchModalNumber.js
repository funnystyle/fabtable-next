// pages/year.js
import React, { useState } from "react";
import "dayjs/locale/ko";
import SearchModalNumberForm from "@components/calendar/year/searchModal/number/SearchModalNumberForm";
import { Form } from "antd";
import SearchModalFormHead from "@components/calendar/year/searchModal/SearchModalFormHead";

const SearchModalNumber = ({ form, title, order, searchLocation, searchDiv }) => {

	const [searchCount, setSearchCount] = useState(1);

	return (
		<>
			<SearchModalFormHead form={form} title={title} />

			<Form form={form} layout="vertical" className="modal-input-area">
				{Array.from({ length: searchCount }, (_, i) => (
					<SearchModalNumberForm key={i} form={form} order={order} searchLocation={searchLocation} searchDiv={searchDiv} index={i + 1} searchCount={searchCount} setSearchCount={setSearchCount} />
				))}
			</Form>
		</>
	);
};


export default SearchModalNumber;
