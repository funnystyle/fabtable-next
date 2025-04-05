// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import OrderListPrintLabelRadio from "@components/order/list/button/print/OrderListPrintLabelRadio";
import { orderListPrintLabelRadioData } from "@components/order/list/button/print/data/orderListPrintLabelRadioData";
import OrderListPrintLabelRadioSelect from "@components/order/list/button/print/OrderListPrintLabelRadioSelect";
import OrderListPrintLabelTitle from "@components/order/list/button/print/OrderListPrintLabelTitle";
import { useWatch } from "antd/es/form/Form";
import useDrawerStore from "@/store/useDrawerStore";

const OrderListPrintLabel = ({form}) => {

	const { setLabelContent } = useDrawerStore();

	const [selectedLabel, setSelectedLabel] = useState("radio1-1"); // ✅ 선택된 라벨 종류 상태

	const allValues = useWatch([], form);

  useEffect(() => {
    if (!allValues) return;
    const selectedRadios = Object.entries(allValues)
      .filter(([key]) => key.startsWith("radio"));
		
		console.log("selectedRadios", selectedRadios);

		// radio1-1 : radio1-

		
    setLabelContent(`<div class="label-content"></div>`);
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
