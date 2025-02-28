// pages/month.js
import React, { useState } from "react";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Flex } from "antd";
import Link from "next/link";

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const DrawerComponent = ({
	open,
	onClose,
	title,
	headerContent,
	content,
	footer,
}) => {
	return (
		<Layout>
			<div className="drawer-wrap">
				{/* 드로어 헤더 */}
				{headerContent}
				{/* //드로어 헤더 */}

				<div
					className="drawer-container"
					style={{
						paddingRight: open ? "400px" : "0",
						transition: "padding-right 0.2s ease-in-out",
					}}
				>
					<div className="preview">미리보기</div>

					<div className="preview">미리보기</div>

					<div
						className="zoom-r-btn"
						style={{
							right: open ? "440px" : "40px",
							transition: "right 0.2s ease-in-out",
						}}
					>
						<Button size="large" icon={<ZoomInOutlined />} shape="round" />

						<Button size="large" icon={<ZoomOutOutlined />} shape="round" />
					</div>
				</div>
			</div>

			<Drawer
				title={title}
				width={400}
				onClose={onClose}
				open={open}
				mask={false}
				extra={footer} // 푸터 버튼을 props로 받음
			>
				{content}
			</Drawer>
		</Layout>
	);
};

DrawerComponent.getLayout = (page) => page;

export default DrawerComponent;
