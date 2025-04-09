import React from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const getProduceColumns = (sortedInfo, stringSorter, dateSorter) => {
	return [
		{
			title: "No",
			showSorterTooltip: { title: "No" },
			dataIndex: "no",
			key: "no",
			sorter: (a, b) => a.no - b.no,
			sortOrder: sortedInfo.columnKey === "no" ? sortedInfo.order : null,
			ellipsis: true,
			width: 49,
			fixed: "left",
		},
		{
			title: "시리얼번호",
			showSorterTooltip: { title: "시리얼번호" },
			dataIndex: "serialNumber",
			key: "serialNumber",
			sorter: (a, b) => stringSorter(a, b, "serialNumber"),
			sortOrder: sortedInfo.columnKey === "serialNumber" ? sortedInfo.order : null,
			ellipsis: true,
			width: 115,
			fixed: "left",
		},
		{
			title: "P/O번호",
			showSorterTooltip: { title: "P/O번호" },
			dataIndex: "poNumber",
			key: "poNumber",
			sorter: (a, b) => stringSorter(a, b, "poNumber"),
			sortOrder: sortedInfo.columnKey === "poNumber" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
			fixed: "left",
		},
		{
			title: "출고종류",
			showSorterTooltip: { title: "출고종류" },
			dataIndex: "deliveryType",
			key: "deliveryType",
			sorter: (a, b) => stringSorter(a, b, "deliveryType"),
			sortOrder: sortedInfo.columnKey === "deliveryType" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
			fixed: "left",
		},
		{
			title: "프로젝트번호",
			showSorterTooltip: { title: "프로젝트번호" },
			dataIndex: "projectNumber",
			key: "projectNumber",
			sorter: (a, b) => stringSorter(a, b, "projectNumber"),
			sortOrder:
				sortedInfo.columnKey === "projectNumber" ? sortedInfo.order : null,
			ellipsis: true,
			width: 105,
		},
		{
			title: "납품처",
			showSorterTooltip: { title: "납품처" },
			dataIndex: "buyer",
			key: "buyer",
			sorter: (a, b) => stringSorter(a, b, "buyer"),
			sortOrder: sortedInfo.columnKey === "buyer" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "납품계획일",
			showSorterTooltip: { title: "납품계획일" },
			dataIndex: "scheduledDeliveryDate",
			key: "scheduledDeliveryDate",
			align: "center",
			sorter: (a, b) => dateSorter(a, b, "scheduledDeliveryDate"),
			sortOrder:
				sortedInfo.columnKey === "scheduledDeliveryDate" ? sortedInfo.order : null,
			width: 106,
		},
		{
			title: "납품일",
			showSorterTooltip: { title: "납품일" },
			dataIndex: "deliverDatetime",
			key: "deliverDatetime",
			align: "center",
			sorter: (a, b) => dateSorter(a, b, "deliverDatetime"),
			sortOrder: sortedInfo.columnKey === "deliverDatetime" ? sortedInfo.order : null,
			width: 106,
		},
		{
			title: "장비코드",
			showSorterTooltip: { title: "장비코드" },
			dataIndex: "customerCode",
			key: "customerCode",
			sorter: (a, b) => stringSorter(a, b, "customerCode"),
			sortOrder:
				sortedInfo.columnKey === "customerCode" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "제품군",
			showSorterTooltip: { title: "제품군" },
			dataIndex: "productCategory",
			key: "productCategory",
			sorter: (a, b) => stringSorter(a, b, "productCategory"),
			sortOrder: sortedInfo.columnKey === "productCategory" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "모델",
			showSorterTooltip: { title: "모델" },
			dataIndex: "productModel",
			key: "productModel",
			sorter: (a, b) => stringSorter(a, b, "productModel"),
			sortOrder: sortedInfo.columnKey === "productModel" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "세부모델",
			showSorterTooltip: { title: "세부모델" },
			dataIndex: "subModelName",
			key: "subModelName",
			sorter: (a, b) => stringSorter(a, b, "subModelName"),
			sortOrder:
				sortedInfo.columnKey === "subModelName" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "제조번호",
			showSorterTooltip: { title: "제조번호" },
			dataIndex: "oldSerialNumber",
			key: "oldSerialNumber",
			sorter: (a, b) => stringSorter(a, b, "oldSerialNumber"),
			sortOrder:
				sortedInfo.columnKey === "oldSerialNumber" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
		},
		{
			title: "제조버전",
			showSorterTooltip: { title: "제조버전" },
			dataIndex: "productVersion",
			key: "productVersion",
			sorter: (a, b) => stringSorter(a, b, "productVersion"),
			sortOrder:
				sortedInfo.columnKey === "productVersion" ? sortedInfo.order : null,
			ellipsis: true,
			width: 100,
		},
		{
			title: "피팅종류",
			showSorterTooltip: { title: "피팅종류" },
			dataIndex: "fittingType",
			key: "fittingType",
			sorter: (a, b) => stringSorter(a, b, "fittingType"),
			sortOrder: sortedInfo.columnKey === "fittingType" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사이즈/씰",
			showSorterTooltip: { title: "사이즈/씰" },
			dataIndex: "sealSize",
			key: "sealSize",
			sorter: (a, b) => stringSorter(a, b, "sealSize"),
			sortOrder: sortedInfo.columnKey === "sealSize" ? sortedInfo.order : null,
			width: 85,
		},
		{
			title: "사용가스",
			showSorterTooltip: { title: "사용가스" },
			dataIndex: "fluid",
			key: "fluid",
			sorter: (a, b) => stringSorter(a, b, "fluid"),
			sortOrder: sortedInfo.columnKey === "fluid" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "유량",
			showSorterTooltip: { title: "유량" },
			dataIndex: "flowrate",
			key: "flowrate",
			sorter: (a, b) => stringSorter(a, b, "flowrate"),
			sortOrder: sortedInfo.columnKey === "flowrate" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: "C.F",
			showSorterTooltip: { title: "C.F" },
			dataIndex: "conversionFactor",
			key: "conversionFactor",
			sorter: (a, b) => stringSorter(a, b, "conversionFactor"),
			sortOrder: sortedInfo.columnKey === "conversionFactor" ? sortedInfo.order : null,
			width: 64,
		},
		{
			title: "환산유량",
			showSorterTooltip: { title: "환산유량" },
			dataIndex: "convertedFlowrate",
			key: "convertedFlowrate",
			sorter: (a, b) => stringSorter(a, b, "convertedFlowrate"),
			sortOrder:
				sortedInfo.columnKey === "convertedFlowrate" ? sortedInfo.order : null,
			width: 80,
		},
		{
			title: "사용 압력단위",
			showSorterTooltip: { title: "사용 압력단위" },
			dataIndex: "pressureUnit",
			key: "pressureUnit",
			sorter: (a, b) => stringSorter(a, b, "pressureUnit"),
			sortOrder:
				sortedInfo.columnKey === "pressureUnit" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "제어 압력단위",
			showSorterTooltip: { title: "제어 압력단위" },
			dataIndex: "controlPressureUnit",
			key: "controlPressureUnit",
			sorter: (a, b) => stringSorter(a, b, "controlPressureUnit"),
			sortOrder:
				sortedInfo.columnKey === "controlPressureUnit" ? sortedInfo.order : null,
			ellipsis: true,
			width: 110,
		},
		{
			title: "압력(최저)",
			showSorterTooltip: { title: "압력(최저)" },
			dataIndex: "minimumPressure",
			key: "minimumPressure",
			sorter: (a, b) => stringSorter(a, b, "minimumPressure"),
			sortOrder: sortedInfo.columnKey === "minimumPressure" ? sortedInfo.order : null,
			width: 90,
		},
		{
			title: "압력(중심)",
			showSorterTooltip: { title: "압력(중심)" },
			dataIndex: "normalPressure",
			key: "normalPressure",
			sorter: (a, b) => stringSorter(a, b, "normalPressure"),
			sortOrder: sortedInfo.columnKey === "normalPressure" ? sortedInfo.order : null,
			width: 90,
		},
		{
			title: "압력(최대)",
			showSorterTooltip: { title: "압력(최대)" },
			dataIndex: "maximumPressure",
			key: "maximumPressure",
			sorter: (a, b) => stringSorter(a, b, "maximumPressure"),
			sortOrder: sortedInfo.columnKey === "maximumPressure" ? sortedInfo.order : null,
			width: 90,
		},
		{
			title: "노즐경",
			showSorterTooltip: { title: "노즐경" },
			dataIndex: "nozzle",
			key: "nozzle",
			sorter: (a, b) => stringSorter(a, b, "nozzle"),
			sortOrder: sortedInfo.columnKey === "nozzle" ? sortedInfo.order : null,
			ellipsis: true,
			width: 64,
		},
		{
			title: "바이패스 튜브",
			showSorterTooltip: { title: "바이패스 튜브" },
			dataIndex: "bypassTube",
			key: "bypassTube",
			sorter: (a, b) => stringSorter(a, b, "bypassTube"),
			sortOrder:
				sortedInfo.columnKey === "bypassTube" ? sortedInfo.order : null,
			ellipsis: true,
			width: 103,
		},
		{
			title: "센서종류",
			showSorterTooltip: { title: "센서종류" },
			dataIndex: "sensorKind",
			key: "sensorKind",
			sorter: (a, b) => stringSorter(a, b, "sensorKind"),
			sortOrder:
				sortedInfo.columnKey === "sensorKind" ? sortedInfo.order : null,
			ellipsis: true,
			width: 87,
		},
		{
			title: "MGMR",
			showSorterTooltip: { title: "MGMR" },
			dataIndex: "mgmrType",
			key: "mgmrType",
			align: "center",
			sorter: (a, b) => stringSorter(a, b, "mgmrType"),
			sortOrder: sortedInfo.columnKey === "mgmrType" ? sortedInfo.order : null,
			ellipsis: true,
			width: 70,
		},
		{
			title: "특주번호",
			showSorterTooltip: { title: "특주번호" },
			dataIndex: "specialOrderNumber",
			key: "specialOrderNumber",
			align: "center",
			sorter: (a, b) => stringSorter(a, b, "specialOrderNumber"),
			sortOrder:
				sortedInfo.columnKey === "specialOrderNumber" ? sortedInfo.order : null,
			ellipsis: true,
			width: 76,
		},
		{
			title: "현재상태",
			showSorterTooltip: { title: "현재상태" },
			dataIndex: "nowState",
			key: "nowState",
			align: "center",
			sorter: (a, b) => {
				const getText = (value) => {
					// JSX인 경우 children 속성에서 텍스트 추출
					if (React.isValidElement(value)) {
						return value.props.children;
					}
					// 문자열인 경우 그대로 반환
					return value;
				};

				const nameA = getText(a.nowState);
				const nameB = getText(b.nowState);

				// 문자 기준 사전순 정렬
				return nameA.localeCompare(nameB, "ko-KR");
			},
			sortOrder: sortedInfo.columnKey === "nowState" ? sortedInfo.order : null,
			ellipsis: true,
			width: 85,
		},
		{
			title: (
				<>
					QT
					<Tooltip
						title={
							<>
								PT : 생산 구분 / QT : 품질 구분
								<br />
								N : 일반 제품 (Normal)
								<br />
								QRn : 품질팀 재작업 횟수 (Quality Rework)
								<br />
								PRn : 제조팀 재작업 횟수 (Production Rework)
							</>
						}
					>
						<QuestionCircleOutlined
							style={{ marginLeft: "5px", color: "rgba(0,0,0,0.45)" }}
						/>
					</Tooltip>
				</>
			),
			// showSorterTooltip: { title: "QT" },
			dataIndex: "qt",
			key: "qt",
			sorter: (a, b) => stringSorter(a, b, "qt"),
			sortOrder: sortedInfo.columnKey === "qt" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: (
				<>
					PT
					<Tooltip
						title={
							<>
								PT : 생산 구분 / QT : 품질 구분
								<br />
								N : 일반 제품 (Normal)
								<br />
								QRn : 품질팀 재작업 횟수 (Quality Rework)
								<br />
								PRn : 제조팀 재작업 횟수 (Production Rework)
							</>
						}
					>
						<QuestionCircleOutlined
							style={{ marginLeft: "5px", color: "rgba(0,0,0,0.45)" }}
						/>
					</Tooltip>
				</>
			),
			// showSorterTooltip: { title: "PT" },
			dataIndex: "pt",
			key: "pt",
			sorter: (a, b) => stringSorter(a, b, "pt"),
			sortOrder: sortedInfo.columnKey === "pt" ? sortedInfo.order : null,
			width: 72,
		},
		{
			title: "조립 공정",
			showSorterTooltip: { title: "조립 공정" },
			dataIndex: "assembleStatus",
			key: "assembleStatus",
			width: 95,
		},
		{
			title: "조립 완료일",
			showSorterTooltip: { title: "조립 완료일" },
			dataIndex: "조립 완료일",
			width: 95,
		},
		{
			title: "조립 작업자",
			showSorterTooltip: { title: "조립 작업자" },
			dataIndex: "조립 작업자",
			width: 95,
		},
		{
			title: "조립 횟수",
			showSorterTooltip: { title: "조립 횟수" },
			dataIndex: "조립 횟수",
			width: 85,
			align: "center",
		},
		{
			title: "내부리크 공정",
			showSorterTooltip: { title: "내부리크 공정" },
			dataIndex: "internalLeakageStatus",
			key: "internalLeakageStatus",
			width: 95,
		},
		{
			title: "내부리크 완료일",
			showSorterTooltip: { title: "내부리크 완료일" },
			dataIndex: "내부리크 완료일",
			width: 115,
		},
		{
			title: "내부리크 작업자",
			showSorterTooltip: { title: "내부리크 작업자" },
			dataIndex: "내부리크 작업자",
			width: 115,
		},
		{
			title: "내부리크 횟수",
			showSorterTooltip: { title: "내부리크 횟수" },
			dataIndex: "내부리크 횟수",
			width: 95,
			align: "center",
		},
		{
			title: "외부리크 공정",
			showSorterTooltip: { title: "외부리크 공정" },
			dataIndex: "externalLeakageStatus",
			key: "externalLeakageStatus",
			width: 95,
		},
		{
			title: "외부리크 완료일",
			showSorterTooltip: { title: "외부리크 완료일" },
			dataIndex: "외부리크 완료일",
			width: 115,
		},
		{
			title: "외부리크 작업자",
			showSorterTooltip: { title: "외부리크 작업자" },
			dataIndex: "외부리크 작업자",
			width: 115,
		},
		{
			title: "외부리크 횟수",
			showSorterTooltip: { title: "외부리크 횟수" },
			dataIndex: "외부리크 횟수",
			width: 95,
			align: "center",
		},
		{
			title: "PID교정 공정",
			showSorterTooltip: { title: "PID교정 공정" },
			dataIndex: "pidStatus",
			key: "pidStatus",
			width: 95,
		},
		{
			title: "PID교정 완료일",
			showSorterTooltip: { title: "PID교정 완료일" },
			dataIndex: "PID교정 완료일",
			width: 115,
		},
		{
			title: "PID교정 작업자",
			showSorterTooltip: { title: "PID교정 작업자" },
			dataIndex: "PID교정 작업자",
			width: 115,
		},
		{
			title: "PID교정 횟수",
			showSorterTooltip: { title: "PID교정 횟수" },
			dataIndex: "PID교정 횟수",
			width: 95,
			align: "center",
		},
		{
			title: "케이스조립 공정",
			showSorterTooltip: { title: "케이스조립 공정" },
			dataIndex: "caseStatus",
			key: "caseStatus",
			width: 115,
		},
		{
			title: "케이스조립 완료일",
			showSorterTooltip: { title: "케이스조립 완료일" },
			dataIndex: "케이스조립 완료일",
			width: 115,
		},
		{
			title: "케이스조립 작업자",
			showSorterTooltip: { title: "케이스조립 작업자" },
			dataIndex: "케이스조립 작업자",
			width: 115,
		},
		{
			title: "케이스조립 횟수",
			showSorterTooltip: { title: "케이스조립 횟수" },
			dataIndex: "케이스조립 횟수",
			width: 105,
			align: "center",
		},
		{
			title: "압력교정 공정",
			showSorterTooltip: { title: "압력교정 공정" },
			dataIndex: "pressureStatus",
			key: "pressureStatus",
			width: 95,
		},
		{
			title: "압력교정 완료일",
			showSorterTooltip: { title: "압력교정 완료일" },
			dataIndex: "압력교정 완료일",
			width: 115,
		},
		{
			title: "압력교정 작업자",
			showSorterTooltip: { title: "압력교정 작업자" },
			dataIndex: "압력교정 작업자",
			width: 115,
		},
		{
			title: "압력교정 횟수",
			showSorterTooltip: { title: "압력교정 횟수" },
			dataIndex: "압력교정 횟수",
			width: 95,
			align: "center",
		},
		{
			title: "유량교정 공정",
			showSorterTooltip: { title: "유량교정 공정" },
			dataIndex: "calibrateStatus",
			key: "calibrateStatus",
			width: 95,
		},
		{
			title: "유량교정 완료일",
			showSorterTooltip: { title: "유량교정 완료일" },
			dataIndex: "유량교정 완료일",
			width: 115,
		},
		{
			title: "유량교정 작업자",
			showSorterTooltip: { title: "유량교정 작업자" },
			dataIndex: "유량교정 작업자",
			width: 115,
		},
		{
			title: "유량교정 횟수",
			showSorterTooltip: { title: "유량교정 횟수" },
			dataIndex: "유량교정 횟수",
			width: 95,
			align: "center",
		},
		{
			title: "비율제어 공정",
			showSorterTooltip: { title: "비율제어 공정" },
			dataIndex: "ratioStatus",
			key: "ratioStatus",
			width: 95,
		},
		{
			title: "비율제어 완료일",
			showSorterTooltip: { title: "비율제어 완료일" },
			dataIndex: "비율제어 완료일",
			width: 115,
		},
		{
			title: "비율제어 작업자",
			showSorterTooltip: { title: "비율제어 작업자" },
			dataIndex: "비율제어 작업자",
			width: 115,
		},
		{
			title: "비율제어 횟수",
			showSorterTooltip: { title: "비율제어 횟수" },
			dataIndex: "비율제어 횟수",
			width: 95,
			align: "center",
		},
		{
			title: "PI교정 공정",
			showSorterTooltip: { title: "PI교정 공정" },
			dataIndex: "piStatus",
			key: "piStatus",
			width: 95,
		},
		{
			title: "PI교정 완료일",
			showSorterTooltip: { title: "PI교정 완료일" },
			dataIndex: "PI교정 완료일",
			width: 95,
		},
		{
			title: "PI교정 작업자",
			showSorterTooltip: { title: "PI교정 작업자" },
			dataIndex: "PI교정 작업자",
			width: 95,
		},
		{
			title: "PI교정 횟수",
			showSorterTooltip: { title: "PI교정 횟수" },
			dataIndex: "PI교정 횟수",
			width: 85,
			align: "center",
		},
		{
			title: "포장 공정",
			showSorterTooltip: { title: "포장 공정" },
			dataIndex: "packingStatus",
			key: "packingStatus",
			sorter: (a, b) => stringSorter(a, b, "packingProcess"),
			sortOrder:
				sortedInfo.columnKey === "packingProcess" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "포장 완료일",
			showSorterTooltip: { title: "포장 완료일" },
			dataIndex: "packingComplete",
			key: "packingComplete",
			sorter: (a, b) => stringSorter(a, b, "packingComplete"),
			sortOrder:
				sortedInfo.columnKey === "packingComplete" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "포장 작업자",
			showSorterTooltip: { title: "포장 작업자" },
			dataIndex: "packingWorker",
			key: "packingWorker",
			// sorter: (a, b) => stringSorter(a, b, "packingComplete"),
			// sortOrder:
			// 	sortedInfo.columnKey === "packingComplete" ? sortedInfo.order : null,
			width: 95,
		},
		{
			title: "포장 횟수",
			showSorterTooltip: { title: "포장 횟수" },
			dataIndex: "packingNum",
			key: "packingNum",
			sorter: (a, b) => stringSorter(a, b, "packingNum"),
			sortOrder:
				sortedInfo.columnKey === "packingNum" ? sortedInfo.order : null,
			width: 85,
			align: "center",
		},
		{
			title: "입고 공정",
			showSorterTooltip: { title: "입고 공정" },
			dataIndex: "warehouseStatus",
			key: "warehouseStatus",
			width: 95,
		},
		{
			title: "입고 완료일",
			showSorterTooltip: { title: "입고 완료일" },
			dataIndex: "입고 완료일",
			width: 95,
		},
		{
			title: "입고 작업자",
			showSorterTooltip: { title: "입고 작업자" },
			dataIndex: "입고 작업자",
			width: 95,
		},
		{
			title: "입고 횟수",
			showSorterTooltip: { title: "입고 횟수" },
			dataIndex: "입고 횟수",
			width: 85,
			align: "center",
		},

		// {
		// 	title: "기본검사",
		// 	showSorterTooltip: { title: "기본검사" },
		// 	dataIndex: "basicTest",
		// 	key: "basicTest",
		// 	sorter: (a, b) => stringSorter(a, b, "basicTest"),
		// 	sortOrder: sortedInfo.columnKey === "basicTest" ? sortedInfo.order : null,
		// 	width: 87,
		// },
		// {
		// 	title: "기본검사일",
		// 	showSorterTooltip: { title: "기본검사일" },
		// 	dataIndex: "basicTestDate",
		// 	key: "basicTestDate",
		// 	sorter: (a, b) => stringSorter(a, b, "basicTestDate"),
		// 	sortOrder:
		// 		sortedInfo.columnKey === "basicTestDate" ? sortedInfo.order : null,
		// 	width: 103,
		// },
		// {
		// 	title: "기본검사 횟수",
		// 	showSorterTooltip: { title: "기본검사 횟수" },
		// 	dataIndex: "basicTestNum",
		// 	key: "basicTestNum",
		// 	sorter: (a, b) => stringSorter(a, b, "basicTestNum"),
		// 	sortOrder:
		// 		sortedInfo.columnKey === "basicTestNum" ? sortedInfo.order : null,
		// 	width: 110,
		// 	align: "center",
		// },
		{
			title: "비고",
			showSorterTooltip: { title: "비고" },
			dataIndex: "remark",
			key: "remark",
			sorter: (a, b) => stringSorter(a, b, "remark"),
			sortOrder: sortedInfo.columnKey === "remark" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "영업팀 메모",
			showSorterTooltip: { title: "영업팀 메모" },
			dataIndex: "salesTeamMemo",
			key: "salesTeamMemo",
			sorter: (a, b) => stringSorter(a, b, "salesTeamMemo"),
			sortOrder:
				sortedInfo.columnKey === "salesTeamMemo" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "제조팀 메모",
			showSorterTooltip: { title: "제조팀 메모" },
			dataIndex: "produceTeamMemo",
			key: "produceTeamMemo",
			sorter: (a, b) => stringSorter(a, b, "produceTeamMemo"),
			sortOrder: sortedInfo.columnKey === "produceTeamMemo" ? sortedInfo.order : null,
			width: 160,
		},
		{
			title: "품질팀 메모",
			showSorterTooltip: { title: "품질팀 메모" },
			dataIndex: "qcTeamMemo",
			key: "qcTeamMemo",
			sorter: (a, b) => stringSorter(a, b, "qcTeamMemo"),
			sortOrder:
				sortedInfo.columnKey === "qcTeamMemo" ? sortedInfo.order : null,
			width: 160,
		},
	];
}
