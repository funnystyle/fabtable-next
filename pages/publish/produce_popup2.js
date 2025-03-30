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

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

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

	const items = [
		{
			key: "1",
			label: "기초 정보",
			children: (
				<div className="tab-content-in">
					<Radio.Group
						defaultValue="basicinfo1"
						size="small"
						optionType="button"
						buttonStyle="solid"
						className="top-radio-area"
					>
						<Radio.Button value="basicinfo1">수주정보</Radio.Button>
						<Radio.Button value="basicinfo2">조립정보</Radio.Button>
						<Radio.Button value="basicinfo3">리크정보</Radio.Button>
						<Radio.Button value="basicinfo4">교정정보</Radio.Button>
						<Radio.Button value="basicinfo5">비율제어</Radio.Button>
						<Radio.Button value="basicinfo6">메모</Radio.Button>
					</Radio.Group>

					<Flex
						align="center"
						justify="space-between"
						className="title-bg-blue"
					>
						<p className="titie-info">수주정보</p>

						<p>
							<Button icon={<SettingOutlined />} size="small" />
						</p>
					</Flex>

					<Flex className="order-info-wrap">
						<div>
							<Flex align="center" className="order-info-area">
								<p className="title-order-info">시리얼번호</p>

								<p className="txt-order-info serial">57024060242</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">제조번호</p>

								<p className="txt-order-info">A2025-000025</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">납품처</p>

								<p className="txt-order-info">아이마켓(SEMES)</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">고객사</p>

								<p className="txt-order-info">아이코어시스템즈코리아</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">출고종류</p>

								<p className="txt-order-info">STOCK(양산)</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">제품군</p>

								<p className="txt-order-info">MARU</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">모델</p>

								<p className="txt-order-info">7000s</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">세부모델</p>

								<p className="txt-order-info">7000</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">채널</p>

								<p className="txt-order-info">-</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">MGMR</p>

								<p className="txt-order-info">O</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">MGMR BIN#</p>

								<p className="txt-order-info">4</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">MGMR 최대유량</p>

								<p className="txt-order-info">5000</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">MFC 사양</p>

								<p className="txt-order-info">-</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">유량범위</p>

								<p className="txt-order-info">5sccm~30SLM</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">장착위치</p>

								<p className="txt-order-info">Up Stream</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">밸브타입</p>

								<p className="txt-order-info">Solenoid (N.C)</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">하스텔로이</p>

								<p className="txt-order-info">X</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">Body 타입</p>

								<p className="txt-order-info">Normal</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">Orifice 씰링</p>

								<p className="txt-order-info">Metal</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">피팅종류</p>

								<p className="txt-order-info">IGS</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">싸이즈/씰</p>

								<p className="txt-order-info">1.125"W</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">Valve Seat</p>

								<p className="txt-order-info">Metal</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">후단 사용조건</p>

								<p className="txt-order-info">VACUUM</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">Liquid & Precursor</p>

								<p className="txt-order-info">CPZr</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">Cal Liquid</p>

								<p className="txt-order-info">IPA</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">비고</p>

								<p className="txt-order-info">-</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">특주번호</p>

								<p className="txt-order-info">S01</p>
							</Flex>
						</div>

						<div>
							<Flex align="center" className="order-info-area">
								<p className="title-order-info">제품 Rev</p>

								<p className="txt-order-info">2</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">압력범위 (최저)</p>

								<p className="txt-order-info">35</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">압력범위 (중심)</p>

								<p className="txt-order-info">35</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">압력범위 (최대)</p>

								<p className="txt-order-info">60</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">사용 압력단위</p>

								<p className="txt-order-info">PSI</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">제어 압력단위</p>

								<p className="txt-order-info">-</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">사용가스</p>

								<p className="txt-order-info">F2(20%)N2</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">교정가스</p>

								<p className="txt-order-info">N2</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">유량</p>

								<p className="txt-order-info">50000</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">C.F</p>

								<p className="txt-order-info">0.983</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">환산유량</p>

								<p className="txt-order-info">50864.7</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">유량단위</p>

								<p className="txt-order-info">SCCM</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">전원 포트형상</p>

								<p className="txt-order-info rial">Dsub MKP [9] PIN</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">포트위치</p>

								<p className="txt-order-info">Side</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">통신방식</p>

								<p className="txt-order-info">E-CAT</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">통신코드</p>

								<p className="txt-order-info">EtherCAT</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">IO Size</p>

								<p className="txt-order-info">-</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">MAX DATA</p>

								<p className="txt-order-info">-</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">납품계획일</p>

								<p className="txt-order-info">2025-08-22 00:00</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">생산계획일</p>

								<p className="txt-order-info">2025-08-22 00:00</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">검사계획일</p>

								<p className="txt-order-info">2025-08-22 00:00</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">생산부서</p>

								<p className="txt-order-info">제조2팀 (2)</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">등록자</p>

								<p className="txt-order-info">홍길동</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">등록일</p>

								<p className="txt-order-info">2025-07-01 00:00</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">납품자</p>

								<p className="txt-order-info">이몽룡</p>
							</Flex>

							<Flex align="center" className="order-info-area">
								<p className="title-order-info">납품일</p>

								<p className="txt-order-info">2025-07-01 00:00</p>
							</Flex>
						</div>
					</Flex>
				</div>
			),
		},
		{
			key: "2",
			label: "작업 표준서",
			children: (
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
			),
		},
	];

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
			code: "조립공정0001",
			level: "필수",
			name: "보빈 시리얼",
			data: "1232435436547657658675848712324354365476576586758487",
			input: (
				<div className="data-input-area">
					<Input placeholder="내용 입력" />
				</div>
			),
		},
		{
			code: "조립공정0002",
			level: "필수",
			name: "EtherCAT 통신검사(Product/RevEtherCAT 통신검사(Product/Rev",
			data: "-1 ~ +1",
			input: <div className="data-input-area not">해당없음</div>,
		},
		{
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
						<Button>부적합 관리</Button>
					</Flex>
				</Flex>
			</Flex>

			<div className="popup-contents pd0">
				<Splitter>
					<Splitter.Panel defaultSize="40%" collapsible>
						<Tabs
							defaultActiveKey="1"
							items={items}
							onChange={onChange}
							className="tab-round"
							type="card"
						/>
					</Splitter.Panel>
					<Splitter.Panel defaultSize="60%" collapsible>
						<Splitter lazy layout="vertical">
							<Splitter.Panel>
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
								<div className="input-tb-area scrollable">
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
							<Splitter.Panel min={90}>
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
									<div className="input-tb-area check scrollable">
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
											<DatePicker
												format="YYYY-MM-DD HH:mm:ss"
												showTime={{
													defaultValue: dayjs("00:00:00", "HH:mm:ss"),
												}}
												placeholder="날짜, 시간 자동 입력"
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
