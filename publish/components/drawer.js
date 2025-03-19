// pages/month.js
import React, { useEffect, useState } from "react";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postBlobAxios } from "@api/apiClient";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import usePdfUrlStore from "@store/usePdfUrlStore";

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
 	selectedRowKeys = [1],
}) => {

	// Zoom 플러그인 추가
	const zoomPluginInstance = zoomPlugin();
	const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

	const { pdfUrlList } = usePdfUrlStore();

	const [urlList, setUrlList] = useState([]);

	useEffect(() => {
		setUrlList(pdfUrlList);
	}, [pdfUrlList]);

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
					{Array.isArray(urlList) && urlList.length > 0 && (urlList.map((pdfUrl, index) => (
						<div className="preview" key={`preview-${index+1}`}>
							<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
								<Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
							</Worker>
						</div>
					)))}

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
