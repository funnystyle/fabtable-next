// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import OrderListPrintLabelRadio from "@components/order/list/button/print/OrderListPrintLabelRadio";
import { orderListPrintLabelRadioData } from "@components/order/list/button/print/data/orderListPrintLabelRadioData";
import OrderListPrintLabelRadioSelect from "@components/order/list/button/print/OrderListPrintLabelRadioSelect";
import OrderListPrintLabelTitle from "@components/order/list/button/print/OrderListPrintLabelTitle";
import { useWatch } from "antd/es/form/Form";
import useDrawerStore from "@/store/useDrawerStore";
import useTableSelectKeysOrderListStore from "@/store/useTableSelectKeysOrderListStore";

const OrderListPrintLabel = ({form, keyStore}) => {

	const { selectedRowKeys, datas } = keyStore();
	const { setLabelContent } = useDrawerStore();

	const [selectedLabel, setSelectedLabel] = useState("radio1-1"); // ✅ 선택된 라벨 종류 상태

	const allValues = useWatch([], form);

  useEffect(() => {
    if (!allValues) return;
    const selectedRadios = Object.entries(allValues)
      .filter(([key]) => key.startsWith("radio"));
		
		console.log("selectedRadios", selectedRadios);

		// radio1-1 : radio1-

		
		console.log("datas", datas);

		const html = datas.map((item) => {
			var labelHtml = "";
			// radio1-1 또는 radio1-2인 경우 : 라벨 1 출력
			if (selectedLabel === "radio1-1" || selectedLabel === "radio1-2") {

				let length1Option = 1;
				// radio1-1-1 인 경우 : 54.5mm
				if (selectedRadios.some((item) => item.includes("radio1-1-1"))) {
					length1Option = 1;
				}
				// radio1-1-2 인 경우 : 51mm
				if (selectedRadios.some((item) => item.includes("radio1-1-2"))) {
					length1Option = 2;
				}

				labelHtml += `<div style="border: 1px solid black; padding: 1mm; font-size: 2mm; text-align: left; width: 25mm; line-height: ${length1Option === 2 ? 3 : 3.3}mm; height: ${length1Option === 2 ? 51 : 54.5}mm;">`;
				labelHtml += `<div><img src="/images/mkp-logo.png" alt="Logo" style="width: 16mm; height: auto;" /></div>`;
				labelHtml += `<div>엠케이피(주)</div>`;
				labelHtml += `<div style="border: 1px solid black; font-size:3.5mm; padding: 1mm 0;" text-align: center;><span>${item.productCategory || ""}${item.productModel || ""}</span></div>`;
				labelHtml += `<div>Model : ${item.productCategory || ""}${item.subModelName || ""}</div>`;
				labelHtml += `<div>Customer Code : </div>`;
				labelHtml += `<div>&nbsp;&nbsp;[${item.customerCode || ""}]</div>`;
				labelHtml += `<div>Serial Number : </div>`;
				labelHtml += `<div>&nbsp;&nbsp;${item.serialNumber || ""}</div>`;
				if (item.mgmrType === "A") {
					labelHtml += `<div>MGMR Type : ${item.mgmrType || ""}</div>`;
				}
				labelHtml += `<div>Gas : ${item.Fluid || ""}</div>`;
				labelHtml += `<div>Flowrate : ${item.flowrate || ""} ${item.flowrateUnit || ""}</div>`;
				labelHtml += `<div>Power & Signal :</div>`;
				if (item.cummunication == "RS485 & Ananlog") {
					labelHtml += `<div>&nbsp;&nbsp;+15 ~ 24V / RS485</div>`;
				} else {
					labelHtml += `<div>&nbsp;&nbsp;+24V / ${item.cummunication || ""}</div>`;
				}
				labelHtml += `<div>Working Pressure :</div>`;
				labelHtml += `<div>&nbsp;&nbsp;${item.minimumPressure || ""} ~ ${item.maximumPressure || ""} ${item.pressureUnit === "PSI" ? "psig" : item.pressureUnit || ""}</div>`;
				labelHtml += `</div>`;
			}
			// radio1-1 또는 radio1-3인 경우 : 라벨 2 출력
			if (selectedLabel === "radio1-1" || selectedLabel === "radio1-3") {

				let asOption = 1;
				// radio2-1-1 인 경우 : 한국(동탄)
				if (selectedRadios.some((item) => item.includes("radio2-1-1"))) {
					asOption = 1;
				}
				// radio2-1-2 인 경우 : 중국(상해)
				if (selectedRadios.some((item) => item.includes("radio2-1-2"))) {
					asOption = 2;
				}

				let directionOption = 1;
				// radio2-2-1 인 경우 : 정방향 (<-)
				if (selectedRadios.some((item) => item.includes("radio2-2-1"))) {
					directionOption = 1;
				}
				// radio2-2-2 인 경우 : 역방향 (->)
				if (selectedRadios.some((item) => item.includes("radio2-2-2"))) {
					directionOption = 2;
				}

				labelHtml += `<div style="border: 1px solid black; padding: 1mm; font-size: 2mm; text-align: left; width: 25mm; line-height: 3mm;>`;
				labelHtml += `<div>${directionOption === 2 ? "→" : "←" }</div>`;
				labelHtml += `</div>`;


			}
			// radio1-1 또는 radio1-4인 경우 : 라벨 3 출력
			if (selectedLabel === "radio1-1" || selectedLabel === "radio1-4") {
				let length3Option = 1;
				// radio3-1-1 인 경우 : 11.5mm
				if (selectedRadios.some((item) => item.includes("radio3-1-1"))) {
					length3Option = 1;
				}
				// radio3-1-2 인 경우 : 14.5mm
				if (selectedRadios.some((item) => item.includes("radio3-1-2"))) {
					length3Option = 2;
				}
				// radio3-2-1 인 경우 : 8.5mm
				if (selectedRadios.some((item) => item.includes("radio3-1-3"))) {
					length3Option = 3;
				}

				labelHtml += `<div style="border: 1px solid black; padding: 1mm; font-size: 2mm; text-align: left; width: 25mm; line-height: ${length3Option === 2 ? 3 : length3Option === 3 ? 2.5 : 3.3}mm; height: ${length3Option === 2 ? 14.5 : length3Option === 3 ? 8.5 : 11.5}mm;">`;
				labelHtml += `<div>Gas : ${item.Fluid || ""}</div>`;
				labelHtml += `<div>Range : ${item.flowrate || ""} ${item.flowrateUnit || ""}</div>`;
				labelHtml += `<div>S/N : ${item.serialNumber || ""}</div>`;
				labelHtml += `</div>`;
			}
			return labelHtml;
		});

    setLabelContent(html);
		console.log("html", html);
  }, [allValues]);

	return (
		<>
			<OrderListPrintLabelTitle form={form} setSelectedLabel={setSelectedLabel} />

			<OrderListPrintLabelRadioSelect setSelectedLabel={setSelectedLabel} />

			{/* 선택된 라벨에 따라 규격 표시 */}
			{(selectedLabel === "radio1-1" || selectedLabel === "radio1-2") && (
				<OrderListPrintLabelRadio list={orderListPrintLabelRadioData[0]} index={0}/>
			)}

			{(selectedLabel === "radio1-1" || selectedLabel === "radio1-3") && (
				<OrderListPrintLabelRadio list={orderListPrintLabelRadioData[1]} index={1}/>
			)}

			{/* 선택된 라벨에 따라 규격 표시 */}
			{(selectedLabel === "radio1-1" || selectedLabel === "radio1-4") && (
				<OrderListPrintLabelRadio list={orderListPrintLabelRadioData[2]} index={2}/>
			)}
		</>
	);
};

export default OrderListPrintLabel;
