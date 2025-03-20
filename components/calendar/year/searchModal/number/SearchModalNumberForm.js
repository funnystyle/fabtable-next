// pages/year.js
import React, { useEffect, useState } from "react";
import { Flex, } from "antd";
import "dayjs/locale/ko";
import SearchModalNumberFormInput from "@components/calendar/year/searchModal/number/SearchModalNumberFormInput";
import SearchModalFormSelect from "@components/calendar/year/searchModal/SearchModalFormSelect";
import SearchModalFormRadio from "@components/calendar/year/searchModal/SearchModalFormRadio";
import SearchModalFormButtonArea from "@components/calendar/year/searchModal/SearchModalFormButtonArea";

const SearchModalNumberForm = ({form, order, index, searchLocation, searchDiv, searchCount, setSearchCount}) => {

	const [selectName, setSelectName] = useState(`search-${order}-${index}-select`);
	const [radioName, setRadioName] = useState(`search-${order}-${index}-radio`);
	const [inputName, setInputName] = useState(`search-${order}-${index}-input`);

	const [value, setValue] = useState("range");
	const [range, setRange] = useState(true);
	const handleReset = () => {
		form.resetFields([selectName, radioName, inputName]);
	};

	useEffect(() => {
		setRange(value === "range");
	}, [value]);

	return (
		<Flex gap={8} align="center">
			<SearchModalFormSelect form={form} name={selectName} searchLocation={searchLocation} searchDiv={searchDiv} />

			<SearchModalFormRadio index={index} name={radioName} valueList={[
				{label:"범위", value:"range"}
				, {label:"≤", value:"lessOrEqual"}
				, {label:"≥", value:"greaterOrEqual"}
				, {label:"=", value:"equal"}
			]} value={value} setValue={setValue} />

			<SearchModalNumberFormInput name={inputName} range={range}/>

			<SearchModalFormButtonArea form={form} handleReset={handleReset} order={order} index={index} searchCount={searchCount} setSearchCount={setSearchCount} />
		</Flex>
	);
};


export default SearchModalNumberForm;
