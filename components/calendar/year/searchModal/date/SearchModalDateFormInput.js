// pages/year.js
import React from "react";
import {DatePicker, Flex, Form, InputDate,} from "antd";
import "dayjs/locale/ko";

const { RangePicker } = DatePicker;

const SearchModalDateFormInput = ({ name, range }) => {

	return (
		<>
			<Form.Item name={name}>
				{range ?
						<RangePicker
							showTime={{
								format: "HH:mm",
							}}
							format="YYYY-MM-DD HH:mm"
							onChange={(value, dateString) => {
								console.log("Selected Time: ", value);
								console.log("Formatted Selected Time: ", dateString);
							}}
						/>
					:
						<DatePicker
							showTime
							onChange={(value, dateString) => {
								console.log("Selected Time: ", value);
								console.log("Formatted Selected Time: ", dateString);
							}}
							style={{
								width: "100%",
							}}
						/>
				}
			</Form.Item>
		</>
	);
};

export default SearchModalDateFormInput;