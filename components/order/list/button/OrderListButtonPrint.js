// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Flex, Form, Select, Space, } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OrderListPrintLabel from "@components/order/list/button/print/OrderListPrintLabel";
import OrderListPrintSelect from "@components/order/list/button/print/OrderListPrintSelect";
import OrderListPrintTitle from "@components/order/list/button/print/OrderListPrintTitle";
import OrderListPrintReport from "@components/order/list/button/print/OrderListPrintReport";
import { useMutation } from "@tanstack/react-query";
import { postBlobAxios } from "@api/apiClient";
import usePdfUrlStore from "@store/usePdfUrlStore";
import OrderListPrintDrawerHeader from "@components/order/list/button/print/OrderListPrintDrawerHeader";

const OrderListButtonPrint = ({ selectedRowKeys, setOpenDrawer, setDrawerHeader, setDrawerContent, setDrawerFooter, setDrawerTitle}) => {

	const { pdfUrlList, setPdfUrlList } = usePdfUrlStore();
	const [selectedPrint, setSelectedPrint] = useState("label"); // ✅ 선택된 라벨 종류 상태
	const [urlList, setUrlList] = useState([]); // ✅ PDF URL 목록 상태

	const { mutate: certificate } = useMutation({
		mutationKey: "certificate_id",
		mutationFn: (values) => postBlobAxios("/admin/certificate/1", values),
		onSuccess: (data) => {
			// 파일 다운로드 처리
			const url = window.URL.createObjectURL(data);
			setPdfUrlList((prev) => [...prev, url]);
		},
	});

	const [form] = Form.useForm(); // ✅ Form 인스턴스 생성
	// 드로어 열기
	const showDrawer = (type) => {
		setSelectedPrint(type);

		setPdfUrlList([]); // 초기화
		certificate({list: selectedRowKeys});

		setOpenDrawer(true);
	};

	// 드로어 닫기
	const closeDrawer = () => {
		setOpenDrawer(false);
	};


	// 📌 폼 값 변경 감지 및 상태 업데이트
	useEffect(() => {
		setDrawerTitle("인쇄 설정");
		setDrawerHeader(<OrderListPrintDrawerHeader closeDrawer={closeDrawer} printPdf={printPdf} urlList={urlList} />);

		setDrawerContent(
			<>
				<Form form={form} layout="vertical">
					<OrderListPrintTitle />

					<OrderListPrintSelect selectedPrint={selectedPrint} setSelectedPrint={setSelectedPrint} />

					{selectedPrint === "label" && (
						<OrderListPrintLabel form={form} />
					)}

					{selectedPrint === "report" && (
						<OrderListPrintReport form={form} />
					)}
				</Form>
			</>
		)}, [selectedPrint]); // ✅ selectedLabel 변경 시 자동 반영

	useEffect(() => {
		setDrawerHeader(<OrderListPrintDrawerHeader closeDrawer={closeDrawer} printPdf={printPdf} urlList={urlList} />);

	}, [urlList]);

	useEffect(() => {
		setUrlList(pdfUrlList);
	}, [pdfUrlList]);



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
