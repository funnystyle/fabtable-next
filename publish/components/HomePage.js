// pages/index.js
import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Tag } from "antd";
import { useRouter } from "next/router";
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
import Image from "next/image";

const { Header, Sider, Content } = Layout;

const basicItems = [
	{
		key: "1",
		label: <Link href={"/publish/dashboard"}>대시보드</Link>,
		icon: <GoldFilled />,
	},
	{
		key: "sub1",
		label: "일정 관리",
		icon: <CalendarFilled />,
		children: [
			{
				key: "sub1-1",
				label: <Link href={"/publish/year"}>연간 종합 일정</Link>,
			},
			{
				key: "sub1-2",
				label: <Link href={"/publish/month"}>월간 종합 일정</Link>,
			},
		],
	},
	{
		key: "2",
		label: <Link href={"/publish/order"}>영업 관리</Link>,
		icon: <EditFilled />,
	},
	{
		key: "3",
		label: <Link href={"/publish/cs"}>CS 관리</Link>,
		icon: <AudioFilled />,
	},
	{
		key: "4",
		label: <Link href={"/publish/produce"}>생산 관리</Link>,
		icon: <ToolFilled />,
	},
	{
		key: "5",
		label: <Link href={"/publish/qc"}>품질 관리</Link>,
		icon: <TrademarkCircleFilled />,
	},
	{
		key: "sub2",
		label: "통계 관리",
		icon: <AreaChartOutlined />,
		children: [
			{
				key: "sub2-1",
				label: <Link href={"/publish/noncommerce"}>불량률 현황</Link>,
			},
			{
				key: "sub2-2",
				label: <Link href={"/publish/cycletime"}>사이클 타임</Link>,
			},
			{
				key: "sub3",
				label: <Link href={"/publish/spc"}>SPC 현황</Link>,
			},
		],
	},
];

const adminItems = [
	{
		key: "1",
		label: <Link href={"/publish/admin/code"}>기초 코드 관리</Link>,
		icon: <FontColorsOutlined />,
	},
	{
		key: "sub1",
		label: "기준 정보 관리",
		icon: <DatabaseOutlined />,
		children: [
			{
				key: "sub1-1",
				label: <Link href={"/publish/admin/product"}>제품 관리</Link>,
			},
			{
				key: "sub1-2",
				label: <Link href={"/publish/admin/product"}>부서별 현황 관리</Link>,
			},
			{
				key: "sub1-3",
				label: (
					<Link href={"/publish/admin/detail"}>부서별 상세 화면 관리</Link>
				),
			},
			{
				key: "sub1-4",
				label: "부적합 관리",
				children: [
					{
						key: "sub1-4-1",
						label: (
							<Link href={"/publish/admin/noncommerce/type"}>
								부적합 종류 관리
							</Link>
						),
					},
					{
						key: "sub1-4-3",
						label: (
							<Link href={"/publish/admin/noncommerce/config"}>
								등록 및 조치사항 설정
							</Link>
						),
					},
				],
			},
		],
	},
	{
		key: "2",
		label: <Link href={"/publish/admin/file"}>양식 및 파일 관리</Link>,
		icon: <FolderOpenFilled />,
	},
	{
		key: "3",
		label: <Link href={"/publish/admin/depart"}>부서 및 직급 관리</Link>,
		icon: <IdcardFilled />,
	},
	{
		key: "4",
		label: <Link href={"/publish/admin/user"}>사용자 등록 관리</Link>,
		icon: <UserAddOutlined />,
	},
	{
		key: "5",
		label: <Link href={"/publish/admin/worker"}>공정 작업자 관리</Link>,
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
	const [contentHeight, setContentHeight] = useState("100vh");

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				const isSmallScreen = window.innerWidth <= 1200;
				setIsMobile(window.innerWidth <= 768);
				setCollapsed(isSmallScreen);
			};

			const updateHeight = () => {
				const header = document.querySelector(".header")?.offsetHeight || 0;
				const contentsTop =
					document.querySelector(".contents-top")?.offsetHeight || 0;

				setContentHeight(`calc(${header}px + ${contentsTop}px - 30px)`);
			};

			// 페이지 이동 시 높이 업데이트
			const handleRouteChange = () => {
				setTimeout(updateHeight, 50); // 약간의 딜레이를 줘서 정확한 값 적용
			};

			updateHeight(); // 초기 높이 설정
			handleResize(); // 초기 화면 크기 설정

			window.addEventListener("resize", handleResize);
			router.events.on("routeChangeComplete", handleRouteChange); // 페이지 변경 감지

			return () => {
				window.removeEventListener("resize", handleResize);
				router.events.off("routeChangeComplete", handleRouteChange); // 이벤트 해제
			};
		}
	}, [router.events]);

	return (
		<Layout>
			<Layout>
				{/* GNB (왼쪽 메뉴) */}
				<Sider
					className="lnb-area"
					trigger={null}
					collapsible
					collapsed={collapsed}
					breakpoint="lg"
					width={260}
					collapsedWidth={64}
				>
					<div className="lnb-top">
						{/* 로고 */}
						<div
							className="logo"
							style={{
								opacity: collapsed ? 0 : 1,
								display: collapsed ? "none" : "block",
							}}
						>
							<img src={"/images/logo.svg"} />
							FabTable
						</div>

						{/* 햄버거 버튼 */}
						<Button
							type="text"
							icon={<MenuFoldOutlined />}
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
						<Tag className="blue">품질팀</Tag>

						{/*
							<Tag className="pink">영업팀</Tag>
							<Tag className="orange">생산팀</Tag>
							<Tag className="purple">부서4</Tag>
							<Tag className="red">부서5</Tag>
							<Tag className="green">부서6</Tag>
							*/}

						<span className="name">
							<Link href={"/publish/"}>홍길동 님</Link>
						</span>
					</div>

					<div className="lnb-scroll">
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
							defaultOpenKeys={["sub1", "sub2"]}
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

							<Menu mode="inline" items={adminItems} inlineIndent="10" />
						</div>
					</div>

					<Button
						icon={<QuestionCircleFilled />}
						type="text"
						className="btn-help"
					>
						<span
							style={{
								opacity: collapsed ? 0 : 1,
								display: collapsed ? "none" : "inline",
							}}
						>
							도움말
						</span>
					</Button>
				</Sider>

				{/* 오른쪽 본문 컨텐츠 */}
				<Layout
					style={{
						transition: "margin-left 0.2s ease-in-out",
					}}
					className={`${collapsed ? "collapsed-mode" : "expanded-mode"}`}
				>
					<Header className="header">
						<div
							className="header-wrap"
							style={{
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
					<Content className="contents">
						{children ? React.cloneElement(children, { contentHeight }) : null}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default HomePage;
