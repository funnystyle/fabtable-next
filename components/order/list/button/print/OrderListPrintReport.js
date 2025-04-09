// pages/order/create/index.js
import React, { useState } from "react";
import OrderListPrintLabelRadio from "@components/order/list/button/print/OrderListPrintLabelRadio";
import { orderListPrintLabelRadioData } from "@components/order/list/button/print/data/orderListPrintLabelRadioData";
import OrderListPrintLabelRadioSelect from "@components/order/list/button/print/OrderListPrintLabelRadioSelect";
import OrderListPrintLabelTitle from "@components/order/list/button/print/OrderListPrintLabelTitle";
import { Button, Flex, Form, Select } from "antd";

const OrderListPrintReport = ({form}) => {

	const [selectedOption, setSelectedOption] = useState("select3"); // ✅ 선택된 양식 종류 상태

	const handleReset = () => {
		form.resetFields();
		setSelectedOption("select3"); // 선택된 값 업데이트
	}

	return (
		<>
			<Flex align="center" gap={4} className="tit-area">
				<p className="tit-type no-bullet">양식 선택</p>

				<Button type="link" className="btn-reset-txt" onClick={() => handleReset()}>
					설정 초기화
				</Button>
			</Flex>

			<Form.Item>
				<Select
					showSearch
					allowClear
					filterOption={(input, option) =>
						(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
					}
					value={selectedOption}
					onChange={(value) => setSelectedOption(value)}
					options={[
						{
							value: "select3",
							label: "mkp-calibration-ko-A",
						},
						{
							value: "select4",
							label: "mkp-calibration-ko-B",
						},
						{
							value: "select5",
							label: "mkp-calibration-ko-C",
						},
						{
							value: "select6",
							label:
								"mkp-calibrationcalibrationcalibrationcalibration ...",
						},
					]}
				/>
			</Form.Item>
		</>
	);
};

export default OrderListPrintReport;
