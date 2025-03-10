// pages/cswrite.js
import React, { useState, useRef } from "react";
import {
	Anchor,
	Layout,
	Typography,
	Tabs,
	Button,
	Flex,
	Dropdown,
	Space,
	Tag,
	message,
	Form,
	Select,
	DatePicker,
	Input,
	Checkbox,
	InputNumber,
	Image,
	Upload,
	Radio,
	Tooltip,
} from "antd";
import {
	CloseOutlined,
	EditFilled,
	CheckOutlined,
	DownOutlined,
	SettingOutlined,
	RedoOutlined,
	PlusOutlined,
	DeleteOutlined,
	UploadOutlined,
	InfoCircleOutlined,
	FilterOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const range = (start, end) => {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
};

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

const handleChange = (pagination, filters, sorter = {}) => {
	console.log("Various parameters", pagination, filters, sorter);
	setSortedInfo(sorter.columnKey ? sorter : {});
};

const printItems = [
	{
		label: "프린트",
		key: "1",
	},
	{
		label: "엑셀 양식 다운로드",
		key: "2",
	},
];

const disabledDate = (current) => {
	// Can not select days before today and today
	return current && current < dayjs().endOf("day");
};
const disabledDateTime = () => ({
	disabledHours: () => range(0, 24).splice(4, 20),
	disabledMinutes: () => range(30, 60),
	disabledSeconds: () => [55, 56],
});
const disabledRangeTime = (_, type) => {
	if (type === "start") {
		return {
			disabledHours: () => range(0, 60).splice(4, 20),
			disabledMinutes: () => range(30, 60),
			disabledSeconds: () => [55, 56],
		};
	}
	return {
		disabledHours: () => range(0, 60).splice(20, 4),
		disabledMinutes: () => range(0, 31),
		disabledSeconds: () => [55, 56],
	};
};

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const CSWriteComponent = ({ contentHeight }) => {
	const [position, setPosition] = useState("end");
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === "1") {
			router.push("/publish/cs");
		} else if (key === "2") {
			router.push("/publish/cswrite");
		}
	};

	/* Anchor 스크롤 이동 */
	const handleAnchorClick = (e, link) => {
		e.preventDefault(); // 기본 이동 방지

		const targetId = link.href.split("#")[1]; // 타겟 ID 가져오기
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			// 기본정보(#basic)는 top 0으로 이동, 나머지는 -100px 조정
			const yOffset = -319;
			const y =
				targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

			console.log(`Scrolling to ${targetId}:`, y);

			setTimeout(() => {
				window.scrollTo({ top: y, behavior: "smooth" });
			}, 100);
		}
	};
	/* //Anchor 스크롤 이동 */

	/* 파일 업로드 */
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState([
		{
			uid: "-1",
			name: "image.png",
			status: "done",
			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		},
		{
			uid: "-2",
			name: "image.png",
			status: "done",
			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		},
		{
			uid: "-3",
			name: "image.png",
			status: "done",
			url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		},
	]);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};
	const handleFileChange = ({ file, fileList: newFileList }) => {
		if (file.status !== "removed") {
			setFileList([
				...fileList,
				...newFileList.filter(
					(f) => !fileList.some((item) => item.uid === f.uid)
				),
			]);
		} else {
			setFileList(newFileList); // 삭제된 경우 리스트 갱신
		}
	};

	const uploadButton = (
		<button
			style={{
				border: 0,
				background: "none",
				color: "#1677FF",
			}}
			type="button"
		>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				사진 첨부
			</div>
		</button>
	);

	const [fileDocList, setFileDocList] = useState([
		{
			uid: "-1",
			name: "xxx.png",
			status: "done",
			url: "http://www.baidu.com/xxx.png",
		},
		{
			uid: "-1",
			name: "xxx.png",
			status: "done",
			url: "http://www.baidu.com/xxx.png",
		},
	]);

	const fileInputRef = useRef(null); // 숨겨진 파일 입력 필드 참조

	const handleDocChange = (info) => {
		let newFileList = [...info.fileList];

		// 1. 최대 2개까지만 유지
		newFileList = newFileList.slice(-2);

		// 2. 서버 응답에서 URL 적용
		newFileList = newFileList.map((file) => {
			if (file.response) {
				file.url = file.response.url;
			}
			return file;
		});

		setFileDocList(newFileList);
	};

	const handleManualUpload = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			const newFile = {
				uid: `${Date.now()}`, // 고유 ID 생성
				name: files[0].name,
				status: "done",
				url: URL.createObjectURL(files[0]), // 로컬 미리보기 URL 생성
			};

			setFileDocList([...fileDocList, newFile]); // 기존 파일 리스트에 추가
		}
	};

	const uploadProps = {
		action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
		onChange: handleDocChange,
		multiple: true,
		fileList: fileDocList,
		showUploadList: true, // ✅ 업로드된 파일 리스트 유지
		beforeUpload: () => false, // ✅ 자동 업로드 방지 (직접 추가)
	};
	/* //파일 업로드 */

	return (
		<Layout>
			<div className="contents-top">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						C/S 관리
					</Title>

					<Button
						icon={<FilterOutlined />}
						iconPosition={position}
						color="primary"
						variant="outlined"
						size="large"
					>
						C/S 불러오기
					</Button>
				</Flex>

				<Tabs defaultActiveKey="2" items={TabItems} onChange={onTabChange} />

				<div className="top-btn-area">
					{/* 신규 수주 등록시 */}
					<Flex align="center" justify="space-between">
						<Flex align="center">
							<Tag className="tag-new">신규</Tag>

							<p className="cs-num">
								C/S No. <span>--------</span>
							</p>
						</Flex>

						<Flex align="center" gap={8}>
							<Flex className="btn-space-area">
								<Button type="text" className="btn-all-reset">
									전체 초기화
								</Button>
							</Flex>

							<Flex gap={8}>
								<Button icon={<CloseOutlined />} iconPosition={position}>
									취소
								</Button>
								<Button
									type="primary"
									icon={<EditFilled />}
									iconPosition={position}
								>
									등록
								</Button>
							</Flex>
						</Flex>
					</Flex>
					{/* //신규 수주 등록시 */}

					{/* 수주 수정시 */}
					<Flex
						align="center"
						justify="space-between"
						className="detail-top-area"
					>
						<Flex align="center">
							<Tag className="tag-end">종결</Tag>
							<Tag className="tag-ing">진행</Tag>
							<Tag className="tag-receipt">접수</Tag>
							<Tag className="tag-cancel">취소</Tag>

							<p className="cs-num">
								C/S No. <span className="num">2024-001</span>
							</p>
						</Flex>

						<Flex align="center" gap={8} className="detail-btn-area">
							<Flex gap={8} className="btn-space-area">
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

								<Button>C/S이력</Button>
							</Flex>

							<Flex gap={8} className="btn-space-area">
								<Button>신규</Button>
								<Button>복제</Button>
								<Button>삭제</Button>
							</Flex>

							<Flex gap={8} className="btn-space-area">
								<Button>URL</Button>

								<Dropdown menu={{ items: printItems }}>
									<Button>
										<Space>
											출력
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>

							<Flex gap={8}>
								<Button icon={<CloseOutlined />} iconPosition={position}>
									취소
								</Button>
								<Button
									type="primary"
									icon={<CheckOutlined />}
									iconPosition={position}
								>
									저장
								</Button>
							</Flex>
						</Flex>
					</Flex>
					{/* //수주 수정시 */}
				</div>
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div style={{ paddingTop: contentHeight }}>
						{/* 접수 내용 */}
						<div id="cs1">
							<div className="info-area">
								<Flex
									align="center"
									justify="space-between"
									className="info-title-area"
								>
									<Title level={3} className="title-bullet">
										접수 내용
									</Title>

									<Flex gap={10}>
										<Button
											icon={<RedoOutlined />}
											size="small"
											className="ico-rotate"
										/>

										<Button icon={<SettingOutlined />} size="small" />
									</Flex>
								</Flex>

								<Flex gap={16} className="info-input-col2">
									<div className="info-input-box">
										<Flex justify="space-between">
											<Title level={4} className="title-bullet">
												기본 정보
											</Title>

											<Button type="text" className="btn-all-reset">
												초기화
											</Button>
										</Flex>

										<Form layout="vertical" className="info-input-area">
											<Flex gap={4}>
												<Form.Item label="접수 담당자" name="manageName">
													<Input placeholder="-" />
												</Form.Item>

												<Form.Item
													label={<Link href={"#"}>접수일</Link>}
													name="receiptDate"
												>
													<DatePicker
														onChange={onChange}
														placeholder="날짜 선택"
													/>
												</Form.Item>

												<Form.Item
													label={<Link href={"#"}>방문 요청일시</Link>}
													name="visitDate"
												>
													<DatePicker
														onChange={onChange}
														placeholder="날짜, 시간 선택"
														disabledDate={disabledDate}
														disabledTime={disabledDateTime}
														showTime={{
															defaultValue: dayjs("00:00:00", "HH:mm:ss"),
														}}
													/>
												</Form.Item>
											</Flex>

											<Flex gap={4}>
												<Form.Item label="고객사">
													<Select
														defaultValue="clientSelect1"
														onChange={handleChange}
														showSearch
														filterOption={(input, option) =>
															(option?.label ?? "")
																.toLowerCase()
																.includes(input.toLowerCase())
														}
														options={[
															{
																value: "clientSelect1",
																label: "-",
															},
														]}
													/>
												</Form.Item>

												<Form.Item label="장비사">
													<Select
														defaultValue="mechanic1"
														onChange={handleChange}
														showSearch
														filterOption={(input, option) =>
															(option?.label ?? "")
																.toLowerCase()
																.includes(input.toLowerCase())
														}
														options={[
															{
																value: "mechanic1",
																label: "-",
															},
														]}
													/>
												</Form.Item>

												<Form.Item label="협력사" name="cooper1">
													<Input placeholder="-" />
												</Form.Item>
											</Flex>

											<Flex gap={4}>
												<Form.Item label="설비명">
													<Select
														defaultValue="fac1"
														onChange={handleChange}
														showSearch
														filterOption={(input, option) =>
															(option?.label ?? "")
																.toLowerCase()
																.includes(input.toLowerCase())
														}
														options={[
															{
																value: "fac1",
																label: "-",
															},
														]}
													/>
												</Form.Item>

												<Form.Item label="설비 ID" name="facID1">
													<Input placeholder="-" />
												</Form.Item>

												<Form.Item label="Chamber" name="chamber1">
													<Input placeholder="-" />
												</Form.Item>
											</Flex>

											<Flex gap={4}>
												<Form.Item label="라인정보">
													<Select
														defaultValue="lineInfo1"
														onChange={handleChange}
														showSearch
														filterOption={(input, option) =>
															(option?.label ?? "")
																.toLowerCase()
																.includes(input.toLowerCase())
														}
														options={[
															{
																value: "lineInfo1",
																label: "-",
															},
														]}
													/>
												</Form.Item>

												<Form.Item label="설비위치" name="facPosition1">
													<Input placeholder="-" />
												</Form.Item>
											</Flex>

											<Flex gap={4}>
												<Form.Item label="접수내용" name="receiptContents1">
													<Input.TextArea
														style={{
															height: "90px",
														}}
													/>
												</Form.Item>
											</Flex>

											<Flex gap={4}>
												<Form.Item label="공정">
													<Select
														defaultValue="process1"
														onChange={handleChange}
														showSearch
														filterOption={(input, option) =>
															(option?.label ?? "")
																.toLowerCase()
																.includes(input.toLowerCase())
														}
														options={[
															{
																value: "process1",
																label: "-",
															},
														]}
													/>
												</Form.Item>

												<Form.Item label="세부공정">
													<Select
														defaultValue="detailProcess1"
														onChange={handleChange}
														showSearch
														filterOption={(input, option) =>
															(option?.label ?? "")
																.toLowerCase()
																.includes(input.toLowerCase())
														}
														options={[
															{
																value: "detailProcess1",
																label: "-",
															},
														]}
													/>
												</Form.Item>
											</Flex>

											<Form.Item label="제품구분">
												<Flex
													gap={4}
													align="center"
													style={{
														flexWrap: "wrap",
													}}
												>
													<Checkbox
														value="mfc"
														style={{
															lineHeight: "22px",
														}}
													>
														MFC
													</Checkbox>

													<Checkbox
														value="rfc"
														style={{
															lineHeight: "22px",
														}}
													>
														RFC
													</Checkbox>

													<Checkbox
														value="epc"
														style={{
															lineHeight: "22px",
														}}
													>
														EPC
													</Checkbox>

													<Checkbox
														value="lmfc"
														style={{
															lineHeight: "22px",
														}}
													>
														LMFC
													</Checkbox>

													<Checkbox
														value="mfm"
														style={{
															lineHeight: "22px",
														}}
													>
														MFM
													</Checkbox>

													<Flex align="center" className="etc-area">
														<Checkbox
															value="etc"
															style={{
																lineHeight: "22px",
															}}
														>
															기타
														</Checkbox>

														<Input
															placeholder="-"
															style={{
																flex: "1",
															}}
														/>
													</Flex>
												</Flex>
											</Form.Item>
										</Form>
									</div>

									<div className="row-2">
										<div className="info-input-box">
											<Flex justify="space-between">
												<Title level={4} className="title-bullet">
													요청자 정보
												</Title>

												<Button type="text" className="btn-all-reset">
													초기화
												</Button>
											</Flex>

											<Form layout="vertical" className="info-input-area">
												<Flex gap={4}>
													<Form.Item label="회사명" name="companyName">
														<Input placeholder="-" />
													</Form.Item>

													<Form.Item label="이름" name="name">
														<Input placeholder="-" />
													</Form.Item>
												</Flex>

												<Flex gap={4}>
													<Form.Item label="연락처" name="phonenum">
														<Input placeholder="-" />
													</Form.Item>

													<Form.Item label="이메일" name="email">
														<Input placeholder="-" />
													</Form.Item>
												</Flex>
											</Form>
										</div>

										<div className="info-input-box">
											<Flex justify="space-between">
												<Flex gap={12} align="center">
													<Title level={4} className="title-bullet">
														내방 정보
													</Title>

													<Checkbox
														value="same"
														style={{
															marginBottom: "0.7em",
															lineHeight: "22px",
														}}
													>
														요청자 정보와 동일
													</Checkbox>
												</Flex>

												<Button type="text" className="btn-all-reset">
													초기화
												</Button>
											</Flex>

											<Form layout="vertical" className="info-input-area">
												<Flex gap={4}>
													<Form.Item label="회사명" name="companyName2">
														<Input placeholder="-" />
													</Form.Item>

													<Form.Item label="현업 담당자" name="name2">
														<Input placeholder="-" />
													</Form.Item>
												</Flex>

												<Flex gap={4}>
													<Form.Item label="연락처" name="phonenum2">
														<Input placeholder="-" />
													</Form.Item>

													<Form.Item label="내선번호" name="phonenum3">
														<Input placeholder="-" />
													</Form.Item>
												</Flex>

												<Flex>
													<Form.Item label="이메일" name="email2">
														<Input placeholder="-" />
													</Form.Item>
												</Flex>

												<Flex>
													<Form.Item label="C/S 메모" name="csMemo">
														<Input placeholder="-" />
													</Form.Item>
												</Flex>
											</Form>
										</div>
									</div>
								</Flex>
							</div>
						</div>
						{/* //접수 내용 */}

						{/* 제품 내역 */}
						<div id="cs2" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Flex align="center" gap={8}>
									<Title level={3} className="title-bullet">
										제품 내역
									</Title>

									<Flex align="center" gap={4} className="tit-side-area">
										<InputNumber
											min={1}
											max={10}
											defaultValue={3}
											onChange={onChange}
										/>

										<Button
											type="primary"
											icon={<PlusOutlined />}
											iconPosition={position}
										>
											제품 추가
										</Button>

										<Button icon={<DeleteOutlined />} iconPosition={position}>
											삭제
										</Button>

										<p className="total-num">
											총 <strong>2</strong> 개
										</p>
									</Flex>
								</Flex>

								<Flex gap={10}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="ico-rotate"
									/>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>
							</Flex>

							<div className="info-input-box">
								<Flex align="center" justify="space-between">
									<Flex align="center" gap={12} className="title-area">
										<Title
											level={4}
											className="title-bullet"
											style={{
												marginBottom: "0",
											}}
										>
											제품 1
										</Title>

										<Checkbox value="product1" />

										<Flex gap={4} className="tit-side-area">
											<Button color="primary" variant="outlined" size="small">
												수주 종합정보
											</Button>

											<Button icon={<DeleteOutlined />} size="small" />
										</Flex>
									</Flex>

									<Button type="text" className="btn-all-reset">
										초기화
									</Button>
								</Flex>

								<Form
									layout="vertical"
									className="info-input-area col-5 product-cs-area"
								>
									<Flex gap={4}>
										<Form.Item label="(1) 불량제품 S/N" name="poorSN">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="(2) 대체제품 S/N" name="replaceSN">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="제품군" name="productRange">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="세부모델" name="detailModel">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="사용가스" name="useGas">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="유량" name="flowRate">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="통신코드" name="code">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="생산부서" name="productTeam">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="불량구분">
											<Select
												defaultValue="poorSelect1"
												onChange={handleChange}
												showSearch
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												options={[
													{
														value: "poorSelect1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="현상분류">
											<Select
												defaultValue="symptomSelect1"
												onChange={handleChange}
												showSearch
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												options={[
													{
														value: "symptomSelect1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Flex>

									<Flex gap={4}>
										<Form.Item label="(1) 현재상태 F/T" name="nowFT">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="(2) 현재상태 F/T" name="nowFT2">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="조치구분">
											<Select
												defaultValue="actionSelect1"
												onChange={handleChange}
												showSearch
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												options={[
													{
														value: "actionSelect1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="심각도" className="select-input-area">
											<Select
												defaultValue="severitySelect1"
												onChange={handleChange}
												showSearch
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												options={[
													{
														value: "severitySelect1",
														label: "-",
													},
												]}
											/>

											<Input placeholder="-" />
										</Form.Item>

										<Form.Item
											label={<Link href={"#"}>불량제품 반출일</Link>}
											name="poorDate"
										>
											<DatePicker onChange={onChange} placeholder="날짜 선택" />
										</Form.Item>

										<Form.Item
											label={<Link href={"#"}>조치 완료일</Link>}
											name="actionDate"
										>
											<DatePicker onChange={onChange} placeholder="날짜 선택" />
										</Form.Item>

										<Form.Item
											label={<Link href={"#"}>제품 인증일</Link>}
											name="productDate"
										>
											<DatePicker onChange={onChange} placeholder="날짜 선택" />
										</Form.Item>

										<Form.Item
											label={<Link href={"#"}>납품일</Link>}
											name="deliveryDate"
										>
											<DatePicker onChange={onChange} placeholder="날짜 선택" />
										</Form.Item>

										<Form.Item label="사용기간(인증일 기준)" name="usePeriod">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="사용기간(납품일 기준)" name="usePeriod2">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>
							</div>
						</div>
						{/* //제품 내역 */}

						{/* 출장업무 내역 */}
						<div id="cs3" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Flex align="center" gap={8}>
									<Title level={3} className="title-bullet">
										출장업무 내용
									</Title>

									<Flex align="center" gap={4} className="tit-side-area">
										<Form.Item
											label="조치 담당자(정)"
											name="username"
											className="charge-input"
										>
											<Input
												placeholder="-"
												style={{
													width: "110px",
												}}
											/>
										</Form.Item>

										<Button
											type="primary"
											icon={<PlusOutlined />}
											iconPosition={position}
										>
											출장업무 내용 추가
										</Button>

										<Button icon={<DeleteOutlined />} iconPosition={position}>
											삭제
										</Button>
									</Flex>
								</Flex>

								<Flex gap={10}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="ico-rotate"
									/>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>
							</Flex>

							<div className="info-input-box">
								<Title level={4} className="title-bullet">
									현상 내용
								</Title>

								<Form layout="vertical" className="info-input-area">
									<Flex gap={4}>
										<Form.Item
											label="접수 시 현상 및 내용(상세)"
											name="symptomText1"
										>
											<Input.TextArea
												style={{
													height: "90px",
												}}
											/>
										</Form.Item>

										<Form.Item
											label="현장 방문 후 확인 현상"
											name="symptomText2"
										>
											<Input.TextArea
												style={{
													height: "90px",
												}}
											/>
										</Form.Item>
									</Flex>
								</Form>
							</div>

							<div className="info-input-box">
								<Flex
									align="center"
									justify="space-between"
									className="title-area"
								>
									<Flex align="center" gap={12}>
										<Title
											level={4}
											className="title-bullet"
											style={{
												marginBottom: "0",
											}}
										>
											출장업무 내용 1
										</Title>

										<Checkbox value="product1" />

										<Flex gap={4} className="tit-side-area">
											<Form.Item
												label="조치 담당자(부)"
												name="username"
												className="charge-input"
											>
												<Input
													placeholder="-"
													style={{
														width: "110px",
													}}
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"#"}>대응일</Link>}
												name="respondDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
													style={{
														width: "160px",
														height: "32px",
													}}
												/>
											</Form.Item>

											<Button icon={<DeleteOutlined />} iconPosition={position}>
												삭제
											</Button>
										</Flex>
									</Flex>

									<Button type="text" className="btn-all-reset">
										초기화
									</Button>
								</Flex>

								<Form layout="vertical" className="info-input-area">
									<Flex gap={4}>
										<Form.Item label="조치내용 (상세)" name="actionText1">
											<Input.TextArea
												style={{
													height: "90px",
												}}
											/>
										</Form.Item>

										<Form.Item label="조치결과" name="actionText2">
											<Input.TextArea
												style={{
													height: "90px",
												}}
											/>
										</Form.Item>
									</Flex>
								</Form>

								<div className="file-upload-area">
									<Flex
										align="center"
										gap={12}
										style={{
											marginBottom: "16px",
										}}
									>
										<p className="title-file-upload">파일 및 사진 첨부</p>

										<Button
											icon={<UploadOutlined />}
											type="primary"
											iconPosition={position}
											onClick={() => fileInputRef.current?.click()} // ✅ 파일 선택창 열기
										>
											파일 업로드
										</Button>
									</Flex>

									<Upload
										action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
										listType="picture-card"
										fileList={fileList}
										onPreview={handlePreview}
										onChange={handleFileChange}
										showUploadList={{ showRemoveIcon: true }} // 삭제 아이콘만 표시
										beforeUpload={() => false} // 파일을 바로 업로드하지 않고 리스트에 추가만
									>
										{fileList.length >= 8 ? null : uploadButton}
									</Upload>

									{previewImage && (
										<Image
											wrapperStyle={{ display: "none" }}
											preview={{
												visible: previewOpen,
												onVisibleChange: (visible) => setPreviewOpen(visible),
												afterOpenChange: (visible) =>
													!visible && setPreviewImage(""),
											}}
											src={previewImage}
										/>
									)}

									<Upload {...uploadProps} />
									{/* 숨겨진 파일 입력 필드 */}
									<input
										type="file"
										ref={fileInputRef}
										style={{ display: "none" }}
										onChange={handleManualUpload} // 파일이 선택되면 리스트에 추가
									/>
								</div>
							</div>
						</div>
						{/* //출장업무 내역 */}

						{/* 출장 내역 */}
						<div id="cs4" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Flex align="center" gap={8}>
									<Title level={3} className="title-bullet">
										출장 내역
									</Title>

									<Flex align="center" gap={4} className="tit-side-area">
										<Radio.Group>
											<Radio value="common">공통</Radio>
											<Radio value="product">제품별</Radio>
										</Radio.Group>
									</Flex>
								</Flex>

								<Flex gap={10}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="ico-rotate"
									/>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>
							</Flex>

							<div className="info-input-box">
								<Flex
									align="center"
									gap={12}
									justify="space-between"
									className="title-area"
								>
									<Flex align="center" gap={4}>
										<Title
											level={4}
											className="title-bullet"
											style={{
												marginBottom: "0",
											}}
										>
											공통
										</Title>

										<Tooltip title="CS 넘버 내에 속한 모든 제품에 동일한 내용이 적용됩니다.">
											<InfoCircleOutlined />
										</Tooltip>

										<p className="total-num">
											총 <strong>0</strong>개 제품에 동일하게 적용
										</p>
									</Flex>

									<Button type="text" className="btn-all-reset">
										초기화
									</Button>
								</Flex>

								<Form layout="vertical" className="info-input-area flex-w-none">
									<Flex gap={4}>
										<Form.Item
											label="불량제품 S/N"
											name="poorSN1"
											style={{
												width: "180px",
											}}
										>
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="Warranty" name="inout1">
											<Radio.Group>
												<Radio value="in">IN</Radio>
												<Radio value="out">OUT</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="조치내용 (요약)" name="actionContents1">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>

								<Form layout="vertical" className="info-input-area">
									<Flex gap={4}>
										<Form.Item label="대응기간(Day)" name="day">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="공정 Step/Recipe" name="step">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="Flow Sequence" name="flow">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="사용압력" name="usePress">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="고객사 Spec" name="customerSpec">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="제조 Spec" name="productSpec">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>
							</div>

							<div className="info-input-box">
								<Flex
									align="center"
									gap={12}
									justify="space-between"
									className="title-area"
								>
									<Title
										level={4}
										className="title-bullet"
										style={{
											marginBottom: "0",
										}}
									>
										제품 1
									</Title>

									<Button type="text" className="btn-all-reset">
										초기화
									</Button>
								</Flex>

								<Form layout="vertical" className="info-input-area flex-w-none">
									<Flex gap={4}>
										<Form.Item
											label="불량제품 S/N"
											name="poorSN2"
											style={{
												width: "180px",
											}}
										>
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="Warranty" name="inout2">
											<Radio.Group>
												<Radio value="in">IN</Radio>
												<Radio value="out">OUT</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="조치내용 (요약)" name="actionContents2">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>

								<Form layout="vertical" className="info-input-area">
									<Flex gap={4}>
										<Form.Item label="대응기간(Day)" name="day2">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="공정 Step/Recipe" name="step2">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="Flow Sequence" name="flow2">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="사용압력" name="usePress2">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="고객사 Spec" name="customerSpec2">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="제조 Spec" name="productSpec2">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>
							</div>
						</div>
						{/* //출장 내역 */}

						{/* 후속 조치 */}
						<div id="cs5" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Flex align="center" gap={8}>
									<Title level={3} className="title-bullet">
										후속 조치
									</Title>

									<Flex align="center" gap={4} className="tit-side-area">
										<Radio.Group>
											<Radio value="common2">공통</Radio>
											<Radio value="product2">제품별</Radio>
										</Radio.Group>
									</Flex>
								</Flex>

								<Flex gap={10}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="ico-rotate"
									/>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>
							</Flex>

							<div className="info-input-box">
								<Flex
									align="center"
									gap={12}
									justify="space-between"
									className="title-area"
								>
									<Flex align="center" gap={4}>
										<Title
											level={4}
											className="title-bullet"
											style={{
												marginBottom: "0",
											}}
										>
											공통
										</Title>

										<Tooltip title="CS 넘버 내에 속한 모든 제품에 동일한 내용이 적용됩니다.">
											<InfoCircleOutlined />
										</Tooltip>

										<p className="total-num">
											총 <strong>0</strong>개 제품에 동일하게 적용
										</p>
									</Flex>

									<Button type="text" className="btn-all-reset">
										초기화
									</Button>
								</Flex>

								<Form layout="vertical" className="info-input-area flex-w-none">
									<Flex gap={4}>
										<Form.Item label="원인분석 요청" name="ox1">
											<Radio.Group>
												<Radio value="o1">O</Radio>
												<Radio value="x1">X</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="긴급" name="ox2">
											<Radio.Group>
												<Radio value="o2">O</Radio>
												<Radio value="x2">X</Radio>
											</Radio.Group>
										</Form.Item>

										<Flex gap={4} align="center" className="action-info">
											<Form.Item
												label={<Link href={"#"}>분석 요청일</Link>}
												name="analyzeDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"#"}>분석 납기일</Link>}
												name="analyzeDate2"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"#"}>분석 완료일</Link>}
												name="analyzeDate3"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label="TAT"
												name="tat"
												tooltip={
													<span>
														경과일 자동 계산 <br />
														(분석 완료일 - 분석 요청일)
													</span>
												}
											>
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item label="기타" name="etc2">
												<Input placeholder="-" />
											</Form.Item>
										</Flex>
									</Flex>
								</Form>
							</div>

							<div className="info-input-box">
								<Flex
									align="center"
									gap={12}
									justify="space-between"
									className="title-area"
								>
									<Flex align="center" gap={4}>
										<Title
											level={4}
											className="title-bullet"
											style={{
												marginBottom: "0",
											}}
										>
											제품 1
										</Title>

										<Tooltip title="CS 넘버 내에 속한 모든 제품에 동일한 내용이 적용됩니다.">
											<InfoCircleOutlined />
										</Tooltip>

										<p className="total-num">
											총 <strong>0</strong>개 제품에 동일하게 적용
										</p>
									</Flex>

									<Button type="text" className="btn-all-reset">
										초기화
									</Button>
								</Flex>

								<Form layout="vertical" className="info-input-area flex-w-none">
									<Flex gap={4}>
										<Form.Item label="원인분석 요청" name="ox3">
											<Radio.Group>
												<Radio value="o3">O</Radio>
												<Radio value="x3">X</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="긴급" name="ox4">
											<Radio.Group>
												<Radio value="o4">O</Radio>
												<Radio value="x4">X</Radio>
											</Radio.Group>
										</Form.Item>

										<Flex gap={4} align="center" className="action-info">
											<Form.Item
												label={<Link href={"#"}>분석 요청일</Link>}
												name="analyzeDate4"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"#"}>분석 납기일</Link>}
												name="analyzeDate5"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"#"}>분석 완료일</Link>}
												name="analyzeDate6"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label="TAT"
												name="tat2"
												tooltip={
													<span>
														경과일 자동 계산 <br />
														(분석 완료일 - 분석 요청일)
													</span>
												}
											>
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item label="기타" name="etc3">
												<Input placeholder="-" />
											</Form.Item>
										</Flex>
									</Flex>
								</Form>
							</div>
						</div>
						{/* //후속 조치 */}
					</div>
				</div>
				<div className="anchor-area" style={{ top: contentHeight }}>
					<Anchor
						affix={false}
						onClick={handleAnchorClick}
						items={[
							{
								key: "cs1",
								href: "#cs1",
								title: "접수 내용",
							},
							{
								key: "cs2",
								href: "#cs2",
								title: "제품 내역",
							},
							{
								key: "cs3",
								href: "#cs3",
								title: "출장업무 내용",
							},
							{
								key: "cs4",
								href: "#cs4",
								title: "출장 내역",
							},
							{
								key: "cs5",
								href: "#cs5",
								title: "후속 조치",
							},
						]}
					/>
				</div>
			</Flex>
		</Layout>
	);
};

export default CSWriteComponent;
