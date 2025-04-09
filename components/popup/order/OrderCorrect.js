import React from "react";
import { Button, Flex, Tooltip, Tabs, Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const OrderCorrect = () => {
	/* 유량교정 정보 테이블 */
	const flowrateColumn = [
		{
			title: "title",
			dataIndex: "title",
			key: "title",
			rowScope: "row",
			width: "50%",
		},
		{
			title: "info",
			dataIndex: "info",
			key: "info",
			width: "50%",
		},
	];

	const flowrateData = [
		{
			key: "1",
			title: "몰박스 S/N",
			info: "2707",
		},
		{
			key: "2",
			title: "몰블럭 S/N",
			info: "6612",
		},
		{
			key: "3",
			title: "몰블럭 Range",
			info: "5.000slm",
		},
	];

	const flowrateInfoColumn = [
		{
			title: "유량교정 %",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
			width: "25%",
		},
		{
			title: "Set Value",
			dataIndex: "value",
			key: "value",
			rowScope: "row",
			width: "25%",
		},
		{
			title: "측정값 (sccm)",
			dataIndex: "correction",
			key: "correction",
			width: "25%",
		},
		{
			title: "에러(%)",
			dataIndex: "error",
			key: "error",
			width: "25%",
		},
	];

	const flowrateInfoData = [
		{
			key: "1",
			division: "유량교정 5%",
			value: "50.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "2",
			division: "유량교정 10%",
			value: "100.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "3",
			division: "유량교정 20%",
			value: "200.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "4",
			division: "유량교정 30%",
			value: "300.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "5",
			division: "유량교정 40%",
			value: "400.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "6",
			division: "유량교정 50%",
			value: "500.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "7",
			division: "유량교정 60%",
			value: "600.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "8",
			division: "유량교정 70%",
			value: "700.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "9",
			division: "유량교정 80%",
			value: "800.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "10",
			division: "유량교정 90%",
			value: "900.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "11",
			division: "유량교정 100%",
			value: "1000.000",
			correction: "149.565",
			error: "0.029",
		},
	];

	const pressureInfoColumn = [
		{
			title: "압력교정 %",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
			width: "25%",
		},
		{
			title: "Set Value",
			dataIndex: "value",
			key: "value",
			rowScope: "row",
			width: "25%",
		},
		{
			title: "교정값",
			dataIndex: "correction",
			key: "correction",
			width: "25%",
		},
		{
			title: "에러(%)",
			dataIndex: "error",
			key: "error",
			width: "25%",
		},
	];

	const pressureInfoData = [
		{
			key: "1",
			division: "압력교정 5%",
			value: "50.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "2",
			division: "압력교정 10%",
			value: "100.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "3",
			division: "압력교정 20%",
			value: "200.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "4",
			division: "압력교정 30%",
			value: "300.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "5",
			division: "압력교정 40%",
			value: "400.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "6",
			division: "압력교정 50%",
			value: "500.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "7",
			division: "압력교정 60%",
			value: "600.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "8",
			division: "압력교정 70%",
			value: "700.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "9",
			division: "압력교정 80%",
			value: "800.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "10",
			division: "압력교정 90%",
			value: "900.000",
			correction: "149.565",
			error: "0.029",
		},
		{
			key: "11",
			division: "압력교정 100%",
			value: "1000.000",
			correction: "149.565",
			error: "0.029",
		},
	];

	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">교정정보</p>

				<p>
					{/* <Button icon={<SettingOutlined />} size="small" /> */}
				</p>
			</Flex>

			<Tabs defaultActiveKey="2-1" type="card" className="tab-round-sm w100">
				<TabPane tab="유량교정" key="1-1">
					<Flex className="order-info-wrap">
						<div>
							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="유량교정 방식">
										<span>유량교정 방식</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="자동">
										<span>자동</span>
									</Tooltip>
								</div>
							</Flex>

							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="교정파일업로드 유무">
										<span>교정파일업로드 유무</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="Y">
										<span>Y</span>
									</Tooltip>
								</div>
							</Flex>

							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="유량교정자">
										<span>유량교정자</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="김미미">
										<span>김미미</span>
									</Tooltip>
								</div>
							</Flex>

							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="유량교정일">
										<span>유량교정일</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="2025-08-17   17:00">
										<span>2025-08-17 17:00</span>
									</Tooltip>
								</div>
							</Flex>
						</div>
					</Flex>

					<div className="box-info-wrap" style={{ marginTop: "8px" }}>
						<div className="box-info-area">
							<Flex
								align="center"
								justify="space-between"
								className="title-box-area"
							>
								<p className="title-box">유량교정</p>

								{/* <Button icon={<SettingOutlined />} size="small" /> */}
							</Flex>

							<div>
								<Table
									dataSource={flowrateData}
									columns={flowrateColumn}
									pagination={false}
									size="small"
									showHeader={false}
								/>

								<Table
									dataSource={flowrateInfoData}
									columns={flowrateInfoColumn}
									pagination={false}
									size="small"
									className="th-center"
								/>
							</div>
						</div>
					</div>
				</TabPane>

				<TabPane tab="압력교정" key="1-2">
					<Flex className="order-info-wrap">
						<div>
							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="유량교정 방식">
										<span>압력교정 방식</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="자동">
										<span>자동</span>
									</Tooltip>
								</div>
							</Flex>

							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="교정파일업로드 유무">
										<span>교정파일업로드 유무</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="Y">
										<span>Y</span>
									</Tooltip>
								</div>
							</Flex>

							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="압력교정자">
										<span>압력교정자</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="김미미">
										<span>김미미</span>
									</Tooltip>
								</div>
							</Flex>

							<Flex align="center" className="order-info-area">
								<div className="title-order-info">
									<Tooltip title="압력교정일">
										<span>압력교정일</span>
									</Tooltip>
								</div>

								<div className="txt-order-info">
									<Tooltip title="2025-08-17   17:00">
										<span>2025-08-17 17:00</span>
									</Tooltip>
								</div>
							</Flex>
						</div>
					</Flex>

					<div className="box-info-wrap" style={{ marginTop: "8px" }}>
						<div className="box-info-area">
							<Flex
								align="center"
								justify="space-between"
								className="title-box-area"
							>
								<p className="title-box">압력교정</p>

								{/* <Button icon={<SettingOutlined />} size="small" /> */}
							</Flex>

							<div>
								<Table
									dataSource={pressureInfoData}
									columns={pressureInfoColumn}
									pagination={false}
									size="small"
									className="th-center"
								/>
							</div>
						</div>
					</div>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default OrderCorrect;
