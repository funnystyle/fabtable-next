// pages/year.js
import React, { useEffect, useState } from "react";
import { Form, Select, } from "antd";
import "dayjs/locale/ko";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const SearchModalFormSelect = ({ form, name, searchLocation, searchDiv, defaultVal="" }) => {

	const defaultValExist = defaultVal !== "";

	const [list, setList] = useState([]);
	const [defaultValue, setDefaultValue] = useState(defaultVal);
	const [value, setValue] = useState(defaultVal);
	const [queryKey, setQueryKey] = useState(["recordColumnSearchListResponse", searchLocation, searchDiv, Math.random()]);
	const { data:recordColumnSearchListResponse, isSuccess} = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/record-column/search/column", {searchDiv, searchLocation}),
	});

	useEffect(() => {
		if (isSuccess) {
			const transformedList = recordColumnSearchListResponse.data.list.map(item => ({
				value: item.name,
				label: item.displayName
			}));
			setList(transformedList);
			if (!defaultValExist) {
				const defaultValue = recordColumnSearchListResponse.data.defaultColumnName;
				setDefaultValue(defaultValue);
				setValue(defaultValue);
			}

			setTimeout(() => {
				form.resetFields([name]);
			}, 10);
		}
	}, [isSuccess]);

	return (
		<Form.Item
			style={{
				width: "160px",
				flex: "none",
			}}
			name={name}
			initialValue={defaultValue}
		>
			<Select
				showSearch
				allowClear
				filterOption={(input, option) =>
					(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
				}
				defaultValue={defaultValue}
				value={value}
				onChange={(value) => setValue(value)}
				options={list}
			/>
		</Form.Item>
	);
};


export default SearchModalFormSelect;
