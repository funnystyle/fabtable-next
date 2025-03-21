// pages/year.js
import React from "react";
import {Form,} from "antd";
import "dayjs/locale/ko";
import YearDateFormRangePicker from "@components/calendar/year/searchModal/date/YearDateFormRangePicker";

const SearchModalDateFormInput = ({name, year, setYear}) => {

	return (
		<Form.Item style={{width: "750px",}}>
			<YearDateFormRangePicker year={year} setYear={setYear} style={{ width: "100%", }} />
		</Form.Item>
	);
};

export default SearchModalDateFormInput;
