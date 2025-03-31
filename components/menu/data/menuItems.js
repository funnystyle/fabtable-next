// pages/index.js
import React from "react";
// import dynamic from "next/dynamic";
import { AreaChartOutlined, AudioFilled, CalendarFilled, DatabaseOutlined, EditFilled, FolderOpenFilled, FontColorsOutlined, GoldFilled, IdcardFilled, TeamOutlined, ToolFilled, TrademarkCircleFilled, UserAddOutlined, } from "@ant-design/icons";

// 🔹 메뉴 항목 정의
export const basicItems = [
	{
		key: "1",
		label: "대시보드",
		url: "/dashboard",
		icon: <GoldFilled />,
	},
	{
		key: "2",
		label: "일정 관리",
		icon: <CalendarFilled />,
		children: [
			{
				key: "2-1",
				label: "연간 종합 일정",
				url: "/calendar/year",
			},
			// {
			// 	key: "2-2",
			// 	label: "연간 종합 일정(3개년)",
			// 	url: "/publish/year3",
			// },
			{
				key: "2-2",
				label: "월간 종합 일정",
				url: "/calendar/month",
			},
		],
	},
	// {
	// 	key: "33",
	// 	label: "영업 관리(퍼블)",
	// 	// url: "/publish/order",
	// 	icon: <EditFilled />,
	// 	children: [
	// 		{
	// 			key: "33-1",
	// 			label: "수주 현황 목록(퍼블)",
	// 			url: "/publish/order",
	// 		},
	// 		{
	// 			key: "33-2",
	// 			label: "수주 등록 · 상세(퍼블)",
	// 			url: "/publish/orderwrite",
	// 		},
	// 	],
	// },
	{
		key: "3",
		label: "영업 관리",
		// url: "/publish/order",
		icon: <EditFilled />,
		children: [
			{
				key: "3-1",
				label: "수주 현황 목록",
				url: "/order/list",
			},
			{
				key: "3-2",
				label: "수주 등록 · 상세",
				url: "/order/create",
			},
		],
	},
	// {
	// 	key: "44",
	// 	label: "CS 관리(퍼블)",
	// 	// url: "/publish/cs",
	// 	icon: <AudioFilled />,
	// 	children: [
	// 		{
	// 			key: "44-1",
	// 			label: "C/S 현황 목록(퍼블)",
	// 			url: "/publish/cs",
	// 		},
	// 		{
	// 			key: "44-2",
	// 			label: "C/S 등록 · 상세(퍼블)",
	// 			url: "/publish/cswrite",
	// 		},
	// 	],
	// },
	{
		key: "4",
		label: "CS 관리",
		// url: "/publish/cs",
		icon: <AudioFilled />,
		children: [
			{
				key: "4-1",
				label: "C/S 현황 목록",
				url: "/cs/list",
			},
			{
				key: "4-2",
				label: "C/S 등록 · 상세",
				url: "/cs/create",
			},
		],
	},	
	{
		key: "5",
		label: "생산 관리",
		url: "/publish/produce",
		icon: <ToolFilled />,
	},
	{
		key: "6",
		label: "품질 관리",
		url: "/publish/qc",
		icon: <TrademarkCircleFilled />,
	},
	{
		key: "7",
		label: "통계 관리",
		icon: <AreaChartOutlined />,
		children: [
			{
				key: "7-1",
				label: "불량률 현황",
				url: "/publish/statistic/noncommerce",
			},
			{
				key: "7-2",
				label: "사이클 타임",
				url: "/publish/statistic/cycletime",
			},
			{
				key: "7-3",
				label: "SPC 현황",
				url: "/publish/statistic/spc",
			},
		],
	},
];

export const adminItems = [
	{
		key: "admin-1",
		label: "기초 코드 관리",
		url: "/publish/admin/code",
		icon: <FontColorsOutlined />,
	},
	{
		key: "admin-2",
		label: "기준 정보 관리",
		icon: <DatabaseOutlined />,
		children: [
			{
				key: "admin-2-1",
				label: "제품 관리",
				url: "/publish/admin/product",
			},
			{
				key: "admin-2-2",
				label: "부서별 현황 관리",
				url: "/publish/admin/product",
			},
			{
				key: "admin-2-3",
				label: "부서별 상세 화면 관리",
				url: "/publish/admin/detail",
			},
			{
				key: "admin-2-4",
				label: "부적합 관리",
				children: [
					{
						key: "admin-2-4-1",
						label: "부적합 종류 관리",
						url: "/publish/admin/noncommerce/type",
					},
					{
						key: "admin-2-4-3",
						label: "등록 및 조치사항 설정",
						url: "/publish/admin/noncommerce/config",
					},
				],
			},
		],
	},
	{
		key: "admin-3",
		label: "양식 및 파일 관리",
		url: "/publish/admin/file",
		icon: <FolderOpenFilled />,
	},
	{
		key: "admin-4",
		label: "부서 및 직급 관리",
		url: "/publish/admin/depart",
		icon: <IdcardFilled />,
	},
	{
		key: "admin-5",
		label: "사용자 등록 관리",
		url: "/publish/admin/user",
		icon: <UserAddOutlined />,
	},
	{
		key: "admin-6",
		label: "공정 작업자 관리",
		url: "/publish/admin/worker",
		icon: <TeamOutlined />,
	},
];
