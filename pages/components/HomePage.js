// pages/index.js
import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Tag } from "antd";
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
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";
import * as AntIcons from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const basicItems = [
	{
		key: "1",
		label: <Link href={"/dashboard"}>대시보드</Link>,
		icon: <GoldFilled />,
	},
	{
		key: "sub1",
		label: "일정 관리",
		icon: <CalendarFilled />,
		children: [
			{
				key: "sub1-1",
				label: <Link href={"/year"}>연간 종합 일정</Link>,
			},
			{
				key: "sub1-2",
				label: <Link href={"/month"}>월간 종합 일정</Link>,
			},
		],
	},
	{
		key: "2",
		label: <Link href={"/order"}>영업 관리</Link>,
		icon: <EditFilled />,
	},
	{
		key: "3",
		label: <Link href={"/cs"}>CS 관리</Link>,
		icon: <AudioFilled />,
	},
	{
		key: "4",
		label: <Link href={"/produce"}>생산 관리</Link>,
		icon: <ToolFilled />,
	},
	{
		key: "5",
		label: <Link href={"/qc"}>품질 관리</Link>,
		icon: <TrademarkCircleFilled />,
	},
	{
		key: "sub2",
		label: "통계 관리",
		icon: <AreaChartOutlined />,
		children: [
			{
				key: "sub2-1",
				label: <Link href={"/noncommerce"}>불량률 현황</Link>,
			},
			{
				key: "sub2-2",
				label: <Link href={"/cycletime"}>사이클 타임</Link>,
			},
			{
				key: "sub3",
				label: <Link href={"/spc"}>SPC 현황</Link>,
			},
		],
	},
];

const adminItems = [
	{
		key: "1",
		label: <Link href={"/admin/code"}>기초 코드 관리</Link>,
		icon: <FontColorsOutlined />,
	},
	{
		key: "sub1",
		label: "기준 정보 관리",
		icon: <DatabaseOutlined />,
		children: [
			{
				key: "sub1-1",
				label: <Link href={"/admin/product"}>제품 관리</Link>,
			},
			{
				key: "sub1-2",
				label: <Link href={"/admin/product"}>부서별 현황 관리</Link>,
			},
			{
				key: "sub1-3",
				label: <Link href={"/admin/detail"}>부서별 상세 화면 관리</Link>,
			},
			{
				key: "sub1-4",
				label: "부적합 관리",
				children: [
					{
						key: "sub1-4-1",
						label: (
							<Link href={"/admin/noncommerce/type"}>부적합 종류 관리</Link>
						),
					},
					{
						key: "sub1-4-3",
						label: (
							<Link href={"/admin/noncommerce/config"}>
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
		label: <Link href={"/admin/file"}>양식 및 파일 관리</Link>,
		icon: <FolderOpenFilled />,
	},
	{
		key: "3",
		label: <Link href={"/admin/depart"}>부서 및 직급 관리</Link>,
		icon: <IdcardFilled />,
	},
	{
		key: "4",
		label: <Link href={"/admin/user"}>사용자 등록 관리</Link>,
		icon: <UserAddOutlined />,
	},
	{
		key: "5",
		label: <Link href={"/admin/worker"}>공정 작업자 관리</Link>,
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

	const [menuItems, setMenuItems] = useState([]);
	const [queryKey, setQueryKey] = useState(["menuResponse", Math.random()]);
	const { data:menuResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/menu", {}),
	});

	const getIconForMenu = (iconName) => {
		// AntIcons에서 iconName에 해당하는 아이콘을 동적으로 가져옵니다.
		const IconComponent = AntIcons[iconName];
		return IconComponent ? <IconComponent /> : null; // 아이콘이 있으면 반환하고, 없으면 null
	};

	const mapMenu = (menu) => {
		return {
			key: menu.id.toString(),
			label: menu.childrenMenus && menu.childrenMenus.length > 0 ? menu.name : <Link href={menu.url}>{menu.name}</Link>,
			icon: getIconForMenu(menu.icon),
				//menu.icon ? <SomeIcon /> : null, // 아이콘은 실제로 제공되지 않아서 예시로 처리함
			children: menu.childrenMenus && menu.childrenMenus.length > 0 ? menu.childrenMenus.map(mapMenu) : undefined,
		};
	};

	useEffect(() => {
		if (isSuccess && menuResponse) {
			console.log("menuResponse", menuResponse);

			setMenuItems(menuResponse.data.list);
		}
	}, [menuResponse]);

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

	const menuList = (menuData) => {

		// 현재 URL을 기반으로 selectedKeys와 openKeys를 동적으로 설정
		const getDefaultSelectedKeys = () => {
			// 현재 URL이 포함된 메뉴 항목을 찾아서 key를 리턴
			let selectedKey = [];

			if (location.pathname === "/") { // 대시보드 기본선택 되도록 설정
				selectedKey.push("2");
				return selectedKey;
			}

			menuList.forEach((menu) => {
				menu.children.forEach((item) => {
					if (location.pathname === item.url) {
						selectedKey.push(item.key);
					}
					if (item.children) {
						item.children.forEach((subItem) => {
							if (location.pathname === subItem.url) {
								selectedKey.push(subItem.key);
							}
						});
					}
				});
			});
			return selectedKey;
		};

		const getDefaultOpenKeys = () => {
			// 현재 URL에 맞는 메뉴를 열어주는 openKey 설정
			let openKeys = [];
			menuList.forEach((menu) => {
				menu.children.forEach((item) => {
					if (location.pathname === item.url) {
						openKeys.push(menu.key); // 해당 그룹의 메뉴를 열도록 설정
					}
					if (item.children) {
						item.children.forEach((subItem) => {
							if (location.pathname === subItem.url) {
								openKeys.push(menu.key); // 해당 그룹의 메뉴를 열도록 설정
							}
						});
					}
				});
			});
			return openKeys;
		};

		console.log("menuDataList", menuData)


		if (!menuData || menuData.length === 0) {
			return <></>;
		}

		let menuList = [];

		menuData.forEach((group) => {
			if (group.type === "GROUP") {
				let menu = {};
				menu.key = group.id.toString();
				menu.name = group.name;
				let groupMenus = [];
				group.childrenMenus.forEach((menu) => {
					const newItem = mapMenu(menu);
					if (menu.type === "CATEGORY") {
						groupMenus.push({
							key: `sub${newItem.key}`,
							label: newItem.label,
							icon: newItem.icon,
							children: newItem.children,
						});
					} else {
						groupMenus.push(newItem);
					}
				});
				menu.children = groupMenus;
				menuList.push(menu);
			}
		});

		return (
			<>
				{menuList.map((menu, index) => (
					<div key={menu.key}>
						<p
							className="tit-menu"
							style={{
								opacity: collapsed ? 0 : 1,
								display: collapsed ? "none" : "block",
							}}
						>
							{menu.name} {/* 메뉴 이름: 일반 업무, 관리 및 설정 등 */}
						</p>

						<Menu
							mode="inline"
							items={menu.children}
							inlineIndent="10"
							defaultSelectedKeys={getDefaultSelectedKeys()}
							defaultOpenKeys={getDefaultOpenKeys()}
						/>
						{index < menuList.length - 1 && <div className="set-menu-area" />} {/* 두 그룹 사이에 구분선 추가 */}
					</div>
				))}
			</>
		)
	}

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
							<Link href={"/"}>홍길동 님</Link>
						</span>
					</div>

					<div className="lnb-scroll">
						{menuList(menuItems)}
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
					<Content className="contents">{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default HomePage;
