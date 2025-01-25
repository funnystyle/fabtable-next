// pages/index.js
import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	GoldFilled,
	CalendarFilled,
	EditFilled,
	AudioFilled,
	ToolFilled,
	TrademarkCircleFilled,
	AreaChartOutlined,
	FontColorsOutlined,
	DatabaseOutlined,
	FolderOpenFilled,
	IdcardFilled,
	UserAddOutlined,
	TeamOutlined,
	QuestionCircleFilled,
	ClockCircleOutlined,
	BellOutlined,
	AppstoreOutlined,
	UserOutlined,
} from "@ant-design/icons";

import Link from "next/link";

const { Header, Sider, Content } = Layout;

const basicItems = [
	{
		key: "1",
		label: <Link href={"/"}>대시보드</Link>,
		icon: <GoldFilled />,
	},
	{
		key: "sub1",
		label: "일정 관리",
		icon: <CalendarFilled />,
		children: [
			{
				key: "sub1-1",
				label: <Link href={"/ScheduleYear"}>연간 종합 일정</Link>,
			},
			{
				key: "sub1-2",
				label: "월간 종합 일정",
			},
		],
	},
	{
		key: "2",
		label: "영업 관리",
		icon: <EditFilled />,
	},
	{
		key: "3",
		label: "CS 관리",
		icon: <AudioFilled />,
	},
	{
		key: "4",
		label: "생산 관리",
		icon: <ToolFilled />,
	},
	{
		key: "5",
		label: "품질 관리",
		icon: <TrademarkCircleFilled />,
	},
	{
		key: "sub2",
		label: "통계 관리",
		icon: <AreaChartOutlined />,
		children: [
			{
				key: "sub2-1",
				label: "불량률 현황",
			},
			{
				key: "sub2-2",
				label: "사이클 타임",
			},
			{
				key: "sub3",
				label: "SPC 현황",
			},
		],
	},
];

const adminItems = [
	{
		key: "1",
		label: "기초 코드 관리",
		icon: <FontColorsOutlined />,
	},
	{
		key: "sub1",
		label: "기준 정보 관리",
		icon: <DatabaseOutlined />,
		children: [
			{
				key: "sub1-1",
				label: "제품 관리",
			},
			{
				key: "sub1-2",
				label: "부서별 현황 관리",
			},
			{
				key: "sub1-3",
				label: "부서별 상세 화면 관리",
			},
			{
				key: "sub1-4",
				label: "부적합 관리",
				children: [
					{
						key: "sub1-4-1",
						label: "부적합 종류 관리",
					},
					{
						key: "sub1-4-3",
						label: "등록 및 조치사항 설정",
					},
				],
			},
		],
	},
	{
		key: "2",
		label: "양식 및 파일 관리",
		icon: <FolderOpenFilled />,
	},
	{
		key: "3",
		label: "부서 및 직급 관리",
		icon: <IdcardFilled />,
	},
	{
		key: "4",
		label: "사용자 등록 관리",
		icon: <UserAddOutlined />,
	},
	{
		key: "5",
		label: "공정 작업자 관리",
		icon: <TeamOutlined />,
	},
];

const topItems = [
	{
		key: "alarm",
		label: "알람",
		icon: <BellOutlined />,
	},
	{
		key: "menu",
		label: "퀵메뉴",
		icon: <AppstoreOutlined />,
	},
	{
		key: "CTA",
		label: "CTA",
		icon: <UserOutlined />,
		className: "user",
		children: [
			{
				type: "group",
				label: "Item 1",
				children: [
					{
						label: "Option 1",
						key: "setting:1",
					},
					{
						label: "Option 2",
						key: "setting:2",
					},
				],
			},
			{
				type: "group",
				label: "Item 2",
				children: [
					{
						label: "Option 3",
						key: "setting:3",
					},
					{
						label: "Option 4",
						key: "setting:4",
					},
				],
			},
		],
	},
];

const HomePage = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setIsMobile(window.innerWidth <= 768);
			};

			handleResize(); // Initialize state on mount
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	return (
		<Layout>
			<Header className="header">
				<div
					className="header-wrap"
					style={{
						marginLeft: isMobile ? "0px" : collapsed ? "56px" : "260px",
						transition: "margin-left 0.2s ease-in-out",
					}}
				>
					<div className="h-txt-area">
						<strong>활기찬 월요일!</strong>

						<span className="date">2024년 9월 2일</span>
					</div>

					<p className="time">
						<ClockCircleOutlined />
						00:00:00
					</p>

					<Menu mode="horizontal" items={topItems} className="top-menu" />
				</div>
			</Header>

			{/* 헤더 아래 전체 레이아웃 */}
			<Layout>
				{/* GNB (왼쪽 메뉴) */}
				{!isMobile && (
					<Sider
						className="lnb-area"
						trigger={null}
						collapsible
						collapsed={collapsed}
						width={260}
						collapsedWidth={56}
					>
						<div className="lnb-top">
							{/* 로고 */}
							{!isMobile && (
								<div
									className="logo"
									style={{
										opacity: collapsed ? 0 : 1,
										display: collapsed ? "none" : "block",
									}}
								>
									<img src={"./assets/images/logo.svg"} />
									FabTable
								</div>
							)}

							{/* 햄버거 버튼 */}
							<Button
								type="text"
								icon={
									collapsed || isMobile ? (
										<MenuUnfoldOutlined />
									) : (
										<MenuFoldOutlined />
									)
								}
								onClick={() =>
									isMobile ? setDrawerVisible(true) : setCollapsed(!collapsed)
								}
								style={{
									marginRight: collapsed || isMobile ? "0" : "8px",
								}}
								className="btn-menu"
							/>
						</div>

						<div
							className="user-info"
							style={{
								opacity: collapsed ? 0 : 1,
								display: collapsed ? "none" : "block",
							}}
						>
							<span className="team blue">품질팀</span>
							<span className="name">홍길동 님</span>
						</div>

						<p
							className="tit-menu"
							style={{
								opacity: collapsed ? 0 : 1,
								display: collapsed ? "none" : "block",
							}}
						>
							일반 업무
						</p>

						<Menu
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							mode="inline"
							items={basicItems}
							inlineIndent="10"
						/>

						<div className="set-menu-area">
							<p
								className="tit-menu"
								style={{
									opacity: collapsed ? 0 : 1,
									display: collapsed ? "none" : "block",
								}}
							>
								관리 및 설정
							</p>

							<Menu
								defaultSelectedKeys={["1"]}
								defaultOpenKeys={["sub1"]}
								mode="inline"
								items={adminItems}
								inlineIndent="10"
							/>
						</div>

						<Button
							icon={<QuestionCircleFilled />}
							type="text"
							className="btn-help"
						>
							도움말
						</Button>
					</Sider>
				)}

				{/* 오른쪽 본문 컨텐츠 */}
				<Layout
					style={{
						marginLeft: isMobile ? "0px" : collapsed ? "56px" : "260px",
						transition: "margin-left 0.2s ease-in-out",
					}}
				>
					<Content className="contents">{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default HomePage;
