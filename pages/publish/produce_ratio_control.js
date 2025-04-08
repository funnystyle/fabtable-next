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

const productData = [
	{
		key: "1",
		title: "시리얼 번호",
		info: "530240902012",
	},
	{
		key: "2",
		title: "제조 번호",
		info: "A24-000019",
	}
]

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
/* //몰박스 정보 테이블 */


const ProducePopComponent = () => {
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
			width: "200px",
		},
		{
			title: "info",
			dataIndex: "info",
			key: "info",
			// width: "50%",
		},
	];

	const productColumn = [
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
			title: "Set",
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
			title: "측정값(sccm)",
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
	/* //몰박스 정보 테이블 */

	return (
		<div className="system-popup-wrap">
			<Flex
				align="center"
				justify="space-between"
				className="system-title-area"
			>
				<Title level={3} className="title-page">
					비율제어 정보
				</Title>

				{/* 일체형인 경우만 노출 */}
				<Flex
					align="center"
					justify="space-between"
					className="control-info-area"
				>
					<p>530240902012</p> 
					<p>A24-00019</p>
					<p>MARU 7001</p>
				</Flex>
				{/* // 일체형인 경우만 노출 */}
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
						<Flex className="box-info-wrap">
							
							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">Molbox 정보</p>

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
								</div>
							</div>

						</Flex>

						{/* 분리형인 경우 */}
						{/* 2채널 : 한 줄에 2개 */}
						{/* 3채널 : 한 줄에 3개 */}
						{/* 4채널 : 한 줄에 2개씩 2줄 */}
						{/* 5채널 : 첫 줄에 3개씩 두번째 줄에 2개, 단 두번째 줄 빈 3번째 칸 있어야 함 (세로선이 맞도록) */}
						{/* 6채널 : 한 줄에 3개씩 2줄 */}
						<Flex className="box-info-wrap">
							
							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">1CH</p> {/* 일체형 */}
									{/* <p className="title-box">Master</p> 분리형 */}

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									{/* 분리형인 경우만 노출 */}
									<Table
										dataSource={productData}
										columns={productColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>
									{/* // 분리형인 경우만 노출 */}

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
									<p className="title-box">2CH</p> {/* 일체형 */}
									{/* <p className="title-box">Slave#1</p> 분리형 */}

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									{/* 분리형인 경우만 노출 */}
									<Table
										dataSource={productData}
										columns={productColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>
									{/* // 분리형인 경우만 노출 */}

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
									<p className="title-box">3CH</p> {/* 일체형 */}
									{/* <p className="title-box">Slave#2</p> 분리형 */}

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									{/* 분리형인 경우만 노출 */}
									<Table
										dataSource={productData}
										columns={productColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>
									{/* // 분리형인 경우만 노출 */}

									<Table
										dataSource={molboxInfoData}
										columns={molboxInfoColumn}
										pagination={false}
										size="small"
										className="th-center"
									/>
								</div>
							</div>
						</Flex>
						<Flex className="box-info-wrap">
							
							<div className="box-info-area">
								<Flex
									align="center"
									justify="space-between"
									className="title-box-area"
								>
									<p className="title-box">4CH</p> {/* 일체형 */}
									{/* <p className="title-box">Slave#3</p> 분리형 */}

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									{/* 분리형인 경우만 노출 */}
									<Table
										dataSource={productData}
										columns={productColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>
									{/* // 분리형인 경우만 노출 */}

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
									<p className="title-box">5CH</p> {/* 일체형 */}
									{/* <p className="title-box">Slave#4</p> 분리형 */}

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div>
									{/* 분리형인 경우만 노출 */}
									<Table
										dataSource={productData}
										columns={productColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>
									{/* // 분리형인 경우만 노출 */}

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
								{/* 5채널인 경우는 이렇게 빈 div 를 넣어야 함 */}
							</div>
						</Flex>
					</div>
				</Space>
			</div>
		</div>
	);
};

ProducePopComponent.getLayout = (page) => page;

export default ProducePopComponent;
