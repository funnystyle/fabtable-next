// pages/year.js
import React from "react";
import { Form, Radio, } from "antd";
import "dayjs/locale/ko";

const SearchModalFormRadio = ({ index, name, valueList, value, setValue, wide=false }) => {

	const handleChange = (e) => {
		setValue(e.target.value);
	}

	return (
	<Form.Item className={`select-radio-area${wide ? " select-radio-area2" : ''}`} name={name} initialValue={value}>
		<Radio.Group defaultValue={valueList[0]?.value}
			onChange={handleChange}>
			{valueList.map((item, i) => (
				<Radio key={i} value={item.value}>
					{item.label}
				</Radio>
			))}
		</Radio.Group>
	</Form.Item>
	);
};


export default SearchModalFormRadio;
