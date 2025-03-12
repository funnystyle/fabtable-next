// pages/product_popup.js
import React, { useEffect, useState } from "react";
import { Button, Flex, Space, Table, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import {
	controlColumn,
	controlColumn2,
	controlColumn3,
	controlColumn4,
	controlColumn5,
	controlData,
	controlData2,
	controlData3,
	controlData4,
	controlData5,
	molboxColumn,
	molboxColumn2,
	molboxColumn3,
	molboxData,
	molboxData2,
	molboxData3,
	molboxInfoColumn,
	molboxInfoColumn2,
	molboxInfoColumn3,
	molboxInfoData,
	molboxInfoData2,
	molboxInfoData3
} from "@components/produce-popup/ProducePopupData";

const { Title } = Typography;

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

	const [molbox, setMolbox] = useState(molboxData);
	const [molbox2, setMolbox2] = useState(molboxData2);
	const [molbox3, setMolbox3] = useState(molboxData3);
	const [molboxInfo, setMolboxInfo] = useState(molboxInfoData);
	const [molboxInfo2, setMolboxInfo2] = useState(molboxInfoData2);
	const [molboxInfo3, setMolboxInfo3] = useState(molboxInfoData3);
	const [control, setControl] = useState(controlData);
	const [control2, setControl2] = useState(controlData2);
	const [control3, setControl3] = useState(controlData3);
	const [control4, setControl4] = useState(controlData4);
	const [control5, setControl5] = useState(controlData5);

	const handleListUpdate = (list, updateList, dataKeys, data) => {
		return list.map((item, index) => {
			const updatedItem = { ...item };
			updateList.forEach((stateKey, keyIdx) => {
				const dataKey = dataKeys[keyIdx][index];
				updatedItem[stateKey] = data[dataKey] || "-";
			});
			return updatedItem;
		});
	};

	const [queryKey, setQueryKey] = useState(["record-detail", Math.random()]);
	const { data:recordResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/record/1", {}),
	});
	useEffect(() => {
		if (isSuccess) {
			const data = recordResponse.data;
			setMolbox(prevMolbox => handleListUpdate(prevMolbox, ["info"], [["molboxSerial", "molBlockNumber", "molBlockFlowrate"]], data));
			setMolbox2(prevMolbox => handleListUpdate(prevMolbox, ["info"], [["firstVerifiedMolboxSerial", "firstVerifiedMolBlockNumber", "firstVerifiedMolBlockFlowrate"]], data));
			setMolbox3(prevMolbox => handleListUpdate(prevMolbox, ["info"], [["verifiedMolboxSerial", "verifiedMolBlockNumber", "verifiedMolBlockFlowrate"]], data));

			const numberList = ["05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
			const keyList = ["measuredFlow", "setFlow", "error"];
			setMolboxInfo(prevMolboxInfo => handleListUpdate(prevMolboxInfo, ["value", "correction", "error"], keyList.map(key => numberList.map(num => `${key}${num}`)), data));
			const keyList2 = ["firstVerifiedFlow", "firstVerifiedError"];
			setMolboxInfo2(prevMolboxInfo => handleListUpdate(prevMolboxInfo, ["correction", "error"], keyList2.map(key => numberList.map(num => `${key}${num}`)), data));
			const keyList3 = ["verifiedFlow", "verifiedError"];
			setMolboxInfo3(prevMolboxInfo => handleListUpdate(prevMolboxInfo, ["correction", "error"], keyList3.map(key => numberList.map(num => `${key}${num}`)), data));

			const numberList2 = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"];
			const keyList4 = ["kp", "ki", "kd"];
			setControl(prevControl => handleListUpdate(prevControl, ["kp", "ki", "kd"], keyList4.map(key => numberList2.map(num => `${key}${num}`)), data));

			const keyList4_2 = ["init"];
			setControl2(prevControl => handleListUpdate(prevControl, ["value"], keyList4_2.map(key => numberList2.map(num => `${key}${num}`)), data));

			const keyList5 = ["kq", "kw", "ke", "kr"];
			setControl3(prevControl => handleListUpdate(prevControl, ["kq", "kw", "ke", "kr"], keyList5.map(key => numberList2.map(num => `${key}${num}`)), data));

			const keyList6 = ["analog"];
			setControl4(prevControl => handleListUpdate(prevControl, ["value"], keyList6.map(key => numberList2.map(num => `${key}${num}`)), data));

			const keyList7 = ["ad"];
			setControl5(prevControl => handleListUpdate(prevControl, ["value"], keyList7.map(key => numberList2.map(num => `${key}${num}`)), data));
		}
	}, [isSuccess]);

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
										dataSource={molbox}
										columns={molboxColumn}
										pagination={false}
										size="small"
										showHeader={false}
									/>

									<Table
										dataSource={molboxInfo}
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
										dataSource={molbox2}
										columns={molboxColumn2}
										pagination={false}
										size="small"
										showHeader={false}
									/>

									<Table
										dataSource={molboxInfo2}
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
										dataSource={molbox3}
										columns={molboxColumn3}
										pagination={false}
										size="small"
										showHeader={false}
									/>

									<Table
										dataSource={molboxInfo3}
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
										dataSource={control}
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
										dataSource={control2}
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
										dataSource={control3}
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
										dataSource={control4}
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
										dataSource={control5}
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

ProducePopComponent.getLayout = (page) => page;

export default ProducePopComponent;
