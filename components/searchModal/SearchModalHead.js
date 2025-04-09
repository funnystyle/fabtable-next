// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import "dayjs/locale/ko";

const SearchModalHead = ({ form, modalStore, searchType }) => {

	const { setData, setList, setTotal, } = modalStore();

	const handleReset = () => {
		form.resetFields();
		if (searchType === "LIST") return
		setList([]);
		setData(null);
		setTotal(0);
	};

	return (
		<Flex align="center" justify="space-between">
			<p className="total-txt">
				검색 카테고리별로 입력필드를 여러 개 추가, 삭제할 수 있습니다.
			</p>

			<Button type="link" className="btn-reset-txt"
				onClick={() => handleReset()}
			>
				전체 초기화
			</Button>
		</Flex>
	);
};


export default SearchModalHead;
