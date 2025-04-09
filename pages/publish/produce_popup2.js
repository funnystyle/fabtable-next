// pages/product_popup2.js
import React, { useState, useEffect } from "react";
import {
	Flex,
	Typography,
	Button,
	Splitter,
	Tabs,
	Radio,
	Pagination,
	Table,
	Input,
	Select,
	Tag,
	Form,
	DatePicker,
	Tooltip,
} from "antd";
import {
	ClockCircleFilled,
	SettingOutlined,
	LeftOutlined,
	RightOutlined,
	VerticalRightOutlined,
	VerticalLeftOutlined,
	RollbackOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
import "dayjs/locale/ko";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// 탭
import ProduceBasic1 from "./components/ProduceBasic1";
import ProduceBasic2 from "./components/ProduceBasic2";
import ProduceBasic3 from "./components/ProduceBasic3";
import ProduceBasic7 from "./components/ProduceBasic7";
const { TabPane } = Tabs;

const onChange = (key) => {
	console.log(key);
};

const range = (start, end) => {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
};

const openPopup = ({
	url = '/',
	name = 'popupWindow',
	width = 1280,
	height = 1120,
	resizable = 'yes',
	scrollbars = 'yes',
}) => {
	const screenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
	const screenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
	const screenWidth = window.screen.availWidth;
	const screenHeight = window.screen.availHeight;

	const left = screenLeft + (screenWidth - width) / 2;
	const top = screenTop + (screenHeight - height) / 2;

	const features = `width=${width},height=${height},top=${top},left=${left},resizable=${resizable},scrollbars=${scrollbars}`;

	window.open(url, name, features);
};

const ProducePop2Component = () => {
	const [current, setCurrent] = useState(2);
	const [inputValue, setInputValue] = useState("2");
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(50);
	const [totalPages, setTotalPages] = useState(
		Math.ceil(totalItems / pageSize)
	);

	useEffect(() => {
		document.documentElement.classList.add("f-html");
		document.body.classList.add("f-body");

		setTotalPages(Math.ceil(totalItems / pageSize));
		if (current > totalPages) {
			setCurrent(totalPages);
		}

		// Cleanup: 페이지가 변경될 때 클래스 제거
		return () => {
			document.documentElement.classList.remove("f-html");
			document.body.classList.remove("f-body");
		};
	}, [pageSize, totalItems, totalPages]);

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

	const columns = [
		{
			title: "항목코드",
			dataIndex: "code",
			rowScope: "row",
			width: "104px",
		},
		{
			title: "입력수준",
			dataIndex: "level",
			rowScope: "row",
			width: "72px",
		},
		{
			title: "항목명",
			dataIndex: "name",
		},
		{
			title: "데이터 연동",
			dataIndex: "data",
			rowScope: "row",
			width: "179px",
		},
		{
			title: "입력",
			dataIndex: "input",
			width: "179px",
		},
	];
	const data = [
		{
			key: "1",
			code: (
				<Tooltip
					title="조립공정0001"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>조립공정0001</span>
				</Tooltip>
			),
			level: (
				<Tooltip
					title="필수"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>필수</span>
				</Tooltip>
			),
			name: (
				<Tooltip
					title="보빈 시리얼"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>보빈 시리얼</span>
				</Tooltip>
			),
			data: (
				<Tooltip
					title="1232435436547657658675848712324354365476576586758487"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
					placement="left"
				>
					<span>1232435436547657658675848712324354365476576586758487</span>
				</Tooltip>
			),
			input: (
				<div className="data-input-area">
					<Input placeholder="내용 입력" />
				</div>
			),
		},
		{
			key: "2",
			code: "조립공정0002",
			level: "필수",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: <div className="data-input-area not">해당없음</div>,
		},
		{
			key: "3",
			code: "조립공정0003",
			level: "샘플링검사",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: (
				<div className="data-input-area fail-pass">
					<Radio.Group
						size="small"
						optionType="button"
						buttonStyle="solid"
						className="radio-fail-pass"
					>
						<Radio.Button value="fail">FAIL</Radio.Button>
						<Radio.Button value="pass">PASS</Radio.Button>
					</Radio.Group>
				</div>
			),
		},
		{
			key: "4",
			code: "조립공정0003",
			level: "샘플링검사",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: (
				<div className="data-input-area fail-pass">
					<Radio.Group
						defaultValue="fail"
						size="small"
						optionType="button"
						buttonStyle="solid"
						className="radio-fail-pass"
					>
						<Radio.Button value="fail">FAIL</Radio.Button>
						<Radio.Button value="pass">PASS</Radio.Button>
					</Radio.Group>
				</div>
			),
		},
		{
			key: "5",
			code: "조립공정0003",
			level: "샘플링검사",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: (
				<div className="data-input-area fail-pass">
					<Radio.Group
						defaultValue="pass"
						size="small"
						optionType="button"
						buttonStyle="solid"
						className="radio-fail-pass"
					>
						<Radio.Button value="fail">FAIL</Radio.Button>
						<Radio.Button value="pass">PASS</Radio.Button>
					</Radio.Group>
				</div>
			),
		},
		{
			key: "6",
			code: "조립공정0003",
			level: "샘플링검사",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="목록 선택"
						options={[
							{ value: "1", label: "Jack" },
							{ value: "2", label: "Lucy" },
							{ value: "3", label: "Tom" },
						]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
		},
		{
			key: "7",
			code: "조립공정0004",
			level: "샘플링검사",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: (
				<div className="data-input-area">
					<Button type="link" icon={<UploadOutlined />} iconPosition="end">
						파일 업로드
					</Button>
				</div>
			),
		},
		{
			key: "8",
			code: "조립공정0004",
			level: "샘플링검사",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: (
				<div className="data-input-area">
					<Button type="link" icon={<UploadOutlined />} iconPosition="end">
						파일 업로드
					</Button>

					<Tag color="magenta" className="tag-complete">
						완료
					</Tag>
				</div>
			),
		},
	];

	return (
		<div className="system-popup-wrap">
			<Flex
				align="center"
				justify="space-between"
				className="system-title-area"
			>
				<Flex
					align="center"
					justify="space-between"
					className="control-info-area"
				>
					<p>
						표준시간 <span>00:00</span>
					</p>

					<p>
						표준등급 <span>3</span>
					</p>
				</Flex>

				<Title level={3} className="title-page">
					생산 공정명
				</Title>

				<Flex
					align="center"
					justify="space-between"
					className="control-info-area"
				>
					<Flex gap={4} align="center" className="space-line">
						<ClockCircleFilled style={{ color: "#00000073" }} />

						<p>00:00</p>
					</Flex>

					<div className="space-line">
						<Button>제어계수</Button>
					</div>

					<Flex gap={4} align="center" className="space-line">
						<Button>공정시작</Button>
						<Button disabled>공정완료</Button>
						<Button>수정</Button>
						<Button>재작업 시작</Button>
						<Button
							onClick={() => openPopup({
								url: "/publish/produce_popup3",
								name: "produce_popup3",
							})}
						>부적합 관리</Button>
					</Flex>
				</Flex>
			</Flex>

			<div className="popup-contents pd0">
				<Splitter>
					<Splitter.Panel defaultSize="40%" collapsible>
						<Tabs defaultActiveKey="1" type="card" className="tab-round">
							{/* 메인 탭 1: 기초 정보 */}
							<TabPane tab="기초 정보" key="1">
								<Tabs
									defaultActiveKey="1-1"
									type="card"
									className="tab-round-sm"
								>
									<TabPane tab="수주정보" key="1-1">
										<ProduceBasic1 />
									</TabPane>

									<TabPane tab="조립정보" key="1-2">
										<ProduceBasic2 />
									</TabPane>

									<TabPane tab="리크정보" key="1-3">
										<ProduceBasic3 />
									</TabPane>

									<TabPane
										tab={
											<span
												onClick={(e) => {
													e.preventDefault(); // 기본 탭 전환 막기
													window.open("/"); // 새 창 열기
												}}
											>
												교정정보
											</span>
										}
										key="1-4"
									></TabPane>

									<TabPane
										tab={
											<span
												// onClick={(e) => {
												// 	e.preventDefault(); // 기본 탭 전환 막기
												// 	window.open("/"); // 새 창 열기
												// }}
												onClick={() => openPopup({
													url: "/publish/produce_ratio_control",
													name: "produce_ratio_control",
												})}
											>
												비율제어
											</span>
										}
										key="1-5"
									></TabPane>

									<TabPane
										tab={
											<span
												// onClick={(e) => {
												// 	e.preventDefault(); // 기본 탭 전환 막기
												// 	window.open("/"); // 새 창 열기
												// }}
												onClick={() => openPopup({
													url: "/publish/produce_popup",
													name: "produce_popup",
												})}
											>
												제어계수
											</span>
										}
										key="1-6"
									></TabPane>

									<TabPane tab="메모" key="1-7">
										<ProduceBasic7 />
									</TabPane>
								</Tabs>
							</TabPane>

							{/* 메인 탭 2: 작업 표준서 */}
							<TabPane tab="작업 표준서" key="2">
								<div>
									<Flex
										align="center"
										justify="space-between"
										className="pdf-title-area"
									>
										<p className="pdf-title">조립 순서-MARU-7000.pdf</p>

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
												pageSize={pageSize}
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
									</Flex>

									{/* PDF 문서 영역 */}
									<div className="pdf-area"></div>
								</div>
							</TabPane>
						</Tabs>
					</Splitter.Panel>
					<Splitter.Panel defaultSize="60%" collapsible>
						<Splitter lazy layout="vertical">
							<Splitter.Panel min={40}>
								<Flex
									align="center"
									justify="space-between"
									className="title-bg-gray"
								>
									<Flex align="center" gap={4}>
										<p className="title-bullet">입력 항목</p>

										<p className="input-num-txt">
											(필수: <span className="red">3</span>/10 선택: 0/2)
										</p>
									</Flex>

									<Flex align="center" gap={4}>
										<Button type="text" className="btn-all-reset">
											초기화
										</Button>

										<Button
											size="small"
											icon={<RollbackOutlined />}
											iconPosition="end"
										>
											이전 데이터 가져오기
										</Button>
									</Flex>
								</Flex>

								<Flex justify="space-between">
									<Radio.Group
										defaultValue="ch1"
										size="small"
										optionType="button"
										buttonStyle="solid"
										className="top-radio-area"
									>
										<Radio.Button value="ch1">1ch</Radio.Button>
										<Radio.Button value="ch2">2ch</Radio.Button>
										<Radio.Button value="ch3">3ch</Radio.Button>
										<Radio.Button value="ch4">4ch</Radio.Button>
										<Radio.Button value="ch5">5ch</Radio.Button>
										<Radio.Button value="ch6">6ch</Radio.Button>
									</Radio.Group>

									<Flex align="center" gap={4} className="btn-number-area">
										<Flex align="center" gap={4} className="btn-space">
											<Button type="primary" size="small">
												3차
											</Button>

											<Button size="small">2차</Button>

											<Button size="small">1차</Button>
										</Flex>

										<Button
											size="small"
											icon={<PlusOutlined />}
											iconPosition="end"
										>
											입력차수 추가
										</Button>
									</Flex>
								</Flex>

								{/* 스크롤이 생길때 scrollable 클래스 추가 */}
								<div className="input-tb-area">
									<p className="title-input-tb">테이블 제목이 있는 경우</p>

									<Table
										columns={columns}
										dataSource={data}
										pagination={false}
										className="input-tb"
									/>

									<p className="title-input-tb">테이블 제목이 있는 경우</p>

									<Table
										columns={columns}
										dataSource={data}
										pagination={false}
										className="input-tb"
									/>

									<p className="title-input-tb">테이블 제목이 있는 경우</p>

									<Table
										columns={columns}
										dataSource={data}
										pagination={false}
										className="input-tb"
									/>
								</div>
							</Splitter.Panel>
							<Splitter.Panel defaultSize="35%" min={90}>
								<Flex vertical style={{ height: "100%" }}>
									<Flex
										align="center"
										justify="space-between"
										className="title-bg-gray"
									>
										<Flex align="center" gap={4}>
											<p className="title-bullet">점검 항목</p>

											<p className="input-num-txt">
												(필수: <span className="blue">3</span>/10 선택: 0/2)
											</p>
										</Flex>

										<Flex align="center" gap={4}>
											<Button type="text" className="btn-all-reset">
												초기화
											</Button>

											<Button size="small">일괄 PASS</Button>
										</Flex>
									</Flex>

									{/* 스크롤이 생길때 scrollable 클래스 추가 */}
									<div className="input-tb-area check">
										<Table
											columns={columns}
											dataSource={data}
											pagination={false}
											className="input-tb"
										/>

										<p className="title-input-tb">두번째 테이블</p>

										<Table
											columns={columns}
											dataSource={data}
											pagination={false}
											className="input-tb"
										/>

										<p className="title-input-tb">세번째 테이블</p>

										<Table
											columns={columns}
											dataSource={data}
											pagination={false}
											className="input-tb"
										/>
									</div>

									<Flex align="center" gap={16} className="assembly-area">
										<Form.Item label="조립자">
											<Select showSearch>
												<Select.Option value="assembly1">-</Select.Option>
											</Select>
										</Form.Item>

										<Form.Item label="조립일시">
											{/* disabled일때 disabled 넣기 */}
											<DatePicker
												format="YYYY-MM-DD HH:mm:ss"
												showTime={{
													defaultValue: dayjs("00:00:00", "HH:mm:ss"),
												}}
												placeholder="날짜, 시간 자동 입력"
												disabled
											/>
										</Form.Item>
									</Flex>
								</Flex>
							</Splitter.Panel>
						</Splitter>
					</Splitter.Panel>
				</Splitter>
			</div>
		</div>
	);
};

ProducePop2Component.getLayout = (page) => page;

export default ProducePop2Component;
