// pages/year.js
import React, { useState } from "react";
import "dayjs/locale/ko";
import SearchModalNormalForm from "@components/calendar/year/searchModal/normal/SearchModalNormalForm";
import { Form } from "antd";
import SearchModalFormHead from "@components/calendar/year/searchModal/SearchModalFormHead";

const SearchModalNormal = ({ form, title, order, searchLocation, searchDiv }) => {

	const [searchCount, setSearchCount] = useState(1);

	return (
		<>
			<SearchModalFormHead form={form} title={title} />

			<Form form={form} layout="vertical" className="modal-input-area">
				{Array.from({ length: searchCount }, (_, i) => (
					<SearchModalNormalForm key={i} form={form} order={order} searchLocation={searchLocation} searchDiv={searchDiv} index={i + 1} searchCount={searchCount} setSearchCount={setSearchCount} />
				))}
			</Form>
		</>
	);
};


export default SearchModalNormal;
