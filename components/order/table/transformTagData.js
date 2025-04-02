// pages/order.js
import React from "react";
import { Tag, } from "antd";

export const transformTag = (tagInfoList) => {
	const tagInfoMap = new Map();

	// tagInfoList에서 모든 태그 코드 매핑 생성
	tagInfoList.forEach(tagInfo => {
		tagInfo.codeList.forEach(code => {
			tagInfoMap.set(`${tagInfo.name}_${code.codeName}`, code.className);
		});
	});

	return tagInfoMap;
}

export const transformTagDataSingle = (tagInfoList, nowState) => {
	// nowState가 없을 경우 원본 문자열 반환
	if (!nowState) {
		return "";
	}

	const tagInfoMap = transformTag(tagInfoList);

	for (const tagInfo of tagInfoList) {
		const tagKey = `${tagInfo.name}_${nowState}`;
		if (tagInfoMap.has(tagKey)) {
			return <Tag className={tagInfoMap.get(tagKey)}>{nowState}</Tag>;
		}
	}

	return nowState;
}

export const transformTagData = (data) => {
	// data == {} 일때 에러 발생
	if (data === undefined || data === null || data.list === undefined || data.list === null) {
		return [];
	}

	const tagInfoMap = transformTag(data.tagInfoList);

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
