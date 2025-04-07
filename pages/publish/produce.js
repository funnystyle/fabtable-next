// pages/produce.js
import React, { useState, useContext, useRef, useEffect } from "react";
import {
	Layout,
	Typography,
	Button,
	Flex,
	Dropdown,
	Space,
	Checkbox,
	Divider,
	theme,
	Input,
	AutoComplete,
	Pagination,
	Table,
	Tag,
	Tooltip,
	Popover,
	message,
	Form,
	Select,
	Row,
	Col,
	Radio,
	InputNumber,
	Modal,
	DatePicker,
	Badge,
} from "antd";
import {
	RedoOutlined,
	DownOutlined,
	DownloadOutlined,
	FilterOutlined,
	CloseOutlined,
	SettingOutlined,
	VerticalRightOutlined,
	VerticalLeftOutlined,
	LeftOutlined,
	RightOutlined,
	PlusOutlined,
	MinusOutlined,
	QuestionCircleOutlined,
	CheckOutlined,
} from "@ant-design/icons";

import DrawerComponent from "@publish/components/drawer";
import Draggable from "react-draggable";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTab } from "@/context/TabContext";

const { useToken } = theme;
const { Title } = Typography;
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const onOk = (value) => {
	console.log("onOk: ", value);
};

const onChange = (e) => {
	console.log(`checked = ${e.target.checked}`);
};

const handlePopupOpen = () => {
	window.open(
		"produce_memo", // 경로
		"부서별 메모", // 팝업 이름
		"width=520,height=600,resizable=yes,scrollbars=yes" // TODO: 화면 중앙으로 띄울 것
	);
};

const TabItems = [
	{
		key: "sub2-1",
		label: "수주 현황 목록",
		url: "/publish/order",
	},
	{
		key: "sub2-2",
		label: "수주 등록 · 상세",
		url: "/publish/orderwrite",
	},
];

const handleMenuClick = (e) => {
	// message.info("Click on menu item.");
	console.log("click", e);
};

const stateItems = [
	{
		label: "처분대기",
		key: "1",
	},
	{
		label: "처분완료",
		key: "2",
	},
];

const excelItems = [
	{
		label: "편집 항목만",
		key: "1",
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

const lineItems = [
	{
		key: "1",
		type: "group",
		label: "목록 행 개수",
		children: [
			{
				key: "1-1",
				label: "10 행",
			},
			{
				key: "1-2",
				label: "20 행",
			},
			{
				key: "1-3",
				label: "30 행",
			},
			{
				key: "1-4",
				label: "50 행",
			},
			{
				key: "1-5",
				label: "100 행",
			},
			{
				key: "1-6",
				label: "150 행",
			},
			{
				key: "1-7",
				label: "200 행",
			},
			{
				key: "1-8",
				label: "500 행",
			},
		],
	},
];

const viewInfoItems = [
	{
		label: "수주 종합정보",
		key: "1",
	},
	{
		label: "부적합 이력",
		key: "2",
	},
	{
		label: "제어계수 정보",
		key: "3",
	},
	{
		label: "비율제어 정보",
		key: "4",
	},
	{
		label: (
			<span
				onClick={handlePopupOpen}
				style={{
					cursor: "pointer",
				}}
			>
				부서별 메모
			</span>
		),
		key: "5",
	},
];

const preventDefault = (e) => {
	e.preventDefault();
	console.log("Clicked! But prevent default.");
};

const ProduceComponent = ({ contentHeight }) => {
	const { token } = useToken();
	const [allChecked, setAllChecked] = useState(true);
	const [checkedItems, setCheckedItems] = useState(Array(16).fill(true));
	const [position, setPosition] = useState("end");
	const router = useRouter();
	const { addTab } = useTab();

	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};
	const menuStyle = {
		boxShadow: "none",
	};

	const handleAllChange = (e) => {
		const checked = e.target.checked;
		setAllChecked(checked);
		setCheckedItems(Array(17).fill(checked));
	};

	const handleItemChange = (index) => {
		const updated = [...checkedItems];
		updated[index] = !updated[index];
		setCheckedItems(updated);
		setAllChecked(updated.every(Boolean));
	};

	const items = Array.from({ length: 16 }, (_, i) => ({
		key: `${i + 1}`,
		label: (
			<div onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={checkedItems[i]}
					onChange={() => handleItemChange(i)}
				>
					{
						[
							"발주기입",
							"조립완료",
							"리크완료",
							"PID완료",
							"교정완료",
							"생산완료",
							"Rework",
							"검사진행",
							"검사완료",
							"판정대기",
							"입고완료",
							"납품완료",
							"반출대기",
							"반출완료",
							"처분대기",
							"처분완료",
						][i]
					}
				</Checkbox>
			</div>
		),
	}));

	const [searchItems, setSearchItems] = useState([
		{ title: "검색어1", date: "02.04" },
		{ title: "검색어2", date: "02.05" },
		{ title: "키워드3", date: "02.06" },
	]);

	// 개별 검색어 삭제
	const handleDelete = (title) => {
		setSearchItems(searchItems.filter((item) => item.title !== title));
	};

	// 전체 검색어 삭제
	const handleDeleteAll = () => {
		setSearchItems([]);
	};

	// 검색어 렌더링
	const renderItem = (title, date) => ({
		value: title,
		label: (
			<Flex align="center" justify="space-between">
				<span>{title}</span>

				<Flex align="center" gap="small">
					<span>{date}</span>

					<CloseOutlined
						className="close-x"
						onClick={(e) => {
							e.stopPropagation(); // 드롭다운 닫힘 방지
							handleDelete(title);
						}}
					/>
				</Flex>
			</Flex>
		),
	});

	// AutoComplete options 구성
	const options =
		searchItems.length > 0
			? [
					{
						label: (
							<Flex align="center" justify="space-between">
								<span>최근 검색어</span>
								<Button
									color="primary"
									variant="text"
									size="default"
									onClick={handleDeleteAll}
									className="all-delete"
								>
									모두 삭제
								</Button>
							</Flex>
						),
						options: searchItems.map((item) =>
							renderItem(item.title, item.date)
						),
					},
			  ]
			: [];

	const [current, setCurrent] = useState(2);
	const [inputValue, setInputValue] = useState("2");
	const totalItems = 50;
	const totalPages = Math.ceil(totalItems / 10);

	// 페이지 변경 핸들러
	const onChange = (page) => {
		setCurrent(page);
		setInputValue(page.toString());
	};

	// Input 핸들러
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setInputValue(value);
		}
	};

	// Input 엔터 및 포커스 아웃 핸들러
	const handleInputConfirm = () => {
		const pageNumber = Number(inputValue);
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrent(pageNumber);
		} else {
			setInputValue(current.toString());
		}
	};

	// 커스터마이즈된 버튼 렌더링
	const itemRender = (page, type, originalElement) => {
		if (type === "prev") {
			return <LeftOutlined />;
		}
		if (type === "next") {
			return <RightOutlined />;
		}
		if (type === "page" && page === current) {
			return (
				<Input
					style={{ width: 50, textAlign: "center" }}
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputConfirm}
					onPressEnter={handleInputConfirm}
					size="small"
				/>
			);
		}
		return originalElement;
	};

	// 테이블
	const [sortedInfo, setSortedInfo] = useState({
		// columnKey: "deliPlanDate",
		// order: "ascend",
	});
	const handleChange = (pagination, filters, sorter = {}) => {
		console.log("Various parameters", pagination, filters, sorter);
		setSortedInfo(sorter.columnKey ? sorter : {});
	};

	const stringSorter = (a, b, key) => {
		const textA = a[key]?.toString() || "";
		const textB = b[key]?.toString() || "";
		return textA.localeCompare(textB, "ko-KR");
	};

	// 날짜 정렬
	const dateSorter = (a, b, key) => {
		const getTime = (date) => {
			const parsed = Date.parse(date);
			return isNaN(parsed) ? Infinity : parsed;
		};
		return getTime(a[key]) - getTime(b[key]);
	};

	const columns = [
		{
			title: "No",
			showSorterTooltip: { title: "No" },
			dataIndex: "no",
			key: "no",
			sorter: (a, b) => a.no - b.no,
			sortOrder: sortedInfo.columnKey === "no" ? sortedInfo.order : null,
			ellipsis: true,
			width: 49,
		},
		{
			title: "시리얼번호",
			showSorterTooltip: { title: "시리얼번호" },
			dataIndex: "serialnum",
			key: "serialnum",
			sorter: (a, b) => stringSorter(a, b, "serialnum"),
			sortOrder: sortedInfo.columnKey === "serialnum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 115,
		},
		{
			title: "P/O번호",
			showSorterTooltip: { title: "P/O번호" },
			dataIndex: "poNum",
			key: "poNum",
			sorter: (a, b) => stringSorter(a, b, "poNum"),
			sortOrder: sortedInfo.columnKey === "poNum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "출고종류",
			showSorterTooltip: { title: "출고종류" },
			dataIndex: "release",
			key: "release",
			sorter: (a, b) => stringSorter(a, b, "release"),
			sortOrder: sortedInfo.columnKey === "release" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
		},
		{
			title: "프로젝트번호",
			showSorterTooltip: { title: "프로젝트번호" },
			dataIndex: "projectNum",
			key: "projectNum",
			sorter: (a, b) => stringSorter(a, b, "projectNum"),
			sortOrder:
				sortedInfo.columnKey === "projectNum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 105,
		},
		{
			title: "납품처",
			showSorterTooltip: { title: "납품처" },
			dataIndex: "vendor",
			key: "vendor",
			sorter: (a, b) => stringSorter(a, b, "vendor"),
			sortOrder: sortedInfo.columnKey === "vendor" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "납품계획일",
			showSorterTooltip: { title: "납품계획일" },
			dataIndex: "deliPlanDate",
			key: "deliPlanDate",
			align: "center",
			sorter: (a, b) => dateSorter(a, b, "deliPlanDate"),
			sortOrder:
				sortedInfo.columnKey === "deliPlanDate" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "납품일",
			showSorterTooltip: { title: "납품일" },
			dataIndex: "deliDate",
			key: "deliDate",
			align: "center",
			sorter: (a, b) => dateSorter(a, b, "deliDate"),
			sortOrder: sortedInfo.columnKey === "deliDate" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "장비코드",
			showSorterTooltip: { title: "장비코드" },
			dataIndex: "equipmentCode",
			key: "equipmentCode",
			sorter: (a, b) => stringSorter(a, b, "equipmentCode"),
			sortOrder:
				sortedInfo.columnKey === "equipmentCode" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "제품군",
			showSorterTooltip: { title: "제품군" },
			dataIndex: "product",
			key: "product",
			sorter: (a, b) => stringSorter(a, b, "product"),
			sortOrder: sortedInfo.columnKey === "product" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "모델",
			showSorterTooltip: { title: "모델" },
			dataIndex: "model",
			key: "model",
			sorter: (a, b) => stringSorter(a, b, "model"),
			sortOrder: sortedInfo.columnKey === "model" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "세부모델",
			showSorterTooltip: { title: "세부모델" },
			dataIndex: "detailmodel",
			key: "detailmodel",
			sorter: (a, b) => stringSorter(a, b, "detailmodel"),
			sortOrder:
				sortedInfo.columnKey === "detailmodel" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "제조번호",
			showSorterTooltip: { title: "제조번호" },
			dataIndex: "productNum",
			key: "productNum",
			sorter: (a, b) => stringSorter(a, b, "productNum"),
			sortOrder:
				sortedInfo.columnKey === "productNum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
		},
		{
			title: "제조버전",
			showSorterTooltip: { title: "제조버전" },
			dataIndex: "productVersion",
			key: "productVersion",
			sorter: (a, b) => stringSorter(a, b, "productVersion"),
			sortOrder:
				sortedInfo.columnKey === "productVersion" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
		},
		{
			title: "피팅종류",
			showSorterTooltip: { title: "피팅종류" },
			dataIndex: "fitting",
			key: "fitting",
			sorter: (a, b) => stringSorter(a, b, "fitting"),
			sortOrder: sortedInfo.columnKey === "fitting" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사이즈/씰",
			showSorterTooltip: { title: "사이즈/씰" },
			dataIndex: "size",
			key: "size",
			sorter: (a, b) => stringSorter(a, b, "size"),
			sortOrder: sortedInfo.columnKey === "size" ? sortedInfo.order : null,
			width: 85,
		},
		{
			title: "사용가스",
			showSorterTooltip: { title: "사용가스" },
			dataIndex: "useGas",
			key: "useGas",
			sorter: (a, b) => stringSorter(a, b, "useGas"),
			sortOrder: sortedInfo.columnKey === "useGas" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "유량",
			showSorterTooltip: { title: "유량" },
			dataIndex: "flow",
			key: "flow",
			sorter: (a, b) => stringSorter(a, b, "flow"),
			sortOrder: sortedInfo.columnKey === "flow" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: "C.F",
			showSorterTooltip: { title: "C.F" },
			dataIndex: "cf",
			key: "cf",
			sorter: (a, b) => stringSorter(a, b, "cf"),
			sortOrder: sortedInfo.columnKey === "cf" ? sortedInfo.order : null,
			width: 64,
		},
		{
			title: "환산유량",
			showSorterTooltip: { title: "환산유량" },
			dataIndex: "converseFlow",
			key: "converseFlow",
			sorter: (a, b) => stringSorter(a, b, "converseFlow"),
			sortOrder:
				sortedInfo.columnKey === "converseFlow" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사용 압력단위",
			showSorterTooltip: { title: "사용 압력단위" },
			dataIndex: "usePressUnit",
			key: "usePressUnit",
			sorter: (a, b) => stringSorter(a, b, "usePressUnit"),
			sortOrder:
				sortedInfo.columnKey === "usePressUnit" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "제어 압력단위",
			showSorterTooltip: { title: "제어 압력단위" },
			dataIndex: "controlPressUnit",
			key: "controlPressUnit",
			sorter: (a, b) => stringSorter(a, b, "controlPressUnit"),
			sortOrder:
				sortedInfo.columnKey === "controlPressUnit" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "압력(최저)",
			showSorterTooltip: { title: "압력(최저)" },
			dataIndex: "pressMin",
			key: "pressMin",
			sorter: (a, b) => stringSorter(a, b, "pressMin"),
			sortOrder: sortedInfo.columnKey === "pressMin" ? sortedInfo.order : null,
			width: 90,
		},
		{
			title: "압력(중심)",
			showSorterTooltip: { title: "압력(중심)" },
			dataIndex: "pressMid",
			key: "pressMid",
			sorter: (a, b) => stringSorter(a, b, "pressMid"),
			sortOrder: sortedInfo.columnKey === "pressMid" ? sortedInfo.order : null,
			width: 90,
		},
		{
			title: "압력(최대)",
			showSorterTooltip: { title: "압력(최대)" },
			dataIndex: "pressMax",
			key: "pressMax",
			sorter: (a, b) => stringSorter(a, b, "pressMax"),
			sortOrder: sortedInfo.columnKey === "pressMax" ? sortedInfo.order : null,
			width: 90,
		},
		{
			title: "노즐경",
			showSorterTooltip: { title: "노즐경" },
			dataIndex: "nozzle",
			key: "nozzle",
			sorter: (a, b) => stringSorter(a, b, "nozzle"),
			sortOrder: sortedInfo.columnKey === "nozzle" ? sortedInfo.order : null,
			ellipsis: true,
			width: 64,
		},
		{
			title: "바이패스 튜브",
			showSorterTooltip: { title: "바이패스 튜브" },
			dataIndex: "bypassTube",
			key: "bypassTube",
			sorter: (a, b) => stringSorter(a, b, "bypassTube"),
			sortOrder:
				sortedInfo.columnKey === "bypassTube" ? sortedInfo.order : null,
			ellipsis: true,
			width: 103,
		},
		{
			title: "센서종류",
			showSorterTooltip: { title: "센서종류" },
			dataIndex: "sensorKind",
			key: "sensorKind",
			sorter: (a, b) => stringSorter(a, b, "sensorKind"),
			sortOrder:
				sortedInfo.columnKey === "sensorKind" ? sortedInfo.order : null,
			ellipsis: true,
			width: 87,
		},
		{
			title: "MGMR",
			showSorterTooltip: { title: "MGMR" },
			dataIndex: "mgmr",
			key: "mgmr",
			align: "center",
			sorter: (a, b) => stringSorter(a, b, "mgmr"),
			sortOrder: sortedInfo.columnKey === "mgmr" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "특주번호",
			showSorterTooltip: { title: "특주번호" },
			dataIndex: "specialNum",
			key: "specialNum",
			align: "center",
			sorter: (a, b) => stringSorter(a, b, "specialNum"),
			sortOrder:
				sortedInfo.columnKey === "specialNum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 76,
		},
		{
			title: "현재상태",
			showSorterTooltip: { title: "현재상태" },
			dataIndex: "nowState",
			key: "nowState",
			align: "center",
			sorter: (a, b) => {
				const getText = (value) => {
					// JSX인 경우 children 속성에서 텍스트 추출
					if (React.isValidElement(value)) {
						return value.props.children;
					}
					// 문자열인 경우 그대로 반환
					return value;
				};

				const nameA = getText(a.nowState);
				const nameB = getText(b.nowState);

				// 문자 기준 사전순 정렬
				return nameA.localeCompare(nameB, "ko-KR");
			},
			sortOrder: sortedInfo.columnKey === "nowState" ? sortedInfo.order : null,
			ellipsis: true,
			width: 85,
		},
		{
			title: (
				<>
					QT
					<Tooltip
						title={
							<>
								PT : 생산 구분 / QT : 품질 구분
								<br />
								N : 일반 제품 (Normal)
								<br />
								QRn : 품질팀 재작업 횟수 (Quality Rework)
								<br />
								PRn : 생산팀 재작업 횟수 (Production Rework)
							</>
						}
					>
						<QuestionCircleOutlined
							style={{ marginLeft: "5px", color: "rgba(0,0,0,0.45)" }}
						/>
					</Tooltip>
				</>
			),
			// showSorterTooltip: { title: "QT" },
			dataIndex: "qt",
			key: "qt",
			sorter: (a, b) => stringSorter(a, b, "qt"),
			sortOrder: sortedInfo.columnKey === "qt" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: (
				<>
					PT
					<Tooltip
						title={
							<>
								PT : 생산 구분 / QT : 품질 구분
								<br />
								N : 일반 제품 (Normal)
								<br />
								QRn : 품질팀 재작업 횟수 (Quality Rework)
								<br />
								PRn : 생산팀 재작업 횟수 (Production Rework)
							</>
						}
					>
						<QuestionCircleOutlined
							style={{ marginLeft: "5px", color: "rgba(0,0,0,0.45)" }}
						/>
					</Tooltip>
				</>
			),
			// showSorterTooltip: { title: "PT" },
			dataIndex: "pt",
			key: "pt",
			sorter: (a, b) => stringSorter(a, b, "pt"),
			sortOrder: sortedInfo.columnKey === "pt" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: "포장 공정",
			showSorterTooltip: { title: "포장 공정" },
			dataIndex: "packingProcess",
			key: "packingProcess",
			sorter: (a, b) => stringSorter(a, b, "packingProcess"),
			sortOrder:
				sortedInfo.columnKey === "packingProcess" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "포장 완료일",
			showSorterTooltip: { title: "포장 완료일" },
			dataIndex: "packingComplete",
			key: "packingComplete",
			sorter: (a, b) => stringSorter(a, b, "packingComplete"),
			sortOrder:
				sortedInfo.columnKey === "packingComplete" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "포장 횟수",
			showSorterTooltip: { title: "포장 횟수" },
			dataIndex: "packingNum",
			key: "packingNum",
			sorter: (a, b) => stringSorter(a, b, "packingNum"),
			sortOrder:
				sortedInfo.columnKey === "packingNum" ? sortedInfo.order : null,
			width: 85,
			align: "center",
		},
		{
			title: "기본검사",
			showSorterTooltip: { title: "기본검사" },
			dataIndex: "basicTest",
			key: "basicTest",
			sorter: (a, b) => stringSorter(a, b, "basicTest"),
			sortOrder: sortedInfo.columnKey === "basicTest" ? sortedInfo.order : null,
			width: 87,
		},
		{
			title: "기본검사일",
			showSorterTooltip: { title: "기본검사일" },
			dataIndex: "basicTestDate",
			key: "basicTestDate",
			sorter: (a, b) => stringSorter(a, b, "basicTestDate"),
			sortOrder:
				sortedInfo.columnKey === "basicTestDate" ? sortedInfo.order : null,
			width: 103,
		},
		{
			title: "기본검사 횟수",
			showSorterTooltip: { title: "기본검사 횟수" },
			dataIndex: "basicTestNum",
			key: "basicTestNum",
			sorter: (a, b) => stringSorter(a, b, "basicTestNum"),
			sortOrder:
				sortedInfo.columnKey === "basicTestNum" ? sortedInfo.order : null,
			width: 110,
			align: "center",
		},
		{
			title: "최종검사 결과",
			showSorterTooltip: { title: "최종검사 결과" },
			dataIndex: "finalState",
			key: "finalState",
			align: "center",
			sorter: (a, b) => {
				const getText = (value) => {
					// JSX인 경우 children 속성에서 텍스트 추출
					if (React.isValidElement(value)) {
						return value.props.children;
					}
					// 문자열인 경우 그대로 반환
					return value;
				};

				const nameA = getText(a.finalState);
				const nameB = getText(b.finalState);

				// 문자 기준 사전순 정렬
				return nameA.localeCompare(nameB, "ko-KR");
			},
			sortOrder:
				sortedInfo.columnKey === "finalState" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "최종검사일",
			showSorterTooltip: { title: "최종검사일" },
			dataIndex: "finalTestDate",
			key: "finalTestDate",
			sorter: (a, b) => stringSorter(a, b, "finalTestDate"),
			sortOrder:
				sortedInfo.columnKey === "finalTestDate" ? sortedInfo.order : null,
			width: 103,
		},
		{
			title: "비고",
			showSorterTooltip: { title: "비고" },
			dataIndex: "etc",
			key: "etc",
			sorter: (a, b) => stringSorter(a, b, "etc"),
			sortOrder: sortedInfo.columnKey === "etc" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "영업팀 메모",
			showSorterTooltip: { title: "영업팀 메모" },
			dataIndex: "businessMemo",
			key: "businessMemo",
			sorter: (a, b) => stringSorter(a, b, "businessMemo"),
			sortOrder:
				sortedInfo.columnKey === "businessMemo" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "제조팀 메모",
			showSorterTooltip: { title: "제조팀 메모" },
			dataIndex: "makeMemo",
			key: "makeMemo",
			sorter: (a, b) => stringSorter(a, b, "makeMemo"),
			sortOrder: sortedInfo.columnKey === "makeMemo" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "품질팀 메모",
			showSorterTooltip: { title: "품질팀 메모" },
			dataIndex: "qualityMemo",
			key: "qualityMemo",
			sorter: (a, b) => stringSorter(a, b, "qualityMemo"),
			sortOrder:
				sortedInfo.columnKey === "qualityMemo" ? sortedInfo.order : null,
			width: 160,
		},
	];

	const openPopup = () => {
		window.open(
			"produce_popup2", // 경로
			"공정창", // 팝업 이름 (탭 이름)
			"width=1280,height=980,resizable=yes,scrollbars=yes"
		);
	};

	const popText = <span className="pop-title">S01</span>;
	const popContent = (
		<div className="pop-txt">
			▸ MARU7000s, MARU5000s, MARU3000s, ARA5000s
			<br />
			- 2% 구간 동 특성 검사
			<br />
			(제릭스 / JPA 2프로 교정 눈관리 라벨 부착)
			<br />
			<br />
			▸ MARU9000s
			<br />- 1% 구간 동 특성 검사
		</div>
	);

	const data = [
		{
			key: "1",
			no: 1,
			serialnum: "570241202090",
			poNum: "-",
			release: "제품 매출",
			projectNum: "SE24PE051",
			vendor: "원익IPS",
			deliPlanDate: "2024-12-26",
			deliDate: "2024-12-26",
			equipmentCode: "2207A",
			product: "MARU",
			model: "7000s",
			detailmodel: "7000",
			productNum: "A24-000019",
			productVersion: "230300.010",
			fitting: "IGS",
			size: "1.125”W",
			useGas: "N2",
			flow: "1000",
			cf: "1.000",
			converseFlow: "1000",
			usePressUnit: "PSI",
			controlPressUnit: "-",
			pressMin: "0",
			pressMid: "10",
			pressMax: "30",
			nozzle: "0.25",
			bypassTube: "G25X25X0",
			sensorKind: "4F센서",
			mgmr: "Y",
			specialNum: (
				<Popover
					placement="leftTop"
					autoAdjustOverflow={true}
					title={popText}
					content={popContent}
					overlayInnerStyle={{ backgroundColor: "#FFFBE6", maxWidth: "264px" }}
				>
					<Button type="text">S01</Button>
				</Popover>
			),
			nowState: <Tag className="CurrentStatus001">발주기입</Tag>,
			qt: "QR2",
			pt: "PR6",
			packingProcess: (
				<div>
					<span onClick={openPopup} style={{ cursor: "pointer" }}>
						<Badge color="#FFC069" text="작업대기" className="packing-bedge" />

						<Badge
							color="rgba(0,0,0,0.15)"
							text="작업대기"
							className="packing-bedge disabled"
							style={{
								color: "rgba(0, 0, 0, 0.25)",
							}}
						/>
						<Badge
							color="#1677FF"
							text="작업진행"
							className="packing-bedge"
							style={{
								color: "#0958D9",
							}}
						/>
						<Badge
							text="작업중단"
							status="error"
							className="packing-bedge"
							style={{
								color: "#FF4D4F",
							}}
						/>
						<Badge
							color="#389E0D"
							text="작업수정"
							className="packing-bedge"
							style={{
								color: "#389E0D",
							}}
						/>
						<Badge
							count={<CheckOutlined />}
							text="작업완료"
							className="packing-bedge complete"
						/>
					</span>
				</div>
			),
			packingComplete: "2024-12-28",
			packingNum: "1",
			basicTest: "검사대기",
			basicTestDate: "2024-12-28",
			basicTestNum: "1",
			finalState: (
				<div>
					<Tag className="tag-pass">PASS</Tag>
					<Tag className="tag-fail">FAIL</Tag>
					<Tag className="tag-none">----</Tag>
					<Tag className="tag-na">N/A</Tag>
				</div>
			),
			finalTestDate: "2024-12-28",
			etc: "연구 신제품",
			businessMemo: "선 진행, WC3110022",
			makeMemo: "45002874581 / 4050",
			qualityMemo: "업체기준 미달 업체기준 미달 미달미달미달 ",
		},
	];

	const [tags, setTags] = useState([
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
	]);

	// 개별 태그 삭제 핸들러
	const handleTagClose = (tagToRemove) => {
		setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
	};

	const handleTagDeleteAll = () => {
		setTags([]);
	};

	// --------- 드로어 관련
	const [openDrawer, setOpenDrawer] = useState(false); // Drawer 열림 상태
	const [drawerHeader, setDrawerHeader] = useState(null); // Drawer 헤더
	const [drawerContent, setDrawerContent] = useState(null); // Drawer 본문 내용
	const [drawerFooter, setDrawerFooter] = useState(null); // Drawer 푸터 버튼
	const [drawerTitle, setDrawerTitle] = useState(""); // Drawer 제목 상태
	const [selectedPrint, setSelectedPrint] = useState("label"); // ✅ 선택된 라벨 종류 상태
	const [selectedLabel, setSelectedLabel] = useState("radio1-1"); // ✅ 선택된 라벨 종류 상태

	const [form] = Form.useForm(); // ✅ Form 인스턴스 생성

	// 📌 인쇄 구분 선택 핸들러
	const handlePrintChange = (value) => {
		setSelectedPrint(value); // 선택된 값 업데이트
	};

	// 📌 라벨 설정 초기화 핸들러
	const handleLabelReset = () => {
		form.resetFields();
		setSelectedLabel("radio1-1"); // 선택된 값 업데이트
	};

	// 📌 라벨 종류 선택 핸들러
	const handleLabelChange = (e) => {
		setSelectedLabel(e.target.value); // 선택된 값 업데이트
	};

	// 📌 폼 값 변경 감지 및 상태 업데이트
	useEffect(() => {
		setDrawerContent(
			<>
				<Form form={form} layout="vertical">
					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type no-bullet">인쇄 구분</p>
					</Flex>

					<Form.Item>
						<Select
							defaultValue="label"
							onChange={handlePrintChange}
							options={[
								{
									value: "label",
									label: "라벨 인쇄",
								},
								{
									value: "report",
									label: "성적서 인쇄",
								},
							]}
						/>
					</Form.Item>

					{selectedPrint === "label" && (
						<>
							<Flex align="center" gap={4} className="tit-area">
								<p className="tit-type no-bullet">라벨 설정</p>

								<Button
									type="link"
									className="btn-reset-txt"
									onClick={handleLabelReset}
								>
									설정 초기화
								</Button>
							</Flex>

							<Row gutter={8}>
								<Col span={24}>
									<Form.Item label="라벨 종류" name="radio1">
										<Radio.Group
											onChange={handleLabelChange} // ✅ 라벨 선택 이벤트 핸들러 추가
											style={{
												display: "flex",
												flexDirection: "column",
												gap: 8,
											}}
											defaultValue="radio1-1"
										>
											<Radio value="radio1-1">라벨 1 --&gt; 2 --&gt; 3</Radio>
											<Radio value="radio1-2">라벨 1</Radio>
											<Radio value="radio1-3">라벨 2</Radio>
											<Radio value="radio1-4">라벨 3</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
							</Row>

							{/* 선택된 라벨에 따라 규격 표시 */}
							{(selectedLabel === "radio1-1" ||
								selectedLabel === "radio1-2") && (
								<>
									<Divider style={{ marginTop: 16, marginBottom: 16 }} />

									<Row gutter={8}>
										<Flex align="center" gap={4} className="tit-area">
											<p className="tit-type no-bullet">라벨1 설정</p>
										</Flex>

										<Col span={24}>
											<Form.Item label="길이" name="radio2">
												<Radio.Group
													style={{
														display: "flex",
														flexDirection: "column",
														gap: 8,
													}}
													defaultValue="radio2-1"
												>
													<Radio value="radio2-1">54.5mm</Radio>
													<Radio value="radio2-2">51mm</Radio>
												</Radio.Group>
											</Form.Item>
										</Col>
									</Row>
								</>
							)}

							{(selectedLabel === "radio1-1" ||
								selectedLabel === "radio1-3") && (
								<>
									<Divider style={{ marginTop: 16, marginBottom: 16 }} />

									<Row gutter={8}>
										<Flex align="center" gap={4} className="tit-area">
											<p className="tit-type no-bullet">라벨2 설정</p>
										</Flex>

										<Col span={24}>
											<Form.Item label="AS 연락처" name="radio3">
												<Radio.Group
													style={{
														display: "flex",
														flexDirection: "column",
														gap: 8,
													}}
													defaultValue="radio3-1"
												>
													<Radio value="radio3-1">한국(동탄)</Radio>
													<Radio value="radio3-2">중국(상해)</Radio>
												</Radio.Group>
											</Form.Item>
										</Col>

										<Col span={24}>
											<Form.Item label="Flow 방향" name="radio4">
												<Radio.Group
													style={{
														display: "flex",
														flexDirection: "column",
														gap: 8,
													}}
													defaultValue="radio4-1"
												>
													<Radio value="radio4-1">정방향(←)</Radio>
													<Radio value="radio4-2">역방향(→)</Radio>
												</Radio.Group>
											</Form.Item>
										</Col>
									</Row>
								</>
							)}

							{/* 선택된 라벨에 따라 규격 표시 */}
							{(selectedLabel === "radio1-1" ||
								selectedLabel === "radio1-4") && (
								<>
									<Divider style={{ marginTop: 16, marginBottom: 16 }} />
									<Row gutter={8}>
										<Flex align="center" gap={4} className="tit-area">
											<p className="tit-type no-bullet">라벨3 설정</p>
										</Flex>

										<Col span={24}>
											<Form.Item label="길이" name="radio5">
												<Radio.Group
													style={{
														display: "flex",
														flexDirection: "column",
														gap: 8,
													}}
													defaultValue="radio5-1"
												>
													<Radio value="radio5-1">11.5mm</Radio>
													<Radio value="radio5-2">14.5mm</Radio>
													<Radio value="radio5-3">8.5mm</Radio>
												</Radio.Group>
											</Form.Item>
										</Col>
									</Row>
								</>
							)}
						</>
					)}

					{selectedPrint === "report" && (
						<>
							{/* <Flex align="center" gap={4} className="tit-area">
								<p className="tit-type no-bullet">성적서 구분</p>

								<Button type="link" className="btn-reset-txt">
									설정 초기화
								</Button>
							</Flex>

							<Row gutter={8}>
								<Col span={24}>
									<Form.Item name="radio6">
										<Radio.Group
											style={{
												display: "flex",
												flexDirection: "column",
												gap: 8,
											}}
										>
											<Radio value="radio6-1">표준 성적서</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
							</Row> */}

							<Flex align="center" gap={4} className="tit-area">
								<p className="tit-type no-bullet">양식 선택</p>

								<Button type="link" className="btn-reset-txt">
									설정 초기화
								</Button>
							</Flex>

							<Form.Item>
								<Select
									defaultValue="select3"
									onChange={handleChange}
									options={[
										{
											value: "select3",
											label: "mkp-calibration-ko-A",
										},
										{
											value: "select4",
											label: "mkp-calibration-ko-B",
										},
										{
											value: "select5",
											label: "mkp-calibration-ko-C",
										},
										{
											value: "select6",
											label:
												"mkp-calibrationcalibrationcalibrationcalibration ...",
										},
									]}
								/>
							</Form.Item>
						</>
					)}
				</Form>
			</>
		);
	}, [selectedPrint, selectedLabel]); // ✅ selectedLabel 변경 시 자동 반영

	// 드로어 열기
	const showDrawer = (type) => {
		setDrawerTitle("인쇄 설정");
		setDrawerHeader(
			<Flex align="center" justify="space-between" className="drawer-top">
				<Flex align="center" gap={10}>
					<h1 className="title-drawer">인쇄하기</h1>
					<p className="drawer-descript">총 52 페이지</p>
				</Flex>
				<Flex gap={8} className="drawer-top-btn">
					<Button onClick={closeDrawer}>취소</Button>
					<Button type="primary">다음</Button>
				</Flex>
			</Flex>
		);

		setSelectedPrint(type);

		{
			drawerContent;
		}

		// if (type === "label") {
		// 	<>
		// 		{drawerContent}
		// 	</>
		// } else if (type === "report") {
		// 	setDrawerContent(
		// 		<>
		// 			<Form layout="vertical">
		// 				<Flex align="center" gap={4} className="tit-area">
		// 					<p className="tit-type no-bullet">인쇄 구분</p>
		// 				</Flex>

		// 				<Form.Item>
		// 					<Select
		// 						defaultValue="report"
		// 						onChange={handleChange}
		// 						options={[
		// 							{
		// 								value: "label",
		// 								label: "라벨 인쇄",
		// 							},
		// 							{
		// 								value: "report",
		// 								label: "성적서 인쇄",
		// 							},
		// 						]}
		// 					/>
		// 				</Form.Item>

		// 				<Flex align="center" gap={4} className="tit-area">
		// 					<p className="tit-type no-bullet">성적서 구분</p>

		// 					<Button type="link" className="btn-reset-txt">
		// 						설정 초기화
		// 					</Button>
		// 				</Flex>

		// 				<Row gutter={8}>
		// 					<Col span={24}>
		// 						<Form.Item name="radio6">
		// 							<Radio.Group
		// 								style={{
		// 									display: "flex",
		// 									flexDirection: "column",
		// 									gap: 8,
		// 								}}
		// 							>
		// 								<Radio value="radio6-1">표준 성적서</Radio>
		// 							</Radio.Group>
		// 						</Form.Item>
		// 					</Col>
		// 				</Row>

		// 				<Flex align="center" gap={4} className="tit-area">
		// 					<p className="tit-type no-bullet">양식 선택</p>
		// 				</Flex>

		// 				<Form.Item>
		// 					<Select
		// 						defaultValue="select3"
		// 						onChange={handleChange}
		// 						options={[
		// 							{
		// 								value: "select3",
		// 								label: "mkp-calibration-ko-A",
		// 							},
		// 							{
		// 								value: "select4",
		// 								label: "mkp-calibration-ko-B",
		// 							},
		// 							{
		// 								value: "select5",
		// 								label: "mkp-calibration-ko-C",
		// 							},
		// 							{
		// 								value: "select6",
		// 								label:
		// 									"mkp-calibrationcalibrationcalibrationcalibration ...",
		// 							},
		// 						]}
		// 					/>
		// 				</Form.Item>
		// 			</Form>
		// 		</>
		// 	);
		// }

		setOpenDrawer(true);
	};

	// 드로어 닫기
	const closeDrawer = () => {
		setOpenDrawer(false);
	};

	const printItems = [
		{
			label: "라벨 인쇄",
			key: "1",
			onClick: () => showDrawer("label"), // 클릭 시 라벨 인쇄 Drawer 열기
		},
		{
			label: "성적서 인쇄",
			key: "2",
			onClick: () => showDrawer("report"), // 클릭 시 성적서 인쇄 Drawer 열기
		},
	];
	// --------- 드로어 관련

	// --------- 모달 관련
	const [openPackingModal, setOpenPackingModal] = useState(false); // Modal 열림 상태
	const [modalContent, setModalContent] = useState(null); // Modal 내용
	const [modal, contextHolder] = Modal.useModal();

	// 포장 및 입고완료 공정 열기
	const showPackingModal = () => {
		setModalContent(
			<>
				<Flex align="center" justify="space-between">
					<p className="modal-txt">
						포장 작업자, 입고 작업자를 입력하세요. 날짜는 저장 즉시 자동입력
						됩니다.
					</p>

					<Button type="link" className="btn-reset-txt">
						전체 초기화
					</Button>
				</Flex>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">포장 공정</p>

					<Button type="link" className="btn-reset-txt">
						초기화
					</Button>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item label={<Link href={"/"}>포장 작업자</Link>}>
								<Select
									defaultValue="packingWorker1"
									onChange={handleChange}
									options={[
										{
											value: "packingWorker1",
											label: "-",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item label="포장 완료일">
								<DatePicker
									format="YYYY-MM-DD HH:mm:ss"
									showTime={{
										defaultValue: dayjs("00:00:00", "HH:mm:ss"),
									}}
									placeholder="날짜, 시간 자동 입력"
									disabled
									className="work-date"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">입고 공정</p>

					<Button type="link" className="btn-reset-txt">
						초기화
					</Button>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Row gutter={8}>
						<Col span={12}>
							<Form.Item label={<Link href={"/"}>입고 작업자</Link>}>
								<Select
									defaultValue="packingWorker1"
									onChange={handleChange}
									options={[
										{
											value: "packingWorker1",
											label: "-",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item label="입고 완료일">
								<DatePicker
									format="YYYY-MM-DD HH:mm:ss"
									showTime={{
										defaultValue: dayjs("00:00:00", "HH:mm:ss"),
									}}
									placeholder="날짜, 시간 자동 입력"
									disabled
									className="work-date"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>

				<Divider
					style={{
						display: "block",
						width: "auto",
						marginLeft: "-24px",
						marginRight: "-24px",
					}}
				/>
			</>
		);

		setOpenPackingModal(true);
	};

	// 모달 닫기
	const closeModal = () => {
		setOpenPackingModal(false);
	};

	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};
	// --------- 모달 관련

	// --------- 우클릭 관련
	const rightItem = [
		{
			label: "제조 공정",
			key: "1",
			children: [
				{
					key: "1-1",
					label: "조립 공정",
				},
				{
					key: "1-2",
					label: "내부리크 공정",
				},
				{
					key: "1-3",
					label: "외부리크 공정",
				},
				{
					key: "1-4",
					label: "PID교정 공정",
				},
				{
					key: "1-5",
					label: "케이스조립 공정",
				},
				{
					key: "1-6",
					label: "압력교정 공정",
				},
				{
					key: "1-7",
					label: "유량교정 공정",
				},
				{
					key: "1-8",
					label: "PI교정 공정",
				},
				{
					key: "1-9",
					label: "포장 공정",
				},
				{
					key: "1-10",
					label: "입고 공정",
				},
			],
		},
		{
			label: "현재상태 변경",
			key: "2",
			children: [
				{
					key: "2-1",
					label: "처분대기",
				},
				{
					key: "2-2",
					label: "처분완료",
				},
			],
		},
		{
			type: "divider",
		},
		{
			label: "수주 종합정보",
			key: "3",
		},
		{
			label: "부적합이력",
			key: "4",
		},
		{
			label: "제어계수 정보",
			key: "5",
		},
		{
			label: "비율제어 정보",
			key: "6",
		},
		{
			label: (
				<span
					onClick={handlePopupOpen}
					style={{
						cursor: "pointer",
					}}
				>
					부서별 메모
				</span>
			),
			key: "7",
		},
		{
			type: "divider",
		},
		{
			label: "인쇄하기",
			key: "8",
			children: [
				{
					key: "8-1",
					label: "라벨 인쇄",
				},
				{
					key: "8-2",
					label: "성적서 인쇄",
				},
			],
		},
		{
			label: "엑셀 다운로드",
			key: "9",
			children: [
				{
					key: "9-1",
					label: "편집 항목만",
					children: [
						{
							key: "9-1-1",
							label: "선택한 행",
						},
						{
							key: "9-1-2",
							label: "전체 행",
						},
					],
				},
				{
					key: "9-2",
					label: "전체 항목",
					children: [
						{
							key: "9-2-1",
							label: "선택한 행",
						},
						{
							key: "9-2-2",
							label: "전체 행",
						},
					],
				},
			],
		},
	];

	const {
		token: { colorBgLayout, colorTextTertiary },
	} = theme.useToken();
	// --------- 우클릭 관련

	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태

	// 조건검색 모달 열기
	const showSearchModal = () => {
		setModalContent(
			<>
				<Flex align="center" justify="space-between">
					<p className="total-txt">
						검색 카테고리별로 입력필드를 여러 개 추가, 삭제할 수 있습니다.
					</p>

					<Button type="link" className="btn-reset-txt">
						전체 초기화
					</Button>
				</Flex>

				<div className="layer-scroll">
					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">일반</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="usegas1"
									onChange={handleChange}
									options={[
										{
											value: "usegas1",
											label: "사용가스",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group defaultValue="include1-1">
									<Radio value="include1-1">포함</Radio>
									<Radio value="include1-2">미포함</Radio>
									<Radio value="include1-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="vendor1"
									onChange={handleChange}
									options={[
										{
											value: "vendor1",
											label: "납품처",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group defaultValue={"include2-1"}>
									<Radio value="include2-1">포함</Radio>
									<Radio value="include2-2">미포함</Radio>
									<Radio value="include12-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<MinusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">숫자/수치</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									defaultValue="oil1"
									onChange={handleChange}
									options={[
										{
											value: "oil1",
											label: "유량",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group defaultValue={"scope1-1"}>
									<Radio value="scope1-1">범위</Radio>
									<Radio value="scope1-2">≤</Radio>
									<Radio value="scope1-3">≥</Radio>
									<Radio value="scope1-4">=</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Flex gap={4}>
									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>

									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>
								</Flex>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="oil2"
									onChange={handleChange}
									options={[
										{
											value: "oil2",
											label: "유량",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group defaultValue={"scope2-1"}>
									<Radio value="scope2-1">범위</Radio>
									<Radio value="scope2-2">≤</Radio>
									<Radio value="scope2-3">≥</Radio>
									<Radio value="scope2 -4">=</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Flex gap={4}>
									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>

									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>
								</Flex>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<MinusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">기간/날짜</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="date1"
									onChange={handleChange}
									options={[
										{
											value: "date1",
											label: "납품계획일",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area select-radio-area2">
								<Radio.Group defaultValue={"period1-1"}>
									<Radio value="period1-1">기간</Radio>
									<Radio value="period1-2">이전</Radio>
									<Radio value="period1-3">이후</Radio>
									<Radio value="period1-4">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<RangePicker
									showTime={{
										format: "HH:mm",
									}}
									format="YYYY-MM-DD HH:mm"
									onChange={(value, dateString) => {
										console.log("Selected Time: ", value);
										console.log("Formatted Selected Time: ", dateString);
									}}
									onOk={onOk}
								/>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="date2"
									onChange={handleChange}
									options={[
										{
											value: "date2",
											label: "등록일",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area select-radio-area2">
								<Radio.Group defaultValue={"period2-1"}>
									<Radio value="period2-1">기간</Radio>
									<Radio value="period2-2">이전</Radio>
									<Radio value="period2-3">이후</Radio>
									<Radio value="period2-4">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<DatePicker
									showTime
									onChange={(value, dateString) => {
										console.log("Selected Time: ", value);
										console.log("Formatted Selected Time: ", dateString);
									}}
									onOk={onOk}
									style={{
										width: "100%",
									}}
								/>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<MinusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">작업자</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="writer1"
									onChange={handleChange}
									options={[
										{
											value: "writer1",
											label: "등록자",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group defaultValue={"include3-1"}>
									<Radio value="include3-1">포함</Radio>
									<Radio value="include3-2">미포함</Radio>
									<Radio value="include3-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									showSearch
									defaultValue="fabricate1"
									onChange={handleChange}
									options={[
										{
											value: "fabricate1",
											label: "조립자",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group defaultValue={"include4-1"}>
									<Radio value="include4-1">포함</Radio>
									<Radio value="include4-2">미포함</Radio>
									<Radio value="include4-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<MinusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex
						gap={8}
						align="center"
						justify="center"
						className="layer-btn-area"
					>
						<Button onClick={closeModal}>닫기</Button>
						<Button type="primary">검색</Button>
					</Flex>
				</div>
			</>
		);

		setOpenSearchModal(true);
	};

	return (
		<Layout>
			<div className="contents-flex">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						생산 관리
					</Title>

					<Flex gap="small">
						<AutoComplete
							popupClassName="certain-category-search-dropdown"
							popupMatchSelectWidth={400}
							style={{
								width: 400,
							}}
							options={options}
						>
							<Input.Search
								size="large"
								placeholder="검색어를 입력하세요"
								allowClear
								className="input-search"
							/>
						</AutoComplete>

						<Button
							icon={<FilterOutlined />}
							iconPosition={position}
							size="large"
							onClick={showSearchModal}
						>
							조건 검색
						</Button>
					</Flex>
				</Flex>

				{/* 상단 버튼 */}
				<Flex
					gap={4}
					align="center"
					className="btn-big"
					style={{
						position: "sticky",
						top: "0",
						zIndex: "10",
						paddingBottom: "12px",
						paddingTop: "8px",
						backgroundColor: "#FFF",
					}}
				>
					<Button
						variant="outlined"
						icon={<RedoOutlined />}
						className="icon-redo"
					>
						전체 목록
					</Button>

					<Flex gap={4} className="btn-spacing-area gap-sm">
						<Dropdown menu={{ items: viewInfoItems, onClick: handleMenuClick }}>
							<Button>
								<Space>
									정보 보기
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>

						<Dropdown
							menu={{
								items,
							}}
							dropdownRender={(menu) => (
								<div style={contentStyle}>
									<Space
										style={{
											padding: 12,
										}}
										className="check-all"
									>
										<Checkbox
											defaultChecked
											checked={allChecked}
											onChange={handleAllChange}
										>
											전체
										</Checkbox>

										<Button
											icon={<RedoOutlined />}
											target="_blank"
											size="small"
											className="icon-redo"
										/>
									</Space>

									<Divider />

									{React.cloneElement(menu, {
										style: menuStyle,
									})}

									<Divider />

									<Space
										style={{
											padding: 12,
										}}
									>
										<Checkbox
											defaultChecked
											checked={checkedItems[16]}
											onChange={() => handleItemChange(16)}
										>
											ETC
										</Checkbox>
									</Space>
								</div>
							)}
						>
							<Button>
								<Space>
									상태별 보기
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>

						<Dropdown menu={{ items: stateItems, onClick: handleMenuClick }}>
							<Button>
								<Space>
									상태변경
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>
					</Flex>

					<Flex gap={4}>
						<Button>항목편집</Button>

						<Dropdown
							menu={{ items: excelItems, onClick: handleMenuClick }}
							className="excel-menu"
						>
							<Button>
								<Space>
									엑셀 다운로드
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>

						<Dropdown menu={{ items: printItems }}>
							<Button>
								<Space>
									인쇄하기
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>
					</Flex>

					<Flex gap={4} className="btn-spacing-area">
						<Button
							variant="outlined"
							icon={<RedoOutlined />}
							className="icon-redo"
							onClick={showPackingModal}
						>
							포장 및 입고완료 공정 열기
						</Button>
					</Flex>
				</Flex>

				{/* 갯수, 페이징, 버튼 영역 */}
				<Flex
					align="center"
					justify="space-between"
					style={{
						marginBottom: "12px",
					}}
				>
					<Flex gap="small" align="center">
						<Flex gap="small" className="list-num">
							총 <span>73589</span>
						</Flex>

						<Flex gap="small" className="list-num">
							<strong>1</strong> 건 선택
						</Flex>
					</Flex>

					<Flex align="center" className="paging-area">
						<button
							onClick={() => onChange(1)}
							disabled={current === 1}
							className="btn-page"
						>
							<VerticalRightOutlined />
						</button>

						<Pagination
							simple
							current={current}
							total={totalItems}
							onChange={onChange}
							itemRender={itemRender}
						/>

						{/* 맨 뒤로 */}
						<button
							onClick={() => onChange(totalPages)}
							disabled={current === totalPages}
							className="btn-page"
						>
							<VerticalLeftOutlined />
						</button>
					</Flex>

					<Flex gap="small" align="center">
						<Button
							icon={<RedoOutlined />}
							target="_blank"
							className="icon-redo"
						/>

						<Dropdown menu={{ items: lineItems, onClick: handleMenuClick }}>
							<Button>
								<Space>
									<SettingOutlined />
								</Space>
							</Button>
						</Dropdown>
					</Flex>
				</Flex>

				{/*  검색결과 */}
				<Flex align="center" className="search-result-area">
					<strong className="tit-search-result">검색결과 :</strong>

					{tags.map((tag, index) => (
						<Tag key={index} closeIcon onClose={() => handleTagClose(tag)}>
							{tag}
						</Tag>
					))}

					<Button
						color="primary"
						variant="text"
						size="small"
						className="all-delete-tag"
						onClick={handleTagDeleteAll}
					>
						모두 삭제
					</Button>
				</Flex>

				<Dropdown
					menu={{
						items: rightItem,
					}}
					trigger={["contextMenu"]}
				>
					{/* 테이블 */}
					<div
						className="tb-container"
						style={{ paddingTop: "8px", paddingBottom: "40px" }}
					>
						{/* td에 핑크색 배경 넣고 싶으면 tr에 row-red 클래스 추가 */}
						<Table
							columns={columns}
							dataSource={data}
							onChange={handleChange}
							pagination={false}
							size="small"
							className="ellipsis-column basic-tb"
							bordered
							scroll={{
								x: "max-content",
								y: "calc(100vh - 256px)",
							}}
							style={{ tableLayout: "fixed" }}
						/>
					</div>
				</Dropdown>
			</div>
			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent
					open={openDrawer}
					onClose={closeDrawer}
					title={drawerTitle}
					headerContent={drawerHeader} // 동적으로 헤더 변경
					content={drawerContent} // 동적으로 본문 변경
					footer={drawerFooter} // 동적으로 푸터 버튼 변경
				/>
			</div>

			{/* ModalComponent 추가 - "조건 검색" 클릭 시 열림 */}
			<div style={{ display: openSearchModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							조건 검색
						</div>
					}
					open={openSearchModal}
					onCancel={() => setOpenSearchModal(false)}
					width={900}
					footer={null}
					modalRender={(modal) => (
						<Draggable
							disabled={disabled}
							bounds={bounds}
							nodeRef={draggleRef}
							onStart={(event, uiData) => onStart(event, uiData)}
						>
							<div ref={draggleRef}>{modal}</div>
						</Draggable>
					)}
				>
					{modalContent}
				</Modal>
			</div>

			{/* ModalComponent 추가 - 포장 및 입고완료 공정 */}
			<div style={{ display: openPackingModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							포장 및 입고완료 공정
						</div>
					}
					open={openPackingModal}
					onCancel={() => setOpenPackingModal(false)}
					onOk={() => setOpenPackingModal(false)}
					okText="저장"
					cancelText="취소"
					width={560}
					modalRender={(modal) => (
						<Draggable
							disabled={disabled}
							bounds={bounds}
							nodeRef={draggleRef}
							onStart={(event, uiData) => onStart(event, uiData)}
						>
							<div ref={draggleRef}>{modal}</div>
						</Draggable>
					)}
				>
					{modalContent}
				</Modal>
			</div>

			{/* contextHolder를 포함해야 modal.confirm이 정상 작동 */}
			{contextHolder}
		</Layout>
	);
};

export default ProduceComponent;
