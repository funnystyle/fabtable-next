// pages/order.js
import React, { useState, useContext, useRef, useEffect } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAxios, postAxios, putAxios } from "@api/apiClient";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { handleCopyModal } from "@components/list/handleCopyModal";
import {handleEditModal} from "@components/list/handleEditModal";

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

	const [copyForm] = Form.useForm();
	const [editForm] = Form.useForm();

	const [copyModalBoxList, setCopyModalBoxList] = useState([]);
	const [queryKey4, setQueryKey4] = useState(["input-box-list", "recordListCopyModal", Math.random()]);
	const { data:copyModalBoxResponse, isSuccess:isSuccess4 } = useQuery({
		queryKey: queryKey4,
		queryFn: () => getAxios("/user/input-box", {type:"recordListCopyModal"}),
	});
	useEffect(() => {
		if (isSuccess4) {
			setCopyModalBoxList(copyModalBoxResponse.data.list);
		}
	}, [isSuccess4]);

	// 복제 모달 열기
	const showCopyModal = () => {
		setModalContent(handleCopyModal(copyForm, selectedRowKeys.length, copyModalBoxList));

		setOpenCopyModal(true);
	};

	const { mutate: orderInfoCopy } = useMutation({
		mutationKey: "orderInfoCopy",
		mutationFn: (values) => postAxios("/user/record/copy", values),
	});

	const handleSubmit = async (event) => {
		const values = await copyForm.validateFields();
		values["ids"] = selectedRowKeys;

		await orderInfoCopy(values);
		setOpenCopyModal(false);

		setTimeout(() => {
		handleSearch();
		}, 100);
		message.success('복제가 완료되었습니다!');
	}

	const [editModalBoxList, setEditModalBoxList] = useState([]);
	const [queryKey5, setQueryKey5] = useState(["input-box-list", "recordListCopyModal", Math.random()]);
	const { data:editModalBoxResponse, isSuccess:isSuccess5 } = useQuery({
		queryKey: queryKey5,
		queryFn: () => getAxios("/user/input-box", {type:"recordListEditModal"}),
	});
	useEffect(() => {
		if (isSuccess5) {
			setEditModalBoxList(editModalBoxResponse.data.list);
		}
	}, [isSuccess5]);

	// 일괄수정 모달 열기
	const showEditModal = () => {
		setModalContent(handleEditModal(editForm, selectedRowKeys.length, editModalBoxList));

		setOpenEditModal(true);
	};

	const handleEditSubmit = async (e) => {
		const values = await editForm.validateFields();
		values["ids"] = selectedRowKeys;

		await nowStateChange(values);
		setOpenEditModal(false);

		if (selectedRowKeys.length > 0) {
			setTimeout(() => {
				handleSearch();
			}, 100);
		}
	}

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
				handleEditSubmit();
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

	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행

	function transformColumns(jsonResult, sortedInfo) {
		return jsonResult.map(item => {
			const { recordColumn, displayName, width, fixedDiv, alignDiv } = item;
			const dataIndex = recordColumn == null ? "id" : recordColumn.name;

			let sorterFunction = null;
			if (recordColumn == null || recordColumn.dataType === "Integer" || recordColumn.dataType === "Double" || recordColumn.dataType === "Long" || recordColumn.dataType === "Float") {
				sorterFunction = (a, b) => a[dataIndex] - b[dataIndex];
			} else if (recordColumn.dataType === "String") {
				sorterFunction = (a, b) => stringSorter(a, b, dataIndex);
			} else if (recordColumn.dataType === "Date" || recordColumn.dataType === "Datetime") {
				sorterFunction = (a, b) => dateSorter(a, b, dataIndex);
			}

			return {
				title: displayName,
				showSorterTooltip: { title: displayName },
				dataIndex: dataIndex,
				key: dataIndex,
				sorter: sorterFunction,
				sortOrder: sortedInfo.columnKey === dataIndex ? sortedInfo.order : null,
				ellipsis: true,
				width: width || 100,
				align: alignDiv === "LEFT" ? "left" : alignDiv === "RIGHT" ? "right" : "center",
				fixed: fixedDiv === "LEFT" ? "left" : fixedDiv === "RIGHT" ? "right" : false,
			};
		});
	}

	function transformTagData(data) {
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

	const [statusList, setStatusList] = useState([]);
	const [searchStatusList, setSearchStatusList] = useState([]);
	const [stateStatusList, setStateStatusList] = useState([]);
	const items = statusList.map((status, i) => ({
		key: `${i + 1}`,
		label: (
			<div onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={checkedItems[i]}
					onChange={() => handleItemChange(i, status)}
				>
					{status}
				</Checkbox>
			</div>
		),
	}));

	const handleAllChange = (e) => {
		const checked = e.target.checked;
		setAllChecked(checked);
		setCheckedItems(Array(17).fill(checked));
		if (checked) {
			setSearchStatusList([...statusList]);
		} else {
			setSearchStatusList([]);
		}
	};

	const handleItemChange = (index, status) => {
		if(searchStatusList.includes(status)) {
			setSearchStatusList(searchStatusList.filter(item => item !== status));
		} else {
			setSearchStatusList([...searchStatusList, status]);
		}

		const updated = [...checkedItems];
		updated[index] = !updated[index];
		setCheckedItems(updated);

		setAllChecked(updated.every(Boolean));
	};


	const { mutate: nowStateChange } = useMutation({
		mutationKey: "nowStateChange",
		mutationFn: (values) => putAxios("/user/record", values),
	});

	const handleStatusChange = async (e) => {
		if (selectedRowKeys.length > 0) {
			await nowStateChange({ ids: selectedRowKeys, nowState: statusList[e.key] });
			setTimeout(() => {
				handleSearch();
			}, 100);
		}
	}

	const [queryKey3, setQueryKey3] = useState(["status-list", Math.random()]);
	const { data:statusListResponse, isSuccess:isSuccess3 } = useQuery({
		queryKey: queryKey3,
		queryFn: () => getAxios("/user/code", {groupName: "현재상태"}),
	});
	useEffect(() => {
		if (isSuccess3) {
			const stList = statusListResponse.data.list.map((item) => item.codeName);
			setStatusList(stList);
			setSearchStatusList(stList);

			setStateStatusList(stList.slice(11, 14).map((item, i) => ({label: item, key: `${i + 11}`})));
		}
	}, [isSuccess3]);

	const [searchKeyword, setSearchKeyword] = useState("");
	const [recordList, setRecordList] = useState([]);
	const [size, setSize] = useState(10);
	const [queryKey, setQueryKey] = useState(["record-list", searchKeyword, size, searchStatusList, Math.random()]);
	const { data:recordResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/record", {searchKeyword,
			size,
			statusList: searchStatusList,
		}),
	});
	const handleSearch = () => {
		setQueryKey(["record-list", searchKeyword, size, searchStatusList, Math.random()]);
	}
	useEffect(() => {
		handleSearch();
	}, [searchKeyword, size, searchStatusList]);
	useEffect(() => {
		if (isSuccess) {
			setRecordList(transformTagData(recordResponse.data));
		}
	}, [isSuccess]);

	const [headerList, setHeaderList] = useState([]);
	const [queryKey2, setQueryKey2] = useState(["columns", Math.random()]);
	const { data:headerResponse, isSuccess:isSuccess2 } = useQuery({
		queryKey: queryKey2,
		queryFn: () => getAxios("/user/header", {headerDiv: "SALES"}),
	});
	useEffect(() => {
		if (isSuccess) {
			setHeaderList(transformColumns(headerResponse.data.list, sortedInfo));

		}
	}, [isSuccess2]);

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
								// onChange={(e) => setSearchKeyword(e.target.value)}
								onSearch={(value) => setSearchKeyword(value)}
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
									menu={{ items: stateStatusList, onClick: handleStatusChange }}
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
					<TableOnRowSelect2 header={headerList} serverData={recordList} size={size} setSize={setSize} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
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
					onOk={handleSubmit}
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
