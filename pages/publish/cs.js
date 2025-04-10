// pages/cs.js
import React, { useState, useRef } from "react";
import {
	Layout,
	Typography,
	Tabs,
	Button,
	Flex,
	Dropdown,
	Space,
	Tag,
	message,
	Input,
	AutoComplete,
	theme,
	Pagination,
	Popover,
	Table,
} from "antd";
import {
	CloseOutlined,
	DownOutlined,
	RedoOutlined,
	FilterOutlined,
	VerticalRightOutlined,
	VerticalLeftOutlined,
	SettingOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";

const { useToken } = theme;
const { Title } = Typography;

const onChange = (e) => {
	console.log(`checked = `);
};

const TabItems = [
	{
		key: "1",
		label: "C/S 현황 목록",
	},
	{
		key: "2",
		label: "C/S 등록 · 상세",
	},
];

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
	message.info("Click on menu item.");
	console.log("click", e);
};

const excelItems = [
	{
		label: "편집 항목만",
		key: "1",
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

// --------- 테이블
const data = [
	{
		key: "1",
		no: "2024-1012",
		csState: <Tag className="tag-new">신규</Tag>,
		receptionist: "홍길동",
		csDate: "2024-12-24",
		requestDate: "2024-05-30:14:43",
		client: "AFT",
		mechanic: "원익IPS",
		cooperator: "NPP",
		facName: "SUPAR-N",
		facID: "TOO3872",
		chamber: "PM-A, B",
		lineInfo: "P3Line",
		location: "서울시 영등포구 여의도동 1234",
		CSContent: "Zero Reset 후 파샬 불량 발생 점검 요청이..",
		process: "CVD",
		detailProcess: "SICN",
		productCategory: "MFC",
		companyName: "원익IPS",
		requestor: "홍길동",
		phoneNum: "010-0000-0000",
		email: "aaa@ccc.com",
		companyNameV: "원익IPS",
		requestorV: "홍길동",
		phoneNumV: "010-0000-0000",
		extensionV: "010-0000-0000",
		emailV: "aaa@ccc.com",
		memoV: "-",
		poorMFC: "570170975324",
		nowState: "납품완료",
		replacementMFC: "570170975324",
		nowState2: "납품완료",
		model: "MARU7100S",
		detailModel: "7100",
		useGas: "N2",
		gasRate: "1000",
		commCode: "0108A",
		productTeam: "생산팀",
		poorDivision: "고객사 요청",
		statusClass: "전원불량",
		actionClass: "점검(현장조치)",
		severity: "2",
		poorExportDate: "2024-12-24",
		finishDate: "2024-12-24",
		certifyProductDate: "2024-12-24",
		deliveryDate: "2024-12-24",
		certifyUseDay: "2",
		releaseDay: "2",
		actionPerson: "홍길동",
		actionContent: "수기입력 내용 출력",
		warranty: "OUT",
		periodReaction: "12",
		stepRecipe: "수기입력 내용 출력",
		flowSeqeunce: "수기입력 내용 출력",
		usePress: "수기입력 내용 출력",
		clientSpec: "수기입력 내용 출력",
		productSpec: "수기입력 내용 출력",
		causeAnalysis: "O",
		emergency: "O",
		causeAnalysisDate: "2024-12-24",
		analysisDueDate: "2024-12-24",
		analysisCompleteDate: "2024-12-24",
		tat: "3",
		etc: "수기입력 내용 출력",
	},
	{
		key: "2",
		no: "2024-1012",
		csState: <Tag className="tag-ing">진행</Tag>,
		receptionist: "홍길동",
		csDate: "2024-12-24",
		requestDate: "2024-05-30:14:43",
		client: "AFT",
		mechanic: "원익IPS",
		cooperator: "NPP",
		facName: "SUPAR-N",
		facID: "TOO3872",
		chamber: "PM-A, B",
		lineInfo: "P3Line",
		location: "서울시 영등포구 여의도동 1234",
		CSContent: "Zero Reset 후 파샬 불량 발생 점검 요청이..",
		process: "CVD",
		detailProcess: "SICN",
		productCategory: "MFC",
		companyName: "원익IPS",
		requestor: "홍길동",
		phoneNum: "010-0000-0000",
		email: "aaa@ccc.com",
		companyNameV: "원익IPS",
		requestorV: "홍길동",
		phoneNumV: "010-0000-0000",
		extensionV: "010-0000-0000",
		emailV: "aaa@ccc.com",
		memoV: "-",
		poorMFC: "570170975324",
		nowState: "납품완료",
		replacementMFC: "570170975324",
		nowState2: "납품완료",
		model: "MARU7100S",
		detailModel: "7100",
		useGas: "N2",
		gasRate: "1000",
		commCode: "0108A",
		productTeam: "생산팀",
		poorDivision: "고객사 요청",
		statusClass: "전원불량",
		actionClass: "점검(현장조치)",
		severity: "2",
		poorExportDate: "2024-12-24",
		finishDate: "2024-12-24",
		certifyProductDate: "2024-12-24",
		deliveryDate: "2024-12-24",
		certifyUseDay: "2",
		releaseDay: "2",
		actionPerson: "홍길동",
		actionContent: "수기입력 내용 출력",
		warranty: "OUT",
		periodReaction: "12",
		stepRecipe: "수기입력 내용 출력",
		flowSeqeunce: "수기입력 내용 출력",
		usePress: "수기입력 내용 출력",
		clientSpec: "수기입력 내용 출력",
		productSpec: "수기입력 내용 출력",
		causeAnalysis: "O",
		emergency: "O",
		causeAnalysisDate: "2024-12-24",
		analysisDueDate: "2024-12-24",
		analysisCompleteDate: "2024-12-24",
		tat: "3",
		etc: "수기입력 내용 출력",
	},
	{
		key: "3",
		no: "2024-1012",
		csState: <Tag className="tag-end">종결</Tag>,
		receptionist: "홍길동",
		csDate: "2024-12-24",
		requestDate: "2024-05-30:14:43",
		client: "AFT",
		mechanic: "원익IPS",
		cooperator: "NPP",
		facName: "SUPAR-N",
		facID: "TOO3872",
		chamber: "PM-A, B",
		lineInfo: "P3Line",
		location: "서울시 영등포구 여의도동 1234",
		CSContent: "Zero Reset 후 파샬 불량 발생 점검 요청이..",
		process: "CVD",
		detailProcess: "SICN",
		productCategory: "MFC",
		companyName: "원익IPS",
		requestor: "홍길동",
		phoneNum: "010-0000-0000",
		email: "aaa@ccc.com",
		companyNameV: "원익IPS",
		requestorV: "홍길동",
		phoneNumV: "010-0000-0000",
		extensionV: "010-0000-0000",
		emailV: "aaa@ccc.com",
		memoV: "-",
		poorMFC: "570170975324",
		nowState: "납품완료",
		replacementMFC: "570170975324",
		nowState2: "납품완료",
		model: "MARU7100S",
		detailModel: "7100",
		useGas: "N2",
		gasRate: "1000",
		commCode: "0108A",
		productTeam: "생산팀",
		poorDivision: "고객사 요청",
		statusClass: "전원불량",
		actionClass: "점검(현장조치)",
		severity: "2",
		poorExportDate: "2024-12-24",
		finishDate: "2024-12-24",
		certifyProductDate: "2024-12-24",
		deliveryDate: "2024-12-24",
		certifyUseDay: "2",
		releaseDay: "2",
		actionPerson: "홍길동",
		actionContent: "수기입력 내용 출력",
		warranty: "OUT",
		periodReaction: "12",
		stepRecipe: "수기입력 내용 출력",
		flowSeqeunce: "수기입력 내용 출력",
		usePress: "수기입력 내용 출력",
		clientSpec: "수기입력 내용 출력",
		productSpec: "수기입력 내용 출력",
		causeAnalysis: "O",
		emergency: "O",
		causeAnalysisDate: "2024-12-24",
		analysisDueDate: "2024-12-24",
		analysisCompleteDate: "2024-12-24",
		tat: "3",
		etc: "수기입력 내용 출력",
	},
	{
		key: "4",
		no: "2024-1012",
		csState: <Tag className="tag-cancel">취소</Tag>,
		receptionist: "홍길동",
		csDate: "2024-12-24",
		requestDate: "2024-05-30:14:43",
		client: "AFT",
		mechanic: "원익IPS",
		cooperator: "NPP",
		facName: "SUPAR-N",
		facID: "TOO3872",
		chamber: "PM-A, B",
		lineInfo: "P3Line",
		location: "서울시 영등포구 여의도동 1234",
		CSContent: "Zero Reset 후 파샬 불량 발생 점검 요청이..",
		process: "CVD",
		detailProcess: "SICN",
		productCategory: "MFC",
		companyName: "원익IPS",
		requestor: "홍길동",
		phoneNum: "010-0000-0000",
		email: "aaa@ccc.com",
		companyNameV: "원익IPS",
		requestorV: "홍길동",
		phoneNumV: "010-0000-0000",
		extensionV: "010-0000-0000",
		emailV: "aaa@ccc.com",
		memoV: "-",
		poorMFC: "570170975324",
		nowState: "납품완료",
		replacementMFC: "570170975324",
		nowState2: "납품완료",
		model: "MARU7100S",
		detailModel: "7100",
		useGas: "N2",
		gasRate: "1000",
		commCode: "0108A",
		productTeam: "생산팀",
		poorDivision: "고객사 요청",
		statusClass: "전원불량",
		actionClass: "점검(현장조치)",
		severity: "2",
		poorExportDate: "2024-12-24",
		finishDate: "2024-12-24",
		certifyProductDate: "2024-12-24",
		deliveryDate: "2024-12-24",
		certifyUseDay: "2",
		releaseDay: "2",
		actionPerson: "홍길동",
		actionContent: "수기입력 내용 출력",
		warranty: "OUT",
		periodReaction: "12",
		stepRecipe: "수기입력 내용 출력",
		flowSeqeunce: "수기입력 내용 출력",
		usePress: "수기입력 내용 출력",
		clientSpec: "수기입력 내용 출력",
		productSpec: "수기입력 내용 출력",
		causeAnalysis: "O",
		emergency: "O",
		causeAnalysisDate: "2024-12-24",
		analysisDueDate: "2024-12-24",
		analysisCompleteDate: "2024-12-24",
		tat: "3",
		etc: "수기입력 내용 출력",
	},
	{
		key: "5",
		no: "2024-1012",
		csState: <Tag className="tag-receipt">접수</Tag>,
		receptionist: "홍길동",
		csDate: "2024-12-24",
		requestDate: "2024-05-30:14:43",
		client: "AFT",
		mechanic: "원익IPS",
		cooperator: "NPP",
		facName: "SUPAR-N",
		facID: "TOO3872",
		chamber: "PM-A, B",
		lineInfo: "P3Line",
		location: "서울시 영등포구 여의도동 1234",
		CSContent: "Zero Reset 후 파샬 불량 발생 점검 요청이..",
		process: "CVD",
		detailProcess: "SICN",
		productCategory: "MFC",
		companyName: "원익IPS",
		requestor: "홍길동",
		phoneNum: "010-0000-0000",
		email: "aaa@ccc.com",
		companyNameV: "원익IPS",
		requestorV: "홍길동",
		phoneNumV: "010-0000-0000",
		extensionV: "010-0000-0000",
		emailV: "aaa@ccc.com",
		memoV: "-",
		poorMFC: "570170975324",
		nowState: "납품완료",
		replacementMFC: "570170975324",
		nowState2: "납품완료",
		model: "MARU7100S",
		detailModel: "7100",
		useGas: "N2",
		gasRate: "1000",
		commCode: "0108A",
		productTeam: "생산팀",
		poorDivision: "고객사 요청",
		statusClass: "전원불량",
		actionClass: "점검(현장조치)",
		severity: "2",
		poorExportDate: "2024-12-24",
		finishDate: "2024-12-24",
		certifyProductDate: "2024-12-24",
		deliveryDate: "2024-12-24",
		certifyUseDay: "2",
		releaseDay: "2",
		actionPerson: "홍길동",
		actionContent: "수기입력 내용 출력",
		warranty: "OUT",
		periodReaction: "12",
		stepRecipe: "수기입력 내용 출력",
		flowSeqeunce: "수기입력 내용 출력",
		usePress: "수기입력 내용 출력",
		clientSpec: "수기입력 내용 출력",
		productSpec: "수기입력 내용 출력",
		causeAnalysis: "O",
		emergency: "O",
		causeAnalysisDate: "2024-12-24",
		analysisDueDate: "2024-12-24",
		analysisCompleteDate: "2024-12-24",
		tat: "3",
		etc: "수기입력 내용 출력",
	},
];
// --------- 테이블

const CSComponent = ({ contentHeight }) => {
	const { token } = useToken();
	const [position, setPosition] = useState("end");
	const router = useRouter();
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

	const onTabChange = (key) => {
		if (key === "1") {
			router.push("/publish/cs");
		} else if (key === "2") {
			router.push("/publish/cswrite");
		}
	};

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

	// --------- 우클릭 관련
	const rightItem = [
		{
			label: "C/S 상태변경",
			key: "1",
			children: [
				{
					key: "1-1",
					label: "접수",
				},
				{
					key: "1-2",
					label: "진행",
				},
				{
					key: "1-3",
					label: "종결",
				},
				{
					key: "1-4",
					label: "취소",
				},
			],
		},
		{
			label: "C/S 복제하기",
			key: "2",
		},
		{
			label: "수주 종합정보",
			key: "3",
			disabled: true,
		},
		{
			type: "divider",
		},
		{
			label: "출력하기",
			key: "4",
			children: [
				{
					key: "4-1",
					label: "프린트",
				},
				{
					key: "4-2",
					label: "양식다운로드",
				},
			],
		},
		{
			label: "엑셀 다운로드",
			key: "5",
			children: [
				{
					key: "5-1",
					label: "편집 항목만",
					children: [
						{
							key: "5-1-1",
							label: "선택한 행",
						},
						{
							key: "5-1-2",
							label: "전체 행",
						},
					],
				},
				{
					key: "5-2",
					label: "전체 항목",
					children: [
						{
							key: "5-2-1",
							label: "선택한 행",
						},
						{
							key: "5-2-2",
							label: "전체 행",
						},
					],
				},
			],
		},
		{
			type: "divider",
		},
		{
			label: "삭제하기",
			key: "7",
		},
	];
	// --------- 우클릭 관련

	// --------- 테이블
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
			title: "",
			children: [
				{
					title: "C/S No",
					showSorterTooltip: { title: "No" },
					dataIndex: "no",
					key: "no",
					align: "center",
					sorter: (a, b) => dateSorter(a, b, "no"),
					sortOrder: sortedInfo.columnKey === "no" ? sortedInfo.order : null,
					ellipsis: true,
					width: 105,
					fixed: "left",
				},
				{
					title: "C/S 상태",
					showSorterTooltip: { title: "C/S 상태" },
					dataIndex: "csState",
					key: "csState",
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
					sortOrder:
						sortedInfo.columnKey === "nowState" ? sortedInfo.order : null,
					ellipsis: true,
					width: 80,
					fixed: "left",
				},
			],
		},
		{
			title: "접수내용",
			align: "center",
			children: [
				{
					title: "접수담당자",
					showSorterTooltip: { title: "접수담당자" },
					dataIndex: "receptionist",
					key: "receptionist",
					align: "center",
					ellipsis: true,
					width: 90,
				},
				{
					title: "접수일",
					showSorterTooltip: { title: "접수일" },
					dataIndex: "csDate",
					key: "csDate",
					align: "center",
					sorter: (a, b) => dateSorter(a, b, "csDate"),
					sortOrder:
						sortedInfo.columnKey === "csDate" ? sortedInfo.order : null,
					width: 106,
				},
				{
					title: "요청일시",
					showSorterTooltip: { title: "요청일시" },
					dataIndex: "requestDate",
					key: "requestDate",
					align: "center",
					sorter: (a, b) => dateSorter(a, b, "requestDate"),
					sortOrder:
						sortedInfo.columnKey === "requestDate" ? sortedInfo.order : null,
					width: 146,
				},
				{
					title: "고객사",
					showSorterTooltip: { title: "고객사" },
					dataIndex: "client",
					key: "client",
					ellipsis: true,
					width: 80,
				},
				{
					title: "장비사",
					showSorterTooltip: { title: "장비사" },
					dataIndex: "mechanic",
					key: "mechanic",
					ellipsis: true,
					width: 94,
				},
				{
					title: "협력사",
					showSorterTooltip: { title: "협력사" },
					dataIndex: "cooperator",
					key: "cooperator",
					ellipsis: true,
					width: 94,
				},
				{
					title: "설비명",
					showSorterTooltip: { title: "설비명" },
					dataIndex: "facName",
					key: "facName",
					ellipsis: true,
					width: 89,
				},
				{
					title: "설비ID",
					showSorterTooltip: { title: "설비ID" },
					dataIndex: "facID",
					key: "facID",
					ellipsis: true,
					width: 89,
				},
				{
					title: "Chamber",
					showSorterTooltip: { title: "Chamber" },
					dataIndex: "chamber",
					key: "chamber",
					ellipsis: true,
					width: 105,
				},
				{
					title: "라인정보",
					showSorterTooltip: { title: "라인정보" },
					dataIndex: "lineInfo",
					key: "lineInfo",
					ellipsis: true,
					width: 105,
				},
				{
					title: "설비위치",
					showSorterTooltip: { title: "설비위치" },
					dataIndex: "location",
					key: "location",
					ellipsis: true,
					width: 255,
				},
				{
					title: "접수내용",
					showSorterTooltip: { title: "접수내용" },
					dataIndex: "CSContent",
					key: "CSContent",
					ellipsis: true,
					width: 268,
				},
				{
					title: "공정",
					showSorterTooltip: { title: "공정" },
					dataIndex: "process",
					key: "process",
					ellipsis: true,
					width: 65,
				},
				{
					title: "세부공정",
					showSorterTooltip: { title: "세부공정" },
					dataIndex: "detailProcess",
					key: "detailProcess",
					ellipsis: true,
					width: 112,
				},
				{
					title: "제품구분",
					showSorterTooltip: { title: "제품구분" },
					dataIndex: "productCategory",
					key: "productCategory",
					ellipsis: true,
					width: 78,
				},
				{
					title: "요청자 정보",
					align: "center",
					children: [
						{
							title: "회사명",
							showSorterTooltip: { title: "회사명" },
							dataIndex: "companyName",
							key: "companyName",
							ellipsis: true,
							width: 85,
						},
						{
							title: "이름",
							showSorterTooltip: { title: "이름" },
							dataIndex: "requestor",
							key: "requestor",
							ellipsis: true,
							width: 69,
						},
						{
							title: "연락처",
							showSorterTooltip: { title: "연락처" },
							dataIndex: "phoneNum",
							key: "phoneNum",
							ellipsis: true,
							width: 125,
						},
						{
							title: "E-mail",
							showSorterTooltip: { title: "E-mail" },
							dataIndex: "email",
							key: "email",
							ellipsis: true,
							width: 125,
						},
					],
				},
				{
					title: "내방 정보",
					align: "center",
					children: [
						{
							title: "회사명",
							showSorterTooltip: { title: "회사명" },
							dataIndex: "companyNameV",
							key: "companyNameV",
							ellipsis: true,
							width: 85,
						},
						{
							title: "현업담당자",
							showSorterTooltip: { title: "현업담당자" },
							dataIndex: "requestorV",
							key: "requestorV",
							ellipsis: true,
							width: 80,
						},
						{
							title: "연락처",
							showSorterTooltip: { title: "연락처" },
							dataIndex: "phoneNumV",
							key: "phoneNumV",
							ellipsis: true,
							width: 125,
						},
						{
							title: "내선번호",
							showSorterTooltip: { title: "내선번호" },
							dataIndex: "extensionV",
							key: "extensionV",
							ellipsis: true,
							width: 125,
						},
						{
							title: "내방신청 E-mail",
							showSorterTooltip: { title: "내방신청 E-mail" },
							dataIndex: "emailV",
							key: "emailV",
							ellipsis: true,
							width: 125,
						},
						{
							title: "메모",
							showSorterTooltip: { title: "메모" },
							dataIndex: "memoV",
							key: "memoV",
							ellipsis: true,
							width: 135,
						},
					],
				},
			],
		},
		{
			title: "제품내역",
			align: "center",
			children: [
				{
					title: "(1)불량 MFC S/N",
					showSorterTooltip: { title: "(1)불량 MFC S/N" },
					dataIndex: "poorMFC",
					key: "poorMFC",
					ellipsis: true,
					width: 125,
				},
				{
					title: "(1)현재상태(F/T)",
					showSorterTooltip: { title: "(1)현재상태(F/T)" },
					dataIndex: "nowState",
					key: "nowState",
					ellipsis: true,
					width: 120,
				},
				{
					title: "(2)대체 MFC S/N",
					showSorterTooltip: { title: "(2)대체 MFC S/N" },
					dataIndex: "replacementMFC",
					key: "replacementMFC",
					ellipsis: true,
					width: 120,
				},
				{
					title: "(2)현재상태(F/T)",
					showSorterTooltip: { title: "(2)현재상태(F/T)" },
					dataIndex: "nowState2",
					key: "nowState2",
					ellipsis: true,
					width: 120,
				},
				{
					title: "모델",
					showSorterTooltip: { title: "모델" },
					dataIndex: "model",
					key: "model",
					ellipsis: true,
					width: 120,
				},
				{
					title: "세부모델",
					showSorterTooltip: { title: "세부모델" },
					dataIndex: "detailModel",
					key: "detailModel",
					ellipsis: true,
					width: 100,
				},
				{
					title: "사용가스",
					showSorterTooltip: { title: "사용가스" },
					dataIndex: "useGas",
					key: "useGas",
					ellipsis: true,
					width: 80,
				},
				{
					title: "유량",
					showSorterTooltip: { title: "유량" },
					dataIndex: "gasRate",
					key: "gasRate",
					ellipsis: true,
					width: 80,
				},
				{
					title: "통신코드",
					showSorterTooltip: { title: "통신코드" },
					dataIndex: "commCode",
					key: "commCode",
					ellipsis: true,
					width: 80,
				},
				{
					title: "생산부서",
					showSorterTooltip: { title: "생산부서" },
					dataIndex: "productTeam",
					key: "productTeam",
					ellipsis: true,
					width: 80,
				},
				{
					title: "불량구분",
					showSorterTooltip: { title: "불량구분" },
					dataIndex: "poorDivision",
					key: "poorDivision",
					ellipsis: true,
					width: 90,
				},
				{
					title: "현상분류",
					showSorterTooltip: { title: "현상분류" },
					dataIndex: "statusClass",
					key: "statusClass",
					ellipsis: true,
					width: 150,
				},
				{
					title: "조치구분",
					showSorterTooltip: { title: "조치구분" },
					dataIndex: "actionClass",
					key: "actionClass",
					ellipsis: true,
					width: 120,
				},
				{
					title: "심각도",
					showSorterTooltip: { title: "심각도" },
					dataIndex: "severity",
					key: "severity",
					ellipsis: true,
					width: 66,
				},
				{
					title: "불량 MFC 반출일",
					showSorterTooltip: { title: "불량 MFC 반출일" },
					dataIndex: "poorExportDate",
					key: "poorExportDate",
					sorter: (a, b) => dateSorter(a, b, "poorExportDate"),
					sortOrder:
						sortedInfo.columnKey === "poorExportDate" ? sortedInfo.order : null,
					ellipsis: true,
					width: 106,
				},
				{
					title: "조치완료일",
					showSorterTooltip: { title: "조치완료일" },
					dataIndex: "finishDate",
					key: "finishDate",
					sorter: (a, b) => dateSorter(a, b, "finishDate"),
					sortOrder:
						sortedInfo.columnKey === "finishDate" ? sortedInfo.order : null,
					ellipsis: true,
					width: 106,
				},
				{
					title: "제품인증일",
					showSorterTooltip: { title: "제품인증일" },
					dataIndex: "certifyProductDate",
					key: "certifyProductDate",
					sorter: (a, b) => dateSorter(a, b, "certifyProductDate"),
					sortOrder:
						sortedInfo.columnKey === "certifyProductDate"
							? sortedInfo.order
							: null,
					ellipsis: true,
					width: 106,
				},
				{
					title: "제품인증일",
					showSorterTooltip: { title: "제품인증일" },
					dataIndex: "deliveryDate",
					key: "deliveryDate",
					sorter: (a, b) => dateSorter(a, b, "deliveryDate"),
					sortOrder:
						sortedInfo.columnKey === "deliveryDate" ? sortedInfo.order : null,
					ellipsis: true,
					width: 106,
				},
				{
					title: "인증일 기준 사용기간(Day)",
					showSorterTooltip: { title: "인증일 기준 사용기간(Day)" },
					dataIndex: "certifyUseDay",
					key: "certifyUseDay",
					ellipsis: true,
					width: 104,
				},
				{
					title: "출고일 기준 사용기간(Day)",
					showSorterTooltip: { title: "인증일 기준 사용기간(Day)" },
					dataIndex: "releaseDay",
					key: "releaseDay",
					ellipsis: true,
					width: 104,
				},
			],
		},
		{
			title: "출장내역",
			align: "center",
			children: [
				{
					title: "조치 담당자(정)",
					showSorterTooltip: { title: "조치 담당자(정)" },
					dataIndex: "actionPerson",
					key: "actionPerson",
					ellipsis: true,
					width: 100,
				},
				{
					title: "조치내용(요약)",
					showSorterTooltip: { title: "조치내용(요약)" },
					dataIndex: "actionContent",
					key: "actionContent",
					ellipsis: true,
					width: 130,
				},
				{
					title: "Warranty",
					showSorterTooltip: { title: "Warranty" },
					dataIndex: "warranty",
					key: "warranty",
					ellipsis: true,
					width: 85,
				},
				{
					title: "대응기간 (Day)",
					showSorterTooltip: { title: "대응기간 (Day)" },
					dataIndex: "periodReaction",
					key: "periodReaction",
					ellipsis: true,
					width: 85,
				},
				{
					title: "공정 Step/Recipe",
					showSorterTooltip: { title: "공정 Step/Recipe" },
					dataIndex: "stepRecipe",
					key: "stepRecipe",
					ellipsis: true,
					width: 130,
				},
				{
					title: "Flow Sequence",
					showSorterTooltip: { title: "Flow Sequence" },
					dataIndex: "flowSeqeunce",
					key: "flowSeqeunce",
					ellipsis: true,
					width: 130,
				},
				{
					title: "사용압력",
					showSorterTooltip: { title: "사용압력" },
					dataIndex: "usePress",
					key: "usePress",
					ellipsis: true,
					width: 130,
				},
				{
					title: "고객사 Spec",
					showSorterTooltip: { title: "고객사 Spec" },
					dataIndex: "clientSpec",
					key: "clientSpec",
					ellipsis: true,
					width: 130,
				},
				{
					title: "제조 Spec",
					showSorterTooltip: { title: "제조 Spec" },
					dataIndex: "productSpec",
					key: "productSpec",
					ellipsis: true,
					width: 130,
				},
			],
		},
		{
			title: "후속조치",
			align: "center",
			children: [
				{
					title: "원인분석 요청",
					showSorterTooltip: { title: "원인분석 요청" },
					dataIndex: "causeAnalysis",
					key: "causeAnalysis",
					ellipsis: true,
					width: 72,
				},
				{
					title: "긴급",
					showSorterTooltip: { title: "긴급" },
					dataIndex: "emergency",
					key: "emergency",
					ellipsis: true,
					width: 72,
				},
				{
					title: "분석 요청일",
					showSorterTooltip: { title: "분석 요청일" },
					dataIndex: "causeAnalysisDate",
					key: "causeAnalysisDate",
					ellipsis: true,
					width: 110,
				},
				{
					title: "분석 납기일",
					showSorterTooltip: { title: "분석 닙기일" },
					dataIndex: "analysisDueDate",
					key: "analysisDueDate",
					ellipsis: true,
					width: 110,
				},
				{
					title: "분석 완료일",
					showSorterTooltip: { title: "분석 완료일" },
					dataIndex: "analysisCompleteDate",
					key: "analysisCompleteDate",
					ellipsis: true,
					width: 110,
				},
				{
					title: "TAT(day)",
					showSorterTooltip: { title: "TAT(day)" },
					dataIndex: "tat",
					key: "tat",
					ellipsis: true,
					width: 80,
				},
				{
					title: "기타",
					showSorterTooltip: { title: "기타" },
					dataIndex: "etc",
					key: "etc",
					ellipsis: true,
					width: 130,
				},
			],
		},
	];
	// --------- 테이블

	return (
		<Layout>
			<div className="contents-top">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						C/S 관리
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
						>
							조건 검색
						</Button>
					</Flex>
				</Flex>

				<Tabs defaultActiveKey="1" items={TabItems} onChange={onTabChange} />

				<Space direction="vertical" size={12} style={{ width: "100%" }}>
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

					{/* 상단 버튼 */}
					<div className="contents-top-scroll">
						<Flex gap="small" align="center" className="btn-big">
							<Button
								variant="outlined"
								icon={<RedoOutlined />}
								className="icon-redo"
							>
								전체 목록
							</Button>

							<Flex gap="small" className="btn-spacing-area">
								<Button variant="outlined">수주 종합정보</Button>

								<Button variant="outlined">C/S 이력</Button>

								<Dropdown
									menu={{ items: stateItems, onClick: handleMenuClick }}
								>
									<Button>
										<Space>
											상태별 보기
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>

								<Dropdown
									menu={{ items: operationItems, onClick: handleMenuClick }}
								>
									<Button>
										<Space>
											구분별 보기
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>

							<Flex gap="small" className="btn-spacing-area">
								<Button>C/S 복제하기</Button>

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
											출력하기
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>
						</Flex>
					</div>

					{/* 갯수, 페이징, 버튼 영역 */}
					<Flex align="center" justify="space-between">
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
				</Space>
			</div>

			<Dropdown
				menu={{
					items: rightItem,
				}}
				trigger={["contextMenu"]}
			>
				<div style={{ marginTop: contentHeight }} className="contents-scroll">
					{/* 테이블 */}
					<div className="tb-container">
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
								y: "calc(60vh - 38px)",
							}}
							style={{ tableLayout: "fixed" }}
						/>
					</div>
				</div>
			</Dropdown>
		</Layout>
	);
};

export default CSComponent;
