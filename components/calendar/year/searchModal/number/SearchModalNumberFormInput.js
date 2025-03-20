// pages/year.js
import React from "react";
import { Flex, Form, InputNumber, } from "antd";
import "dayjs/locale/ko";

const SearchModalNumberFormInput = ({ name, range }) => {

	return (
		<>
			<Flex gap={4}>
				<Form.Item name={name}>
						<InputNumber
							min={1}
							max={10000}
						/>
				</Form.Item>
			</Flex>
			{range && <Flex gap={4}>
				<Form.Item name={`${name}2`}>
					<InputNumber
						min={1}
						max={10000}
					/>
				</Form.Item>
			</Flex>}
		</>
	);
};

export default SearchModalNumberFormInput;