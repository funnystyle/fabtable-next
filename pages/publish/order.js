// pages/order.js
import React, { useState, useContext, useRef } from "react";
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
	CalendarOutlined,
	ExclamationCircleFilled,
} from "@ant-design/icons";

import DrawerComponent from "@publish/components/drawer";
import Draggable from "react-draggable";
import Link from "next/link";
import { useRouter } from "next/router";

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
		release: "DEMO",
		vendor: "원익IPS",
		product: "MARU",
		model: "7000s",
		detailmodel: "7000",
		productNum: "A24-000019",
		productVersion: "230300.010",
		poNum: "-",
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
		vendor: (
			<Tooltip
				title="비티에이머티어리얼즈 유한회사"
				color="#FFFBE6"
				overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
			>
				<span>BTA</span>
			</Tooltip>
		),
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

const handleMenuClick = (e) => {
	message.info("Click on menu item.");
	console.log("click", e);
};

const stateItems = [
	{
		label: "납품완료",
		key: "1",
	},
	{
		label: "반출대기",
		key: "2",
	},
	{
		label: "반출완료",
		key: "3",
	},
];

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

const preventDefault = (e) => {
	e.preventDefault();
	console.log("Clicked! But prevent default.");
};

const OrderComponent = ({ contentHeight }) => {
	const { token } = useToken();
	const [allChecked, setAllChecked] = useState(true);
	const [checkedItems, setCheckedItems] = useState(Array(16).fill(true));
	const [position, setPosition] = useState("end");
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === "1") {
			router.push("/publish/order");
		} else if (key === "2") {
			router.push("/publish/orderwrite");
		}
	};

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
			fixed: "left",
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
			fixed: "left",
		},
		{
			title: "출고종류",
			showSorterTooltip: { title: "출고종류" },
			dataIndex: "release",
			key: "release",
			sorter: (a, b) => stringSorter(a, b, "release"),
			sortOrder: sortedInfo.columnKey === "release" ? sortedInfo.order : null,
			ellipsis: true,
			width: 76,
			fixed: "left",
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
			fixed: "left",
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
			fixed: "left",
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
			fixed: "left",
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
			fixed: "left",
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
			title: "특주번호",
			showSorterTooltip: { title: "특주번호" },
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
			title: "통신방식",
			showSorterTooltip: { title: "통신방식" },
			dataIndex: "commuWay",
			key: "commuWay",
			sorter: (a, b) => stringSorter(a, b, "commuWay"),
			sortOrder: sortedInfo.columnKey === "commuWay" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "통신코드",
			showSorterTooltip: { title: "통신코드" },
			dataIndex: "commuCode",
			key: "commuCode",
			sorter: (a, b) => stringSorter(a, b, "commuCode"),
			sortOrder: sortedInfo.columnKey === "commuCode" ? sortedInfo.order : null,
			width: 80,
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
			title: "입력단위",
			showSorterTooltip: { title: "입력단위" },
			dataIndex: "unit",
			key: "unit",
			sorter: (a, b) => stringSorter(a, b, "unit"),
			sortOrder: sortedInfo.columnKey === "unit" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사용압력",
			showSorterTooltip: { title: "사용압력" },
			dataIndex: "press",
			key: "press",
			sorter: (a, b) => stringSorter(a, b, "press"),
			sortOrder: sortedInfo.columnKey === "press" ? sortedInfo.order : null,
			width: 136,
		},
		{
			title: "노즐경",
			showSorterTooltip: { title: "노즐경" },
			dataIndex: "nozzle",
			key: "nozzle",
			sorter: (a, b) => stringSorter(a, b, "nozzle"),
			sortOrder: sortedInfo.columnKey === "nozzle" ? sortedInfo.order : null,
			width: 70,
		},
		{
			title: "바이패스 튜브",
			showSorterTooltip: { title: "바이패스 튜브" },
			dataIndex: "tube",
			key: "tube",
			sorter: (a, b) => stringSorter(a, b, "tube"),
			sortOrder: sortedInfo.columnKey === "tube" ? sortedInfo.order : null,
			width: 105,
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
			title: "제조팀 메모",
			showSorterTooltip: { title: "제조팀 메모" },
			dataIndex: "qualityMemo",
			key: "qualityMemo",
			sorter: (a, b) => stringSorter(a, b, "qualityMemo"),
			sortOrder:
				sortedInfo.columnKey === "qualityMemo" ? sortedInfo.order : null,
			width: 160,
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

		if (type === "label") {
			setDrawerContent(
				<>
					<Form layout="vertical">
						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">인쇄 구분</p>
						</Flex>

						<Form.Item>
							<Select
								defaultValue="print1"
								onChange={handleChange}
								options={[
									{
										value: "print1",
										label: "라벨 인쇄",
									},
									{
										value: "print2",
										label: "성적서 인쇄",
									},
								]}
							/>
						</Form.Item>

						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">라벨 설정</p>

							<Button type="link" className="btn-reset-txt">
								설정 초기화
							</Button>
						</Flex>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="라벨 종류" name="radio1">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio1-1">라벨 1 --&gt; 2 --&gt; 3</Radio>
										<Radio value="radio1-2">라벨 1</Radio>
										<Radio value="radio1-3">라벨 2</Radio>
										<Radio value="radio1-4">라벨 3</Radio>
										<Radio value="radio1-5">라벨 4</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Divider style={{ marginTop: 16, marginBottom: 16 }} />

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="라벨 1 규격 (mm)" name="radio2">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio2-1">규격 1 (30*70)</Radio>
										<Radio value="radio2-2">규격 2 (40*70)</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="라벨 2 규격 (mm)" name="radio3">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio3-1">규격 1 (35*70)</Radio>
										<Radio value="radio3-2">규격 2 (45*70)</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Divider style={{ marginTop: 16, marginBottom: 16 }} />

						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">기타</p>

							<Button type="link" className="btn-reset-txt">
								설정 초기화
							</Button>
						</Flex>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="AS 연락처" name="radio4">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio4-1">한국 본사</Radio>
										<Radio value="radio4-2">중국 상해법인</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="장착 방향" name="radio5">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio5-1">정방향 ( &lt;-- ) </Radio>
										<Radio value="radio5-2">역방향 ( --&gt; ) </Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</>
			);
		} else if (type === "report") {
			setDrawerContent(
				<>
					<Form layout="vertical">
						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">인쇄 구분</p>
						</Flex>

						<Form.Item>
							<Select
								defaultValue="select2"
								onChange={handleChange}
								options={[
									{
										value: "select1",
										label: "라벨 인쇄",
									},
									{
										value: "select2",
										label: "성적서 인쇄",
									},
								]}
							/>
						</Form.Item>

						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">성적서 구분</p>

							<Button type="link" className="btn-reset-txt">
								설정 초기화
							</Button>
						</Flex>

						<Row gutter={16}>
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
						</Row>

						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">양식 선택</p>
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
					</Form>
				</>
			);
		}

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
	const [openCopyModal, setOpenCopyModal] = useState(false); // Modal 열림 상태
	const [openEditModal, setOpenEditModal] = useState(false);
	const [modalContent, setModalContent] = useState(null); // Modal 내용
	const [modal, contextHolder] = Modal.useModal();

	// 복제 모달 열기
	const showCopyModal = () => {
		setModalContent(
			<>
				<Flex align="center" justify="space-between">
					<p className="total-txt">
						선택 총 <strong>1</strong> 건
					</p>

					<Button type="link" className="btn-reset-txt">
						입력 초기화
					</Button>
				</Flex>

				<p className="modal-txt">복수의 수주 복제 시 수량을 꼭 확인하세요.</p>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">복제 설정</p>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item label="복제수량" name="num-input1">
								<InputNumber
									min={1}
									max={10}
									defaultValue={3}
									onChange={onChange}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label="분류코드"
								tooltip={
									<>
										제조2팀 (0) <br />
										R&D혁신센터 (1) <br />
										제조2팀 (2)
									</>
								}
							>
								<Select
									defaultValue="groupCode1"
									onChange={handleChange}
									options={[
										{
											value: "groupCode1",
											label: "0",
										},
										{
											value: "groupCode2",
											label: "1",
										},
										{
											value: "groupCode3",
											label: "2",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label={<Link href={"/"}>납품계획일</Link>}
								name="input4"
							>
								<DatePicker onChange={onChange} placeholder="날짜 선택" />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label="출고종류">
								<Select
									defaultValue="release1"
									onChange={handleChange}
									options={[
										{
											value: "release1",
											label: "제품 매출",
										},
										{
											value: "release2",
											label: "수리 (유상)",
										},
										{
											value: "release3",
											label: "수리 (무상)",
										},
										{
											value: "release4",
											label: "DEMO (유상)",
										},
										{
											value: "release5",
											label: "DEMO (무상)",
										},
										{
											value: "release6",
											label: "CS 대체품",
										},
										{
											value: "release7",
											label: "STOCK (CS)",
										},
										{
											value: "release8",
											label: "STOCK (양산)",
										},
										{
											value: "release9",
											label: "사내활용",
										},
										{
											value: "release10",
											label: "ETC",
										},
									]}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="P/O 번호" name="po_num">
								<Input placeholder="미해당 시 비워두세요" />
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item label="프로젝트 번호" name="project_num">
								<Input placeholder="미해당 시 비워두세요" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</>
		);

		setOpenCopyModal(true);
	};

	// 일괄수정 모달 열기
	const showEditModal = () => {
		setModalContent(
			<>
				<Flex align="center" justify="space-between">
					<p className="total-txt">
						총 <strong>50</strong> 건
					</p>

					<Button type="link" className="btn-reset-txt">
						입력 초기화
					</Button>
				</Flex>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">기본 정보</p>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item label={<Link href={"/"}>등록자</Link>} name="writer1">
								<Select
									defaultValue="writer1"
									onChange={handleChange}
									options={[
										{
											value: "writer1",
											label: "홍길동",
										},
										{
											value: "writer2",
											label: "홍길동",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label={<Link href={"/"}>납품자</Link>} name="writer1">
								<Select
									defaultValue="supplier1"
									onChange={handleChange}
									options={[
										{
											value: "supplier1",
											label: "이몽룡",
										},
										{
											value: "supplier2",
											label: "이몽룡",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label={<Link href={"/"}>납품계획일</Link>}
								name="delivery1"
							>
								<DatePicker onChange={onChange} placeholder="날짜 선택" />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label="비고" name="po_num">
								<Input placeholder="-" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item label="영업팀 메모" name="business-memo">
								<Input placeholder="-" />
							</Form.Item>
						</Col>
					</Row>
				</Form>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">고객 정보</p>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item label="납품처" name="vendor1">
								<Select
									defaultValue="vendor1"
									onChange={handleChange}
									options={[
										{
											value: "vendor1",
											label: "원익IPS",
										},
										{
											value: "vendor2",
											label: "원익IPS",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label="납품처" name="client1">
								<Select
									defaultValue="client1"
									onChange={handleChange}
									options={[
										{
											value: "client1",
											label: "삼성",
										},
										{
											value: "client2",
											label: "삼성",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label="P/O 번호" name="po_num2">
								<Input placeholder="-" />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label="프로젝트번호" name="project_num2">
								<Input placeholder="-" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item label="영업팀 메모" name="business-memo">
								<Input placeholder="-" />
							</Form.Item>
						</Col>
					</Row>
				</Form>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">제품 정보</p>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Flex gap={16}>
						<Form.Item label="현재상태" name="state1">
							<Select
								defaultValue="state1"
								onChange={handleChange}
								options={[
									{
										value: "state1",
										label: "납품완료",
									},
									{
										value: "state2",
										label: "납품대기",
									},
								]}
							/>
						</Form.Item>

						<Form.Item label="포트위치" name="potposition1">
							<Select
								defaultValue="potposition1"
								onChange={handleChange}
								options={[
									{
										value: "potposition1",
										label: "Side",
									},
									{
										value: "potposition2",
										label: "Side",
									},
								]}
							/>
						</Form.Item>

						<Form.Item label="최소 압력" name="min-press">
							<InputNumber
								min={1}
								max={10}
								defaultValue={3}
								onChange={onChange}
							/>
						</Form.Item>

						<Form.Item label="중심 압력" name="mid-press">
							<InputNumber
								min={1}
								max={10}
								defaultValue={3}
								onChange={onChange}
							/>
						</Form.Item>

						<Form.Item label="최대 압력" name="max-press">
							<InputNumber
								min={1}
								max={10}
								defaultValue={3}
								onChange={onChange}
							/>
						</Form.Item>
					</Flex>
				</Form>
			</>
		);

		setOpenEditModal(true);
	};

	// 모달 닫기
	const closeModal = () => {
		setOpenCopyModal(false);
		setOpenEditModal(false);
	};

	const handleConfirmEdit = () => {
		modal.confirm({
			title: "수주 정보 일괄수정",
			icon: <ExclamationCircleFilled style={{ color: "#FAAD14" }} />,
			content:
				"여러 건의 수주 정보를 일괄 수정할까요? 수정 후에는 다시 되돌릴 수 없습니다. ",
			okText: "확인",
			cancelText: "취소",
			onOk() {
				console.log("수정 완료!");
				setTimeout(() => {
					closeModal();
				}, 100);
			},
			onCancel() {
				console.log("수정 취소");
			},
		});
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
			label: "수주 복제하기",
			key: "1",
		},
		{
			label: "수주 일괄수정",
			key: "2",
		},
		{
			label: "수주 종합정보",
			key: "3",
		},
		{
			label: "메모 수정",
			key: "4",
		},
		{
			type: "divider",
		},
		{
			label: "인쇄하기",
			key: "5",
			children: [
				{
					key: "5-1",
					label: "라벨 인쇄",
				},
				{
					key: "5-2",
					label: "성적서 인쇄",
				},
			],
		},
		{
			label: "엑셀 다운로드",
			key: "6",
			children: [
				{
					key: "6-1",
					label: "편집 항목만",
					children: [
						{
							key: "6-1-1",
							label: "선택한 행",
						},
						{
							key: "6-1-2",
							label: "전체 행",
						},
					],
				},
				{
					key: "6-2",
					label: "전체 항목",
					children: [
						{
							key: "6-2-1",
							label: "선택한 행",
						},
						{
							key: "6-2-2",
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

	const {
		token: { colorBgLayout, colorTextTertiary },
	} = theme.useToken();
	// --------- 우클릭 관련

	return (
		<Layout>
			<div className="contents-top">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
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

								<Dropdown
									menu={{ items: stateItems, onClick: handleMenuClick }}
								>
									<Button>
										<Space>
											상태변경
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>

							<Flex gap="small" className="btn-spacing-area">
								<Button onClick={showCopyModal}>수주 복제하기</Button>

								<Button onClick={showEditModal}>수주 일괄수정</Button>
							</Flex>

							<Flex gap="small">
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

			{/* ModalComponent 추가 - "수주 복제하기" 클릭 시 열림 */}
			<div style={{ display: openCopyModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							수주 복제하기
						</div>
					}
					open={openCopyModal}
					onCancel={() => setOpenCopyModal(false)}
					onOk={() => setOpenCopyModal(false)}
					okText="복제"
					cancelText="취소"
					width={640}
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

			{/* ModalComponent 추가 - "수주 일괄수정하기" 클릭 시 열림 */}
			<div style={{ display: openEditModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							수주 정보 일괄수정
						</div>
					}
					open={openEditModal}
					onCancel={() => setOpenEditModal(false)}
					onOk={() => {
						setTimeout(() => {
							handleConfirmEdit();
						}, 300);
					}}
					okText="수정"
					cancelText="취소"
					width={780}
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

export default OrderComponent;
