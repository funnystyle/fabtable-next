// pages/order.js
import React, {useEffect, useState} from "react";
import {Button, Dropdown, Flex, Layout, Space,} from "antd";

import DrawerComponent from "@publish/components/drawer";
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";
import useDrawerStore from "@store/useDrawerStore";
import CsListTitle from "@components/cs/list/CsListTitle";
import CsListTable from "@components/cs/list/CsListTable";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import CsListSearchTags from "@components/cs/create/CsListSearchTags";

import {DownOutlined, RedoOutlined} from "@ant-design/icons";
import CsListButtonArea from "@components/cs/list/CsListButtonArea";
import {useGetCsList} from "@components/api/useGetCsList";
import {useGetCodeList} from "@components/api/useGetCodeList";

const operationItems = [
	{
		label: "접수내용",
		key: "1",
	},
	{
		label: "진행내역",
		key: "2",
	},
	{
		label: "출장내역",
		key: "3",
	},
	{
		label: "후속조치",
		key: "4",
	},
];

const stateItems = [
	{
		label: "접수",
		key: "1",
	},
	{
		label: "진행",
		key: "2",
	},
	{
		label: "종결",
		key: "3",
	},
	{
		label: "취소",
		key: "4",
	},
];

const handleMenuClick = (e) => {
	// message.info("Click on menu item.");
	console.log("click", e);
};

const excelItems = [
	{
		label: "편집 항목만",
		key: "1",
		children: [
			{
				key: "1-1",
				label: "선택한 행",
			},
			{
				key: "1-2",
				label: "전체 행",
			},
		],
	},
	{
		label: "전체 항목",
		key: "2",
		children: [
			{
				key: "2-1",
				label: "선택한 행",
			},
			{
				key: "2-2",
				label: "전체 행",
			},
		],
	},
];

const printItems = [
	{
		label: "프린트",
		key: "1",
	},
	{
		label: "양식 다운로드",
		key: "2",
	},
];

const OrderComponent = ({ contentHeight, isActive=true }) => {

	const { handleReload, isPending } = useGetCsList();

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	return (
		<Layout>
			<div className="contents-flex">
				<CsListTitle title="C/S 관리" isActive={isActive}/>

				{/*<CsCreateTab activeKey={1} />*/}

				{/*  검색결과 */}
				<CsListSearchTags />

				{/* 상단 버튼 */}
				<CsListButtonArea handleReload={handleReload} />

				{/* 태그 없음, 헤더 관련 정리 event */}
				<CsListTable contentHeight={contentHeight} isPending={isPending}/>

				{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
				<div style={{ display: openDrawer ? "block" : "none" }}>
					<DrawerComponent />
				</div>
			</div>
		</Layout>
	);
};

export default OrderComponent;
