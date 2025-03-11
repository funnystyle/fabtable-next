// pages/product_popup.js
import React, { useEffect } from "react";
import { Flex, Typography, Space, Button, Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
const { Title } = Typography;

/* 몰박스 정보 테이블 */
const molboxData = [
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

const molboxInfoData = [
	{
		key: "1",
		division: "5%",
		value: "50.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "2",
		division: "10%",
		value: "100.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "3",
		division: "20%",
		value: "200.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "4",
		division: "30%",
		value: "300.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "5",
		division: "40%",
		value: "400.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "6",
		division: "50%",
		value: "500.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "7",
		division: "60%",
		value: "600.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "8",
		division: "70%",
		value: "700.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "9",
		division: "80%",
		value: "800.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "10",
		division: "90%",
		value: "900.000",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "11",
		division: "100%",
		value: "1000.000",
		correction: "149.565",
		error: "0.029",
	},
];

const molboxData2 = [
	{
		key: "1",
		info: "2707",
	},
	{
		key: "2",
		info: "6612",
	},
	{
		key: "3",
		info: "5.000slm",
	},
];

const molboxInfoData2 = [
	{
		key: "1",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "2",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "3",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "4",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "5",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "6",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "7",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "8",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "9",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "10",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "11",
		correction: "149.565",
		error: "0.029",
	},
];

const molboxData3 = [
	{
		key: "1",
		info: "2707",
	},
	{
		key: "2",
		info: "6612",
	},
	{
		key: "3",
		info: "5.000slm",
	},
];

const molboxInfoData3 = [
	{
		key: "1",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "2",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "3",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "4",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "5",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "6",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "7",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "8",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "9",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "10",
		correction: "149.565",
		error: "0.029",
	},
	{
		key: "11",
		correction: "149.565",
		error: "0.029",
	},
];
/* //몰박스 정보 테이블 */

/* 제어계수 테이블 */
const controlData = [
	{
		key: "1",
		division: "0",
		control: "0",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "2",
		division: "1",
		control: "10",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "3",
		division: "2",
		control: "20",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "4",
		division: "3",
		control: "30",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "5",
		division: "4",
		control: "40",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "6",
		division: "5",
		control: "50",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "7",
		division: "6",
		control: "60",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "8",
		division: "7",
		control: "70",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "9",
		division: "8",
		control: "80",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "10",
		division: "9",
		control: "90",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
	{
		key: "11",
		division: "10",
		control: "100",
		kp: "0.2",
		ki: "0.2",
		kd: "0.2",
	},
];

const controlData2 = [
	{
		key: "1",
		division: "ControlType",
		value: "149.565",
	},
	{
		key: "2",
		division: "Anti Windup",
		value: "149.565",
	},
	{
		key: "3",
		division: "Valve Init vlot",
		value: "149.565",
	},
	{
		key: "4",
		division: "FS Gain",
		value: "149.565",
	},
	{
		key: "5",
		division: "AD Offset",
		value: "149.565",
	},
];

const controlData3 = [
	{
		key: "1",
		division: "0",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "2",
		division: "1",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "3",
		division: "2",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "4",
		division: "3",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "5",
		division: "4",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "6",
		division: "5",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "7",
		division: "6",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "8",
		division: "7",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "9",
		division: "8",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "10",
		division: "9",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
	{
		key: "11",
		division: "10",
		kq: "1000.00",
		kw: "1000.00",
		ke: "1000.00",
		kr: "1000.00",
	},
];

const controlData4 = [
	{
		key: "1",
		division: "OUT DA0",
		value: "262100.00",
	},
	{
		key: "2",
		division: "OUT DA1",
		value: "262100.00",
	},
	{
		key: "3",
		division: "OUT Volt0",
		value: "262100.00",
	},
	{
		key: "4",
		division: "OUT Volt1",
		value: "262100.00",
	},
	{
		key: "5",
		division: "IN DA0",
		value: "262100.00",
	},
	{
		key: "6",
		division: "IN DA1",
		value: "262100.00",
	},
	{
		key: "7",
		division: "IN Volt0",
		value: "262100.00",
	},
	{
		key: "8",
		division: "IN Volt1",
		value: "262100.00",
	},
	{
		key: "9",
		division: "DA",
		value: "262100.00",
	},
	{
		key: "10",
		division: "AD",
		value: "262100.00",
	},
];

const controlData5 = [
	{
		key: "1",
		division: "0",
		value: "262100.00",
	},
	{
		key: "2",
		division: "10",
		value: "262100.00",
	},
	{
		key: "3",
		division: "20",
		value: "262100.00",
	},
	{
		key: "4",
		division: "30",
		value: "262100.00",
	},
	{
		key: "5",
		division: "40",
		value: "262100.00",
	},
	{
		key: "6",
		division: "50",
		value: "262100.00",
	},
	{
		key: "7",
		division: "60",
		value: "262100.00",
	},
	{
		key: "8",
		division: "70",
		value: "262100.00",
	},
	{
		key: "9",
		division: "80",
		value: "262100.00",
	},
	{
		key: "10",
		division: "90",
		value: "262100.00",
	},
	{
		key: "11",
		division: "100",
		value: "262100.00",
	},
];
/* //제어계수 테이블 */

const producePopComponent = () => {
	useEffect(() => {
		document.documentElement.classList.add("f-html");
		document.body.classList.add("f-body");

		// Cleanup: 페이지가 변경될 때 클래스 제거
		return () => {
			document.documentElement.classList.remove("f-html");
			document.body.classList.remove("f-body");
		};
	}, []);

	/* 몰박스 정보 테이블 */
	const molboxColumn = [
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

	const molboxInfoColumn = [
		{
			title: "구분",
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

	const molboxColumn2 = [
		{
			title: "info",
			dataIndex: "info",
			key: "info",
		},
	];

	const molboxInfoColumn2 = [
		{
			title: "교정값",
			dataIndex: "correction",
			key: "correction",
			width: "50%",
		},
		{
			title: "에러(%)",
			dataIndex: "error",
			key: "error",
			width: "50%",
		},
	];

	const molboxColumn3 = [
		{
			title: "info",
			dataIndex: "info",
			key: "info",
		},
	];

	const molboxInfoColumn3 = [
		{
			title: "교정값",
			dataIndex: "correction",
			key: "correction",
			width: "50%",
		},
		{
			title: "에러(%)",
			dataIndex: "error",
			key: "error",
			width: "50%",
		},
	];
	/* //몰박스 정보 테이블 */

	/* 제어계수 테이블 */
	const controlColumn = [
		{
			title: "구분",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
			width: 40,
		},
		{
			title: "제어(%)",
			dataIndex: "control",
			key: "control",
			rowScope: "row",
			width: 60,
		},
		{
			title: "KP",
			dataIndex: "kp",
			key: "kp",
		},
		{
			title: "KI",
			dataIndex: "ki",
			key: "ki",
		},
		{
			title: "KD",
			dataIndex: "kd",
			key: "kd",
		},
	];

	const controlColumn2 = [
		{
			title: "구분",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
			width: "50%",
		},
		{
			title: "값",
			dataIndex: "value",
			key: "value",
			width: "50%",
		},
	];

	const controlColumn3 = [
		{
			title: "구분",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
		},
		{
			title: "KQ",
			dataIndex: "kq",
			key: "kq",
		},
		{
			title: "KW",
			dataIndex: "kw",
			key: "kw",
		},
		{
			title: "KE",
			dataIndex: "ke",
			key: "ke",
		},
		{
			title: "KR",
			dataIndex: "kr",
			key: "kr",
		},
	];

	const controlColumn4 = [
		{
			title: "구분",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
		},
		{
			title: "값",
			dataIndex: "value",
			key: "value",
			width: "50%",
		},
	];

	const controlColumn5 = [
		{
			title: "구분(%)",
			dataIndex: "division",
			key: "division",
			rowScope: "row",
		},
		{
			title: "값",
			dataIndex: "value",
			key: "value",
			width: "50%",
		},
	];
	/* //제어계수 테이블 */

	return (
		<div className="system-popup-wrap">
			<Flex
				align="center"
				justify="space-between"
				className="system-title-area"
			>
				<Title level={3} className="title-page">
					제어계수 정보
				</Title>

				<Flex
					align="center"
					justify="space-between"
					className="control-info-area"
				>
					<p>530240902012</p>
					<p>A24-00019</p>
					<p>MARU 7001</p>
				</Flex>
			</Flex>

			<div className="popup-contents">
				<Space
					direction="vertical"
					size={16}
					style={{
						width: "100%",
					}}
				>
					<div>
						<Title level={4} className="title-bullet">
							몰박스 정보
						</Title>

						<Flex className="box-info-wrap">
							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">Molbox 교정 정보</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={molboxData}
										columns={molboxColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>

									<Table
										dataSource={molboxInfoData}
										columns={molboxInfoColumn}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>

							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">1차 유량검증</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={molboxData2}
										columns={molboxColumn2}
										pagination={false}
										size="small"
										showHeader={false}
									/>

									<Table
										dataSource={molboxInfoData2}
										columns={molboxInfoColumn2}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>

							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">2차 유량검증</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={molboxData3}
										columns={molboxColumn3}
										pagination={false}
										size="small"
										showHeader={false}
									/>

									<Table
										dataSource={molboxInfoData3}
										columns={molboxInfoColumn3}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>
						</Flex>
					</div>

					<div>
						<Title level={4} className="title-bullet">
							제어계수
						</Title>

						<Flex className="box-info-wrap">
							<div className="box-info-area pid">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">PID 계수 </p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={controlData}
										columns={controlColumn}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>

							<div className="box-info-area variable">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">제어변수</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={controlData2}
										columns={controlColumn2}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>

							<div className="box-info-area control">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">제어 계수</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={controlData3}
										columns={controlColumn3}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>

							<div className="box-info-area analog">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">Analog 계수</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={controlData4}
										columns={controlColumn4}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>

							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">교정 AD값</p>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									<Table
										dataSource={controlData5}
										columns={controlColumn5}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>
						</Flex>
					</div>
				</Space>
			</div>
		</div>
	);
};

producePopComponent.getLayout = (page) => page;

export default producePopComponent;
