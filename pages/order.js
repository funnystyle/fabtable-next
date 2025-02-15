// pages/order.js
import React, { useState } from "react";
import {
	Layout,
	Typography,
	Tabs,
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
} from "@ant-design/icons";

const { useToken } = theme;
const { Title } = Typography;

const onChange = (e) => {
	console.log(`checked = ${e.target.checked}`);
};

const TabItems = [
	{
		key: "1",
		label: "수주 현황 목록",
	},
	{
		key: "2",
		label: "수주 등록 · 상세",
	},
];

const data = [
	{
		key: "1",
		no: 1,
		serialnum: "570241202090",
		release: "DEMO",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "7000",
		productNum: "A24-000019",
		productVersion: "230300.010",
		poNum: "-",
		specialNum: "-",
		mgmr: "Y",
		nowState: <Tag className="CurrentStatus001">발주기입</Tag>,
		deliPlanDate: "2024-12-26",
		deliDate: "2024-12-26",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.2",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "2",
		no: 2,
		serialnum: "570241202080",
		release: "양산",
		vendor: "PSK",
		product: "MARU",
		model: "7000s",
		detailmodel: "8000",
		productNum: "A24-000018",
		productVersion: "230300.010",
		poNum: "-",
		specialNum: "-",
		mgmr: "Y",
		nowState: <Tag className="CurrentStatus002">조립완료</Tag>,
		deliPlanDate: "2024-12-25",
		deliDate: "2024-12-26",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.1",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "3",
		no: 3,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus003">리크완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "4",
		no: 4,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus004">PID완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "5",
		no: 5,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus005">교정완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "6",
		no: 6,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus006">생산완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "7",
		no: 7,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus007">Rework</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "8",
		no: 8,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus008">검사진행</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "9",
		no: 9,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus009">검사완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "10",
		no: 10,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus010">판정대기</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "11",
		no: 11,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus011">입고완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "12",
		no: 12,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus012">납품완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "13",
		no: 13,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus013">반출대기</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "14",
		no: 14,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus014">반출완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "15",
		no: 15,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus015">처분대기</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
	{
		key: "16",
		no: 16,
		serialnum: "570241202070",
		release: "AS",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "9000",
		productNum: "A24-000017",
		productVersion: "230300.010",
		poNum: "4500288025",
		specialNum: "S01",
		mgmr: "N",
		nowState: <Tag className="CurrentStatus016">처분완료</Tag>,
		deliPlanDate: "2024-12-24",
		deliDate: "2024-12-29",
		commuWay: "D-NET",
		commuCode: "2207A",
		fitting: "IGS",
		size: "1.125”W",
		useGas: "N2",
		flow: "1000",
		cf: "1.000",
		converseFlow: "1000",
		unit: "PSI",
		press: "20.5  /  30.5  /  40.5",
		nozzle: "0.25",
		tube: "G25X25X0",
		etc: "-",
		businessMemo: "-",
		makeMemo: "-",
		qualityMemo: "-",
	},
];

const OrderComponent = () => {
	const { token } = useToken();
	const [allChecked, setAllChecked] = useState(true);
	const [checkedItems, setCheckedItems] = useState(Array(16).fill(true));
	const [position, setPosition] = useState("end");
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
			<Checkbox checked={checkedItems[i]} onChange={() => handleItemChange(i)}>
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
		columnKey: "deliPlanDate",
		order: "ascend",
	});
	const handleChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		setSortedInfo(sorter);
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
			dataIndex: "no",
			key: "no",
			sorter: (a, b) => a.no - b.no,
			sortOrder: sortedInfo.columnKey === "no" ? sortedInfo.order : null,
			ellipsis: true,
			width: 49,
		},
		{
			title: "시리얼번호",
			dataIndex: "serialnum",
			key: "serialnum",
			sorter: (a, b) => stringSorter(a, b, "serialnum"),
			sortOrder: sortedInfo.columnKey === "serialnum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 115,
		},
		{
			title: "출고종류",
			dataIndex: "release",
			key: "release",
			sorter: (a, b) => stringSorter(a, b, "release"),
			sortOrder: sortedInfo.columnKey === "release" ? sortedInfo.order : null,
			ellipsis: true,
			width: 76,
		},
		{
			title: "납품처",
			dataIndex: "vendor",
			key: "vendor",
			sorter: (a, b) => stringSorter(a, b, "vendor"),
			sortOrder: sortedInfo.columnKey === "vendor" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "제품군",
			dataIndex: "product",
			key: "product",
			sorter: (a, b) => stringSorter(a, b, "product"),
			sortOrder: sortedInfo.columnKey === "product" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "모델",
			dataIndex: "model",
			key: "model",
			sorter: (a, b) => stringSorter(a, b, "model"),
			sortOrder: sortedInfo.columnKey === "model" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "세부모델",
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
			dataIndex: "productVersion",
			key: "productVersion",
			sorter: (a, b) => stringSorter(a, b, "productVersion"),
			sortOrder:
				sortedInfo.columnKey === "productVersion" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
		},
		{
			title: "P/O번호",
			dataIndex: "poNum",
			key: "poNum",
			sorter: (a, b) => stringSorter(a, b, "poNum"),
			sortOrder: sortedInfo.columnKey === "poNum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "특주번호",
			dataIndex: "specialNum",
			key: "specialNum",
			align: "center",
			sorter: (a, b) => stringSorter(a, b, "specialNum"),
			sortOrder:
				sortedInfo.columnKey === "specialNum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 80,
		},
		{
			title: "MGMR",
			dataIndex: "mgmr",
			key: "mgmr",
			align: "center",
			sorter: (a, b) => stringSorter(a, b, "mgmr"),
			sortOrder: sortedInfo.columnKey === "mgmr" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "현재상태",
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
			title: "납품계획일",
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
			dataIndex: "deliDate",
			key: "deliDate",
			align: "center",
			sorter: (a, b) => dateSorter(a, b, "deliDate"),
			sortOrder: sortedInfo.columnKey === "deliDate" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "통신방식",
			dataIndex: "commuWay",
			key: "commuWay",
			sorter: (a, b) => stringSorter(a, b, "commuWay"),
			sortOrder: sortedInfo.columnKey === "commuWay" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "통신코드",
			dataIndex: "commuCode",
			key: "commuCode",
			sorter: (a, b) => stringSorter(a, b, "commuCode"),
			sortOrder: sortedInfo.columnKey === "commuCode" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "피팅종류",
			dataIndex: "fitting",
			key: "fitting",
			sorter: (a, b) => stringSorter(a, b, "fitting"),
			sortOrder: sortedInfo.columnKey === "fitting" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사이즈/씰",
			dataIndex: "size",
			key: "size",
			sorter: (a, b) => stringSorter(a, b, "size"),
			sortOrder: sortedInfo.columnKey === "size" ? sortedInfo.order : null,
			width: 85,
		},
		{
			title: "사용가스",
			dataIndex: "useGas",
			key: "useGas",
			sorter: (a, b) => stringSorter(a, b, "useGas"),
			sortOrder: sortedInfo.columnKey === "useGas" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "유량",
			dataIndex: "flow",
			key: "flow",
			sorter: (a, b) => stringSorter(a, b, "flow"),
			sortOrder: sortedInfo.columnKey === "flow" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: "C.F",
			dataIndex: "cf",
			key: "cf",
			sorter: (a, b) => stringSorter(a, b, "cf"),
			sortOrder: sortedInfo.columnKey === "cf" ? sortedInfo.order : null,
			width: 64,
		},
		{
			title: "환산유량",
			dataIndex: "converseFlow",
			key: "converseFlow",
			sorter: (a, b) => stringSorter(a, b, "converseFlow"),
			sortOrder:
				sortedInfo.columnKey === "converseFlow" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "입력단위",
			dataIndex: "unit",
			key: "unit",
			sorter: (a, b) => stringSorter(a, b, "unit"),
			sortOrder: sortedInfo.columnKey === "unit" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사용압력",
			dataIndex: "press",
			key: "press",
			sorter: (a, b) => stringSorter(a, b, "press"),
			sortOrder: sortedInfo.columnKey === "press" ? sortedInfo.order : null,
			width: 136,
		},
		{
			title: "노즐경",
			dataIndex: "nozzle",
			key: "nozzle",
			sorter: (a, b) => stringSorter(a, b, "nozzle"),
			sortOrder: sortedInfo.columnKey === "nozzle" ? sortedInfo.order : null,
			width: 70,
		},
		{
			title: "바이패스 튜브",
			dataIndex: "tube",
			key: "tube",
			sorter: (a, b) => stringSorter(a, b, "tube"),
			sortOrder: sortedInfo.columnKey === "tube" ? sortedInfo.order : null,
			width: 105,
		},
		{
			title: "비고",
			dataIndex: "etc",
			key: "etc",
			sorter: (a, b) => stringSorter(a, b, "etc"),
			sortOrder: sortedInfo.columnKey === "etc" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "영업팀 메모",
			dataIndex: "businessMemo",
			key: "businessMemo",
			sorter: (a, b) => stringSorter(a, b, "businessMemo"),
			sortOrder:
				sortedInfo.columnKey === "businessMemo" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "제조팀 메모",
			dataIndex: "makeMemo",
			key: "makeMemo",
			sorter: (a, b) => stringSorter(a, b, "makeMemo"),
			sortOrder: sortedInfo.columnKey === "makeMemo" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "제조팀 메모",
			dataIndex: "qualityMemo",
			key: "qualityMemo",
			sorter: (a, b) => stringSorter(a, b, "qualityMemo"),
			sortOrder:
				sortedInfo.columnKey === "qualityMemo" ? sortedInfo.order : null,
			width: 160,
		},
	];

	return (
		<Layout>
			<Flex align="center" justify="space-between" className="title-area">
				<Title level={4} className="title-page">
					영업 관리
				</Title>

				<Flex gap="small">
					<AutoComplete
						popupClassName="certain-category-search-dropdown"
						popupMatchSelectWidth={400}
						style={{
							width: 400,
						}}
						options={options}
						size="large"
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

			<Tabs defaultActiveKey="1" items={TabItems} onChange={onChange} />

			<Space direction="vertical" size={12} style={{ width: "100%" }}>
				{/* 상단 버튼 */}
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
					</Flex>

					<Flex gap="small">
						<Button
							variant="outlined"
							icon={<DownOutlined />}
							iconPosition={position}
						>
							상태변경
						</Button>

						<Button
							variant="outlined"
							icon={<DownOutlined />}
							iconPosition={position}
						>
							일괄변경
						</Button>

						<Button>항목편집</Button>

						<Button variant="outlined" icon={<DownloadOutlined />}>
							엑셀 다운로드
						</Button>

						<Button
							variant="outlined"
							icon={<DownOutlined />}
							iconPosition={position}
						>
							인쇄하기
						</Button>
					</Flex>
				</Flex>

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

						<Button
							icon={<SettingOutlined />}
							target="_blank"
							className="icon-redo"
						/>
					</Flex>
				</Flex>

				{/* 테이블 */}
				<Table
					columns={columns}
					dataSource={data}
					onChange={handleChange}
					pagination={false}
					size="small"
					className="width-auto"
					bordered
					scroll={{
						x: "max-content",
					}}
				/>
			</Space>
		</Layout>
	);
};

export default OrderComponent;
