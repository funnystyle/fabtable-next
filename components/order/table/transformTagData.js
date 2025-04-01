// pages/order.js
import React from "react";
import { Tag, } from "antd";

export const transformTagData = (data) => {
	// data == {} 일때 에러 발생
	if (data === undefined || data === null || data.list === undefined || data.list === null) {
		return [];
	}

	const tagInfoMap = new Map();

	// tagInfoList에서 모든 태그 코드 매핑 생성
	data.tagInfoList.forEach(tagInfo => {
		tagInfo.codeList.forEach(code => {
			tagInfoMap.set(`${tagInfo.name}_${code.codeName}`, code.className);
		});
	});

	// list 데이터를 변환 (기존 데이터 유지하면서 태그 변환)
	return data.list.map((item) => {
		const updatedItem = { ...item };

		Object.keys(item).forEach(key => {
			const tagKey = `${key}_${item[key]}`;
			if (tagInfoMap.has(tagKey)) {
				updatedItem[key] = <Tag className={tagInfoMap.get(tagKey)}>{item[key]}</Tag>;
			}
		});

		return updatedItem;
	});
}
