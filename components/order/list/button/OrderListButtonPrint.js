// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Space, } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OrderListPrintLabel from "@components/order/list/button/print/OrderListPrintLabel";
import OrderListPrintSelect from "@components/order/list/button/print/OrderListPrintSelect";
import OrderListPrintTitle from "@components/order/list/button/print/OrderListPrintTitle";
import OrderListPrintReport from "@components/order/list/button/print/OrderListPrintReport";
import usePdfUrlStore from "@store/usePdfUrlStore";
import useDocxUrlStore from "@store/useDocxUrlStore";
import OrderListPrintDrawerHeader from "@components/order/list/button/print/OrderListPrintDrawerHeader";
import useDrawerStore from "@store/useDrawerStore";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";
import { useGetDocxUrl } from "@components/api/useGetDocxUrl";
import { showDrawer } from "@components/drawer/showDrawer";
import OrderListPrintLabelDrawerHeader from "@components/order/list/button/print/OrderListPrintLabelDrawerHeader";

const OrderListButtonPrint = ({ keyStore, drawerStore }) => {

	const { openDrawer, setOpenDrawer, setDrawerHeader, setDrawerContent, setDrawerFooter, setDrawerTitle, setSelectedPrint, selectedPrint, certificateId } = drawerStore();
	const { pdfUrlList, setPdfUrlList } = usePdfUrlStore();
	const { docxUrlList, setDocxUrlList } = useDocxUrlStore();
	const { selectedRowKeys } = useTableSelectKeysOrderListStore();
	const [storedPdfUrlList, setStoredPdfUrlList] = useState([]); // ✅ PDF URL 목록 상태
	const [storedDocxUrlList, setStoredDocxUrlList] = useState([]); // ✅ PDF URL 목록 상태

	const { handleReload } = useGetDocxUrl(certificateId);

	const [form] = Form.useForm(); // ✅ Form 인스턴스 생성
	// 드로어 열기



	const printItems = [
		{
			label: "라벨 인쇄",
			key: "1",
			onClick: () => showDrawer("label", handleReload, keyStore, drawerStore, usePdfUrlStore, useDocxUrlStore), // 클릭 시 라벨 인쇄 Drawer 열기
		},
		{
			label: "성적서 인쇄",
			key: "2",
			onClick: () => showDrawer("report", handleReload, keyStore, drawerStore, usePdfUrlStore, useDocxUrlStore), // 클릭 시 성적서 인쇄 Drawer 열기
		},
	];

	// 드로어 닫기
	const closeDrawer = () => {
		setOpenDrawer(false);
	};

	const handlePrint = () => {
		const printElement = document.querySelector(".printThis");
		if (!printElement) return;

		// iframe 생성
		const iframe = document.createElement("iframe");
		iframe.style.position = "fixed";
		iframe.style.right = "0";
		iframe.style.bottom = "0";
		iframe.style.width = "0";
		iframe.style.height = "0";
		iframe.style.border = "0";
		document.body.appendChild(iframe);

		// iframe 문서에 HTML 복사
		const doc = iframe.contentWindow.document;
		doc.open();
		doc.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 10mm;
          }
        </style>
      </head>
      <body>
        ${printElement.innerHTML}
      </body>
    </html>
  `);
		doc.close();

		// iframe 로드 후 인쇄
		iframe.onload = () => {
			iframe.contentWindow.focus();
			iframe.contentWindow.print();

			// 인쇄 후 iframe 제거
			setTimeout(() => {
				document.body.removeChild(iframe);
			}, 100);
		};
	};

	// 📌 폼 값 변경 감지 및 상태 업데이트
	useEffect(() => {
		setDrawerTitle("인쇄 설정");
		setDrawerHeader(
			<>
				{selectedPrint === "label" && (
					<OrderListPrintLabelDrawerHeader closeDrawer={closeDrawer} handlePrint={handlePrint} />
				)}

				{selectedPrint === "report" && (
					<OrderListPrintDrawerHeader closeDrawer={closeDrawer} printPdf={printPdf} urlList={storedPdfUrlList} />
				)}
			</>
		);

		setDrawerContent(
			<>
				<Form form={form} layout="vertical">
					<OrderListPrintTitle />

					<OrderListPrintSelect selectedPrint={selectedPrint} setSelectedPrint={setSelectedPrint} />

					{selectedPrint === "label" && (
						<OrderListPrintLabel form={form} keyStore={keyStore} drawerStore={drawerStore} />
					)}

					{selectedPrint === "report" && (
						<OrderListPrintReport form={form} />
					)}
				</Form>
			</>
		);
	}, [selectedPrint]); // ✅ selectedLabel 변경 시 자동 반영

	useEffect(() => {
		setDrawerHeader(
			<>
				{selectedPrint === "label" && (
					<OrderListPrintLabelDrawerHeader closeDrawer={closeDrawer} handlePrint={handlePrint} />
				)}

				{selectedPrint === "report" && (
					<OrderListPrintDrawerHeader closeDrawer={closeDrawer} printPdf={printPdf} urlList={storedPdfUrlList} />
				)}
			</>
		);
	}, [storedPdfUrlList]);

	useEffect(() => {
		setStoredPdfUrlList(pdfUrlList);
	}, [pdfUrlList]);

	useEffect(() => {
		setStoredPdfUrlList(docxUrlList);
	}, [docxUrlList]);




	const printPdf = (urlList) => {
		if (urlList.length === 0) {
			console.warn("인쇄할 PDF가 없습니다.");
			return;
		}

		const pdfUrl = urlList[0]; // 첫 번째 PDF 파일 가져오기

		// 기존 iframe 삭제
		const existingIframe = document.getElementById("pdf-print-iframe");
		if (existingIframe) {
			document.body.removeChild(existingIframe);
		}

		// 새로운 iframe 생성 (숨김 처리)
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";
		iframe.id = "pdf-print-iframe";
		iframe.src = pdfUrl;
		document.body.appendChild(iframe);

		// PDF 로드 후 인쇄 실행
		iframe.onload = () => {
			iframe.contentWindow.focus(); // 포커스 맞추기
			iframe.contentWindow.print(); // 인쇄 창 띄우기
		};
	};

	return (
		<Dropdown menu={{ items: printItems }}>
			<Button>
				<Space>
					인쇄하기
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export default OrderListButtonPrint;
