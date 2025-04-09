// pages/year.js
import React, { useEffect, useState } from "react";
import { Flex, } from "antd";
import "dayjs/locale/ko";
import SearchModalDateFormInput from "@components/calendar/year/searchModal/date/SearchModalDateFormInput";
import SearchModalFormSelect from "@components/calendar/year/searchModal/SearchModalFormSelect";
import SearchModalFormRadio from "@components/calendar/year/searchModal/SearchModalFormRadio";
import SearchModalFormButtonArea from "@components/calendar/year/searchModal/SearchModalFormButtonArea";

const SearchModalDateForm = ({form, order, index, searchLocation, searchType, searchDiv, searchCount, setSearchCount}) => {

	const [selectName, setSelectName] = useState(`search-${order}-${index}-select`);
	const [radioName, setRadioName] = useState(`search-${order}-${index}-radio`);
	const [inputName, setInputName] = useState(`search-${order}-${index}-input`);

	const [value, setValue] = useState("equalDate");
	const [range, setRange] = useState(true);
	const handleReset = () => {
		form.resetFields([selectName, radioName, inputName]);
	};

	useEffect(() => {
		setRange(value === "rangeDate");
	}, [value]);

	useEffect(() => {
		form.resetFields([inputName]);
	}, [range]);

	return (
		<Flex gap={8} align="center">
			<SearchModalFormSelect form={form} name={selectName} searchLocation={searchLocation} searchDiv={searchDiv} defaultVal={searchLocation === "order" && searchType === "LIST" && index === 2 ? "scheduledDeliveryDate" : ""} />

			<SearchModalFormRadio index={index} name={radioName} valueList={[
				{label:"기간", value:"rangeDate"}
				, {label:"이전", value:"lessOrEqualDate"}
				, {label:"이후", value:"greaterOrEqualDate"}
				, {label:"일치", value:"equalDate"}
			]} value={value} setValue={setValue} wide={true} />

			<SearchModalDateFormInput name={inputName} range={range}/>

			<SearchModalFormButtonArea form={form} handleReset={handleReset} order={order} index={index} searchCount={searchCount} setSearchCount={setSearchCount} />
		</Flex>
	);
};


export default SearchModalDateForm;
