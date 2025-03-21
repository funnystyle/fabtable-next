// pages/year.js
import React from "react";
import { Button, Flex, Form, } from "antd";
import { RedoOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";

const SearchModalFormDateButtonArea = ({ handleReset }) => {

	return (
		<Form.Item className="btn-add-area">
			<Flex gap={4}>
				<Button
					icon={<RedoOutlined />}
					size="small"
					className="icon-redo"
					onClick={handleReset}
				/>
			</Flex>
		</Form.Item>
	);
};


export default SearchModalFormDateButtonArea;
