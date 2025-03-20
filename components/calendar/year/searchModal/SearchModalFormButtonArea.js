// pages/year.js
import React from "react";
import { Button, Flex, Form, } from "antd";
import { MinusOutlined, PlusOutlined, RedoOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";

const SearchModalFormButtonArea = ({ form, handleReset, order, index, searchCount, setSearchCount }) => {

	const handleAdd = () => {
		setSearchCount(searchCount + 1);
	}

	const handleMinus = () => {
		const fieldTypes = ["select", "radio", "input", "input2"];

		// 현재 삭제할 필드 리셋
		form.resetFields(fieldTypes.map(type => `search-${order}-${index}-${type}`));

		for (let i = index + 1; i <= searchCount; i++) {
			let newValues = {};

			fieldTypes.forEach(type => {
				newValues[`search-${order}-${i - 1}-${type}`] = form.getFieldValue(`search-${order}-${i}-${type}`);
			});

			form.setFieldsValue(newValues);

			if (i === searchCount) {
				form.resetFields(fieldTypes.map(type => `search-${order}-${i}-${type}`));
			}
		}

		if (searchCount > 1) {
			setSearchCount(searchCount - 1);
		}
	};

	return (
		<Form.Item className="btn-add-area">
			<Flex gap={4}>
				<Button
					icon={<RedoOutlined />}
					size="small"
					className="icon-redo"
					onClick={handleReset}
				/>

				{index === 1 ?
					<Button icon={<PlusOutlined />} size="small" onClick={handleAdd} />
					:
					<Button icon={<MinusOutlined />} size="small" onClick={handleMinus} />
				}
			</Flex>
		</Form.Item>
	);
};


export default SearchModalFormButtonArea;
