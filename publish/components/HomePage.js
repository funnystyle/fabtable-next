// pages/index.js
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Layout, Menu, Button, Tag, Tabs, Spin, Skeleton } from "antd";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
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
import DateHeader from "./DateHeader";
import { TabContext } from "@/context/TabContext";

const { Header, Sider, Content } = Layout;

// 🔹 동적으로 페이지 로딩
const pageComponents = {
	// "/publish/dashboard": lazy(() => import("@/pages/publish/dashboard")),
	"/publish/year": lazy(() => import("@/pages/publish/year")),
	"/publish/year3": lazy(() => import("@/pages/publish/year3")),
	"/publish/month": lazy(() => import("@/pages/publish/month")),
	"/publish/order": lazy(() => import("@/pages/publish/order")),
	"/publish/orderwrite": lazy(() => import("@/pages/publish/orderwrite")),
	"/publish/cs": lazy(() => import("@/pages/publish/cs")),
	"/publish/cswrite": lazy(() => import("@/pages/publish/cswrite")),
	// "/publish/produce": lazy(() => import("@/pages/publish/produce")),
	// "/publish/qc": lazy(() => import("@/pages/publish/qc")),
	"/publish/statistic/noncommerce": lazy(() =>
		import("@/pages/publish/statistic/noncommerce")
	),
	// "/publish/cycletime": lazy(() => import("@/pages/publish/cycletime")),
	// "/publish/spc": lazy(() => import("@/pages/publish/spc")),

	// 관리자 페이지
	// "/publish/admin/code": lazy(() => import("@/pages/publish/admin/code")),
	// "/publish/admin/product": lazy(() => import("@/pages/publish/admin/product")),
	// "/publish/admin/detail": lazy(() => import("@/pages/publish/admin/detail")),
	// "/publish/admin/noncommerce/type": lazy(() => import("@/pages/publish/admin/noncommerce/type")),
	// "/publish/admin/noncommerce/config": lazy(() => import("@/pages/publish/admin/noncommerce/config")),
	// "/publish/admin/file": lazy(() => import("@/pages/publish/admin/file")),
	// "/publish/admin/depart": lazy(() => import("@/pages/publish/admin/depart")),
	// "/publish/admin/user": lazy(() => import("@/pages/publish/admin/user")),
	// "/publish/admin/worker": lazy(() => import("@/pages/publish/admin/worker")),
};

// 🔹 메뉴 항목 정의
const basicItems = [
	{
		key: "1",
		label: "대시보드",
		url: "/publish/dashboard",
		icon: <GoldFilled />,
	},
	{
		key: "2",
		label: "일정 관리",
		icon: <CalendarFilled />,
		children: [
			{
				key: "2-1",
				label: "연간 종합 일정",
				url: "/publish/year",
			},
			{
				key: "2-2",
				label: "연간 종합 일정(3개년)",
				url: "/publish/year3",
			},
			{
				key: "2-3",
				label: "월간 종합 일정",
				url: "/publish/month",
			},
		],
	},
	{
		key: "3",
		label: "영업 관리",
		// url: "/publish/order",
		icon: <EditFilled />,
		children: [
			{
				key: "3-1",
				label: "수주 현황 목록",
				url: "/publish/order",
			},
			{
				key: "3-2",
				label: "수주 등록 · 상세",
				url: "/publish/orderwrite",
			},
		],
	},
	{
		key: "4",
		label: "CS 관리",
		url: "/publish/cs",
		icon: <AudioFilled />,
		children: [
			{
				key: "4-1",
				label: "C/S 현황 목록",
				url: "/publish/cs",
			},
			{
				key: "4-2",
				label: "C/S 등록 · 상세",
				url: "/publish/cswrite",
			},
		],
	},
	{
		key: "5",
		label: "생산 관리",
		url: "/publish/produce",
		icon: <ToolFilled />,
	},
	{
		key: "6",
		label: "품질 관리",
		url: "/publish/qc",
		icon: <TrademarkCircleFilled />,
	},
	{
		key: "7",
		label: "통계 관리",
		icon: <AreaChartOutlined />,
		children: [
			{
				key: "7-1",
				label: "불량률 현황",
				url: "/publish/statistic/noncommerce",
			},
			{
				key: "7-2",
				label: "사이클 타임",
				url: "/publish/statistic/cycletime",
			},
			{
				key: "7-3",
				label: "SPC 현황",
				url: "/publish/statistic/spc",
			},
		],
	},
];

const adminItems = [
	{
		key: "admin-1",
		label: "기초 코드 관리",
		url: "/publish/admin/code",
		icon: <FontColorsOutlined />,
	},
	{
		key: "admin-2",
		label: "기준 정보 관리",
		icon: <DatabaseOutlined />,
		children: [
			{
				key: "admin-2-1",
				label: "제품 관리",
				url: "/publish/admin/product",
			},
			{
				key: "admin-2-2",
				label: "부서별 현황 관리",
				url: "/publish/admin/product",
			},
			{
				key: "admin-2-3",
				label: "부서별 상세 화면 관리",
				url: "/publish/admin/detail",
			},
			{
				key: "admin-2-4",
				label: "부적합 관리",
				children: [
					{
						key: "admin-2-4-1",
						label: "부적합 종류 관리",
						url: "/publish/admin/noncommerce/type",
					},
					{
						key: "admin-2-4-3",
						label: "등록 및 조치사항 설정",
						url: "/publish/admin/noncommerce/config",
					},
				],
			},
		],
	},
	{
		key: "admin-3",
		label: "양식 및 파일 관리",
		url: "/publish/admin/file",
		icon: <FolderOpenFilled />,
	},
	{
		key: "admin-4",
		label: "부서 및 직급 관리",
		url: "/publish/admin/depart",
		icon: <IdcardFilled />,
	},
	{
		key: "admin-5",
		label: "사용자 등록 관리",
		url: "/publish/admin/user",
		icon: <UserAddOutlined />,
	},
	{
		key: "admin-6",
		label: "공정 작업자 관리",
		url: "/publish/admin/worker",
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
	const [activeTab, setActiveTab] = useState("1");
	const [tabs, setTabs] = useState([
		{ key: "1", label: "대시보드", url: "/publish/dashboard" },
	]);
	const [selectedMenuKeys, setSelectedMenuKeys] = useState(["1"]);
	const [openKeys, setOpenKeys] = useState(["2", "3", "4", "7", "admin-2"]);
	const router = useRouter();

	// 📌 메뉴 클릭 시 탭 추가 및 GNB 활성화
	const handleMenuClick = ({ key }) => {
		const menuItem = findMenuItemByKey([...basicItems, ...adminItems], key);
		if (!menuItem || !menuItem.url) return;

		if (!tabs.some((tab) => tab.key === menuItem.key)) {
			setTabs([
				...tabs,
				{ key: menuItem.key, label: menuItem.label, url: menuItem.url },
			]);
		}

		setActiveTab(menuItem.key);
		setSelectedMenuKeys([key]);

		// 부모 메뉴 openKeys 자동 설정
		const parentKeys = getParentKeys(key, [...basicItems, ...adminItems]);
		// setOpenKeys(parentKeys ? [...parentKeys] : []);

		router.push(menuItem.url, undefined, { shallow: true });
	};

	// 📌 key 값으로 3-depth까지 메뉴 찾기
	const findMenuItemByKey = (menuList, key) => {
		for (const item of menuList) {
			if (item.key === key) return item;
			if (item.children) {
				const found = findMenuItemByKey(item.children, key);
				if (found) return found;
			}
		}
		return null;
	};

	// 📌 url 값으로 3-depth까지 메뉴 찾기
	const findMenuItemByUrl = (menuList, url) => {
		for (const item of menuList) {
			if (item.url === url) return item;
			if (item.children) {
				const found = findMenuItemByUrl(item.children, url);
				if (found) return found;
			}
		}
		return null;
	};

	// 📌 클릭한 메뉴의 부모 key 추적
	const getParentKeys = (key, menuList, parents = []) => {
		for (const item of menuList) {
			if (item.key === key) return parents;
			if (item.children) {
				const found = getParentKeys(key, item.children, [...parents, item.key]);
				if (found) return found;
			}
		}
		return null;
	};

	// 📌 탭 변경 시 GNB 활성화
	const onTabChange = (key) => {
		setActiveTab(key);
		const menuItem = findMenuItemByKey([...basicItems, ...adminItems], key);
		if (menuItem) {
			setSelectedMenuKeys([menuItem.key]);
			const parentKeys = getParentKeys(menuItem.key, [
				...basicItems,
				...adminItems,
			]);
			setOpenKeys(parentKeys ? [...parentKeys] : []);
		}
		router.push(menuItem.url, undefined, { shallow: true });
	};

	// 📌 탭 닫기
	const onTabRemove = (targetKey) => {
		let newActiveKey = activeTab;
		const newTabs = tabs.filter((tab) => tab.key !== targetKey);

		if (targetKey === activeTab && newTabs.length) {
			newActiveKey = newTabs[newTabs.length - 1].key;
		}

		setTabs(newTabs);
		setActiveTab(newActiveKey);
		router.push(newActiveKey, undefined, { shallow: true });
	};

	// 📌 GNB 서브메뉴 상태 변경
	const onOpenChange = (keys) => {
		setOpenKeys(keys);
	};

	const addTab = (menuItem) => {
    if (!tabs.some((tab) => tab.key === menuItem.key)) {
      setTabs((prev) => [
        ...prev,
        { key: menuItem.key, label: menuItem.label, url: menuItem.url },
      ]);
    }
    setActiveTab(menuItem.key);
    router.push(menuItem.url, undefined, { shallow: true });
  };

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
				const pageNav =
					document.querySelector(".page-top-nav > .ant-tabs-nav")
						?.offsetHeight || 0;

				setContentHeight(`calc(${contentsTop}px + ${pageNav}px)`);
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

	// 📌 useEffect 내부에 추가
	useEffect(() => {
		if (!router.isReady) return; // 라우터 준비될 때까지 대기

		const { pathname } = router; // 현재 URL 가져오기

		// 📌 해당 URL이 기본 메뉴에서 존재하는지 확인
		const menuItem = findMenuItemByUrl(
			[...basicItems, ...adminItems],
			pathname
		);

		if (menuItem) {
			// 🔹 이미 추가된 탭이 아니라면 추가
			if (!tabs.some((tab) => tab.key === menuItem.key)) {
				setTabs((prevTabs) => [
					...prevTabs,
					{ key: menuItem.key, label: menuItem.label, url: menuItem.url },
				]);
			}

			// 탭 활성화 & GNB 동기화
			setActiveTab(menuItem.key);
			setSelectedMenuKeys([menuItem.key]);
		}
	}, [router.isReady, router.pathname]); // pathname이 변경될 때 실행

	return (
		<TabContext.Provider value={{ tabs, activeTab, addTab }}>
			<Layout style={{ height: '100vh' }}>
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
								selectedKeys={selectedMenuKeys}
								openKeys={openKeys}
								onOpenChange={onOpenChange}
								inlineIndent="10"
								onClick={handleMenuClick}
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
									mode="inline"
									items={adminItems}
									selectedKeys={selectedMenuKeys}
									openKeys={openKeys}
									onOpenChange={onOpenChange}
									inlineIndent="10"
									onClick={handleMenuClick}
								/>
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
								<DateHeader />

								<p className="time">
									<ClockCircleOutlined />
									00:00:00
								</p>

								<Menu mode="horizontal" items={topItems} className="top-menu" />
							</div>
						</Header>
						{/* 탭 없이 하려면 아래 코드를 적용 */}
						<Content className="contents" style={{ overflowY: "auto"}}>
							{children ? React.cloneElement(children, { contentHeight }) : null}
						</Content>
						{/* 탭 적용하려면 아래 코드를 적용 */}
						{/* Content 영역을 Tabs로 변경 */}
						{/* <Content className="contents">
							<Tabs
								hideAdd
								size="small"
								type="editable-card"
								activeKey={activeTab}
								onChange={onTabChange}
								onEdit={(targetKey, action) =>
									action === "remove" && onTabRemove(targetKey)
								}
								className="page-top-nav"
								// style={{ height: "100%"}}
							>
								{tabs.map((tab) => (
									<Tabs.TabPane
										tab={tab.label}
										key={tab.key}
										closable={tab.key !== "1"}
										style={{ height: "100%"}}
									>
										<Suspense
											fallback={
												<div style={{ padding: 24 }}>
													<Skeleton active paragraph={{ rows: 10 }} />
												</div>
											}
										>
											{pageComponents[tab.url] ? (
												React.createElement(pageComponents[tab.url], {
													contentHeight,
												})
											) : (
												<div>페이지 없음</div>
											)}
										</Suspense>
									</Tabs.TabPane>
								))}
							</Tabs>
						</Content> */}
					</Layout>
				</Layout>
			</Layout>
		</TabContext.Provider>
	);
};

export default HomePage;
