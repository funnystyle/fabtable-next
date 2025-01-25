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
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const items = [
	{
		key: "1",
		label: <a href="/">대시보드</a>,
		icon: <GoldFilled />,
	},
	{
		key: "sub1",
		label: "일정 관리",
		icon: <CalendarFilled />,
		children: [
			{
				key: "sub1-1",
				label: <a href="/ScheduleYear">연간 종합 일정</a>,
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
					style={{
						display: "flex",
						alignItems: "center",
						width: isMobile ? "56px" : "260px",
						transition: "width 0.2s ease-in-out",
						justifyContent: "space-between",
					}}
				></div>
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
									marginRight: collapsed || isMobile ? "0" : "16px",
								}}
								className="btn-menu"
							/>
						</div>

						<Menu
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							mode="inline"
							items={items}
							inlineIndent="10"
							style={{
								itemHeight: 36,
							}}
						/>
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
