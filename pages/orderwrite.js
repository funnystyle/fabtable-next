// pages/orderwrite.js
import React, { useState, useEffect } from "react";
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
	Empty,
	DatePicker,
	Input,
	Radio,
	Affix,
} from "antd";
import {
	CloseOutlined,
	EditFilled,
	CheckOutlined,
	DownOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";

const { Title } = Typography;

const onChange = (e) => {
	console.log(`checked = `);
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

const handleChange = (pagination, filters, sorter = {}) => {
	console.log("Various parameters", pagination, filters, sorter);
	setSortedInfo(sorter.columnKey ? sorter : {});
};

const OrderWriteComponent = ({ contentHeight }) => {
	const [position, setPosition] = useState("end");
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === "1") {
			router.push("/order");
		} else if (key === "2") {
			router.push("/orderwrite");
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

	return (
		<Layout>
			<div className="contents-top">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						영업 관리
					</Title>
				</Flex>

				<Tabs defaultActiveKey="2" items={TabItems} onChange={onTabChange} />

				<div className="top-btn-area">
					{/* 신규 수주 등록시 */}
					<Flex align="center" justify="space-between">
						<Tag className="CurrentStatus001">발주기입</Tag>

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

					{/* 기 등록된 수주 내용 수정시 */}
					<Flex justify="space-between" className="detail-top-area">
						<Flex gap={12}>
							<Tag className="CurrentStatus007">Rework</Tag>

							<ul className="product-info">
								<li>MARU 7001</li>
								<li>5702402113343</li>
							</ul>
						</Flex>

						<Flex align="center" gap={8} className="detail-btn-area">
							<Flex gap={8} className="btn-space-area">
								<Button>수주 종합정보</Button>

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

							<Flex gap={8} className="btn-space-area">
								<Button>복제</Button>
								<Button>신규</Button>
								<Button>삭제</Button>

								<Dropdown menu={{ items: printItems }}>
									<Button>
										<Space>
											인쇄
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
					{/* //기 등록된 수주 내용 수정시 */}
				</div>
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div
						style={{ paddingTop: contentHeight }}
						className="contents-scroll"
					>
						<div id="basic">
							<div className="info-area">
								<Flex
									align="center"
									justify="space-between"
									className="info-title-area"
								>
									<Title level={3} className="title-bullet">
										기본정보
									</Title>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div className="info-input-box">
									<Form layout="vertical" className="info-input-area">
										<Flex gap={16}>
											<Form.Item label="제조번호" name="makeNum">
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item label="시리얼번호" name="serialNum">
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>납품계획일</Link>}
												name="deliveryDate"
												tooltip={
													<>
														납품계획일(D0) 기준, <br />
														생산계획일 D5,
														<br />
														검사계획일 D3
													</>
												}
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>생산계획일</Link>}
												name="productDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>검사계획일</Link>}
												name="testDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>
										</Flex>

										<Flex gap={16}>
											<Form.Item label="생산부서">
												<Select
													defaultValue="productTeam1"
													onChange={handleChange}
													options={[
														{
															value: "productTeam1",
															label: "-",
														},
													]}
												/>
											</Form.Item>

											<Form.Item label={<Link href={"/"}>등록자</Link>}>
												<Select
													defaultValue="productWriter1"
													onChange={handleChange}
													options={[
														{
															value: "productWriter1",
															label: "-",
														},
													]}
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>등록일</Link>}
												name="registDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item label={<Link href={"/"}>납품자</Link>}>
												<Select
													defaultValue="vendor1"
													onChange={handleChange}
													options={[
														{
															value: "vendor1",
															label: "-",
														},
													]}
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>납품일</Link>}
												name="vendorDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>
										</Flex>

										<Flex gap={16}>
											<Form.Item label="비고" name="etc">
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item label="영업팀 메모" name="memo">
												<Input placeholder="-" />
											</Form.Item>
										</Flex>
									</Form>
								</div>
							</div>
						</div>
						<div id="customer" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Title level={3} className="title-bullet">
									고객정보
								</Title>

								<Button icon={<SettingOutlined />} size="small" />
							</Flex>

							<div className="info-input-box">
								<Form layout="vertical" className="info-input-area">
									<Flex gap={16}>
										<Form.Item label="납품처">
											<Select
												showSearch
												placeholder="납품처"
												onChange={handleChange}
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												notFoundContent={
													<Empty
														image={Empty.PRESENTED_IMAGE_SIMPLE}
														description="내용이 없습니다."
													/>
												}
												options={[
													{
														value: "vendorName1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="고객사">
											<Select
												showSearch
												placeholder="고객사"
												onChange={handleChange}
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												notFoundContent={
													<Empty
														image={Empty.PRESENTED_IMAGE_SIMPLE}
														description="내용이 없습니다."
													/>
												}
												options={[
													{
														value: "customerName1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="출고종류">
											<Select
												defaultValue="deliveryCategory1"
												onChange={handleChange}
												options={[
													{
														value: "deliveryCategory1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="P/O" name="poNum">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="프로젝트 번호" name="projectNum">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>
							</div>
						</div>
						<div id="product" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Title level={3} className="title-bullet">
									제품정보
								</Title>

								<Button icon={<SettingOutlined />} size="small" />
							</Flex>

							<Flex gap={20} className="info-input-wrap">
								<div className="info-input-box">
									<Title level={5}>제품군 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="제품군">
											<Select
												defaultValue="productCate1"
												onChange={handleChange}
												options={[
													{
														value: "productCate1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="모델">
											<Select
												defaultValue="model1"
												onChange={handleChange}
												options={[
													{
														value: "model1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="세부모델">
											<Select
												defaultValue="detailModel1"
												onChange={handleChange}
												options={[
													{
														value: "detailModel1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MGMR">
											<Radio.Group>
												<Radio value="n">N</Radio>
												<Radio value="y">Y</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="채널">
											<Select
												defaultValue="channel1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "channel1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Unit 구분">
											<Select
												defaultValue="unit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "unit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MFC 사양">
											<Select
												defaultValue="mfc1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "mfc1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="장착위치">
											<Select
												defaultValue="position1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "position1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Body 타입">
											<Select
												defaultValue="body1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "body1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="유량범위">
											<Select
												defaultValue="discharge1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "discharge1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>

								<div className="info-input-box">
									<Title level={5}>통신 및 타입 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="통신방식">
											<Select
												defaultValue="traffic1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "traffic1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="통신코드">
											<Select
												defaultValue="trafficCode1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "trafficCode1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="IO Size">
											<Select
												defaultValue="iosize1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "iosize1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MAX DATA">
											<Select
												defaultValue="maxData1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "maxData1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="밸브타입">
											<Select
												defaultValue="valve1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "valve1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Orifice 씰링">
											<Select
												defaultValue="orifice1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "orifice1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Valve Seat">
											<Select
												defaultValue="valveSeat1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "valveSeat1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="후단 사용조건">
											<Select
												defaultValue="use1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "use1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>

								<div className="info-input-box">
									<Title level={5}>가스 및 유량 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="하스텔로이">
											<Radio.Group>
												<Radio value="n2">N</Radio>
												<Radio value="y2">Y</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="사용가스">
											<Select
												defaultValue="useGas1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "useGas1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="교정가스">
											<Select
												defaultValue="correctGas1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "correctGas1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Liquid & Precursor">
											<Select
												defaultValue="liquid1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "liquid1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Cal Liquid">
											<Select
												defaultValue="cal1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "cal1",
														label: "-",
													},
												]}
											/>

											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="환산유량">
											<Select
												defaultValue="conversion1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "conversion1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="유량단위">
											<Select
												defaultValue="unit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "unit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MGMR Bin#">
											<Select
												defaultValue="mgmrBin1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "mgmrBin1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MGMR 최대유량">
											<Select
												defaultValue="mgmrMax1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "mgmrMax1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>

								<div className="info-input-box">
									<Title level={5}>압력 및 기타 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="사용압력 단위">
											<Select
												defaultValue="usePressure1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "usePressure1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="최소 압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="중심 압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="최대 압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="제어압력 단위">
											<Select
												defaultValue="pressureUnit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "pressureUnit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="제어압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="피팅종류">
											<Select
												defaultValue="fit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "fit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="사이즈/씰">
											<Select
												defaultValue="size1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "size1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="전원포트 형상">
											<Select
												defaultValue="power1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "power1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="포트위치">
											<Select
												defaultValue="portPosition1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "portPosition1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="제품 Rev">
											<Select
												defaultValue="rev1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "rev1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="특주번호">
											<Select
												defaultValue="specialNum1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "specialNum1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>
							</Flex>
						</div>
					</div>
				</div>
				<div className="anchor-area" style={{ top: contentHeight }}>
					<Anchor
						affix={false}
						onClick={handleAnchorClick}
						items={[
							{
								key: "basic",
								href: "#basic",
								title: "기본정보",
							},
							{
								key: "customer",
								href: "#customer",
								title: "고객정보",
							},
							{
								key: "product",
								href: "#product",
								title: "제품정보",
							},
						]}
					/>
				</div>
			</Flex>
		</Layout>
	);
};

export default OrderWriteComponent;
