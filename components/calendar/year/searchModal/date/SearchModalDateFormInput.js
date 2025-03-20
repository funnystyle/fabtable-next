// pages/year.js
import React from "react";
import { DatePicker, Form, } from "antd";
import "dayjs/locale/ko";

const SearchModalDateFormInput = ({name}) => {

	const { RangePicker } = DatePicker;

	return (
		<Form.Item
			style={{
				width: "750px",
			}}
			name={name}
		>
			<RangePicker
				picker="year"
				style={{
					width: "100%",
				}}
				id={{
					start: "startInput",
					end: "endInput",
				}}
				onFocus={(_, info) => {
					console.log("Focus:", info.range);
				}}
				onBlur={(_, info) => {
					console.log("Blur:", info.range);
				}}
			/>
		</Form.Item>
	);
};

export default SearchModalDateFormInput;
