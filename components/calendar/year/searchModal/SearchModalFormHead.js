// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import "dayjs/locale/ko";

const SearchModalFormHead = ({form, title}) => {

	const handleReset = () => {
		form.resetFields();
	}

	return (
		<Flex align="center" gap={4} className="tit-area">
			<p className="tit-type">{title}</p>

			<Button type="link" className="btn-reset-txt" onClick={() => handleReset()}>
				초기화
			</Button>
		</Flex>
	);
};


export default SearchModalFormHead;
