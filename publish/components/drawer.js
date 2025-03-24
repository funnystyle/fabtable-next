// pages/month.js
"use client";

import React, { useEffect, useState } from "react";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import usePdfUrlStore from "@store/usePdfUrlStore";
import useDocxUrlStore from "@/store/useDocxUrlStore";
import dynamic from "next/dynamic";
import useOrderListQueryStore from "@store/useOrderListQueryStore";
import useDrawerStore from "@store/useDrawerStore";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

// 🚀 `react-doc-viewer`를 클라이언트에서만 로드
const DocViewer = dynamic(() => import("react-doc-viewer"), { ssr: false });

// 🚀 `DocViewerRenderers`도 SSR 방지
// const DocViewerRenderers = dynamic(() =>
//   import("react-doc-viewer").then((mod) => mod.DocViewerRenderers), 
//   { ssr: false }
// );


const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const DrawerComponent = () => {

	const { openDrawer: open, drawerHeader: headerContent, drawerContent: content, drawerFooter: footer, drawerTitle: title, closeDrawer: onClose } = useDrawerStore();

	const [renderers, setRenderers] = useState([]);


	// Zoom 플러그인 추가
	const zoomPluginInstance = zoomPlugin();
	const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

	const {selectedRowKeys} = useOrderListQueryStore();
	const { pdfUrlList } = usePdfUrlStore();
	const { docxUrlList } = useDocxUrlStore();

	const [storedPdfUrlList, setStoredPdfUrlList] = useState([]);
	const [storedDocxUrlList, setStoredDocxUrlList] = useState([]);

	useEffect(() => {
		setStoredPdfUrlList(pdfUrlList);
	}, [pdfUrlList]);

	useEffect(() => {
		console.log("storedDocxUrlList", docxUrlList);
		setStoredDocxUrlList(docxUrlList);
	}, [docxUrlList]);

	useEffect(() => {
		import("react-doc-viewer").then((mod) => {
				// 🚀 DocViewerRenderers 동적 로드 (SSR 방지)
				setRenderers(mod.DocViewerRenderers ? [...mod.DocViewerRenderers] : []);
		});
	}, []);

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
					{Array.isArray(storedPdfUrlList) && storedPdfUrlList.length > 0 && (storedPdfUrlList.map((pdfUrl, index) => (
						<div className="preview" key={`preview-${index+1}`}>
							<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
								<Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
							</Worker>
						</div>
					)))}

					{Array.isArray(storedDocxUrlList) && storedDocxUrlList.length > 0 && (storedDocxUrlList.map((docxUrl, index) => {
						console.log("url: ", docxUrl);
						return (
						<div className="preview" key={`preview-${index+1}`}>
							<DocViewer
								documents={[{ uri: docxUrl, fileType: "docx" }]}
								pluginRenderers={renderers}
								style={{ height: "80vh", width: "100%" }}
							/>
						</div>
					)}))}

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
