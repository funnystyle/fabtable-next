// pages/year.js
import React from "react";
import { Form, Input, } from "antd";
import "dayjs/locale/ko";

const SearchModalNormalFormInput = ({ name }) => {

	return (
		<Form.Item name={name}>
			<Input placeholder="-" />
		</Form.Item>
	);
};

export default SearchModalNormalFormInput;
