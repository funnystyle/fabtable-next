// pages/year.js
import React, { useState } from "react";
import { Flex, } from "antd";
import "dayjs/locale/ko";
import SearchModalNormalFormInput from "@components/calendar/year/searchModal/normal/SearchModalNormalFormInput";
import SearchModalFormSelect from "@components/calendar/year/searchModal/SearchModalFormSelect";
import SearchModalFormRadio from "@components/calendar/year/searchModal/SearchModalFormRadio";
import SearchModalFormButtonArea from "@components/calendar/year/searchModal/SearchModalFormButtonArea";

const SearchModalNormalForm = ({form, order, index, searchLocation, searchDiv, searchCount, setSearchCount}) => {

	const [selectName, setSelectName] = useState(`search-${order}-${index}-select`);
	const [radioName, setRadioName] = useState(`search-${order}-${index}-radio`);
	const [inputName, setInputName] = useState(`search-${order}-${index}-input`);

	const handleReset = () => {
		form.resetFields([selectName, radioName, inputName]);
	};

	return (
		<Flex gap={8} align="center">
			<SearchModalFormSelect form={form} name={selectName} searchLocation={searchLocation} searchDiv={searchDiv} />

			<SearchModalFormRadio index={index} name={radioName} valueList={[
				{label:"포함", value:"like"}
				, {label:"미포함", value:"except"}
				, {label:"일치", value:"equal"}
				]} />

			<SearchModalNormalFormInput name={inputName} />

			<SearchModalFormButtonArea form={form} handleReset={handleReset} order={order} index={index} searchCount={searchCount} setSearchCount={setSearchCount} />
		</Flex>
	);
};


export default SearchModalNormalForm;
