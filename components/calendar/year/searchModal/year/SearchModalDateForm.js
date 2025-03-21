// pages/year.js
import React, { useState } from "react";
import { Flex, } from "antd";
import "dayjs/locale/ko";
import SearchModalDateFormInput from "@components/calendar/year/searchModal/year/SearchModalDateFormInput";
import SearchModalFormDateButtonArea from "@components/calendar/year/searchModal/year/SearchModalFormDateButtonArea";

const SearchModalDateForm = ({form, order, index, searchLocation, searchDiv, year, setYear}) => {

	const [inputName, setInputName] = useState(`search-${order}-${index}-input`);

	const handleReset = () => {
		form.resetFields([inputName]);
	};

	return (
		<Flex gap={8} align="center" justify="space-between" className="year-select-area">
			<SearchModalDateFormInput name={inputName} year={year} setYear={setYear} />

			<SearchModalFormDateButtonArea handleReset={handleReset} />
		</Flex>
	);
};


export default SearchModalDateForm;
