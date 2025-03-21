// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import "dayjs/locale/ko";

const SearchModalDateHead = ({form}) => {

	const handleReset = () => {
		form.resetFields();
	}

	return (
		<Flex align="center" gap={4} className="tit-area">
			<p className="tit-type">기간/날짜</p>

			<Button type="link" className="btn-reset-txt">
				초기화
			</Button>
		</Flex>
	);
};


export default SearchModalDateHead;
