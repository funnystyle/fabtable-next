import React from "react";
import { Button, Flex, Table, Badge } from "antd";
import {
	PlusOutlined,
	DownloadOutlined,
	CheckOutlined,
} from "@ant-design/icons";

const ProduceUnfit = () => {
	// 테이블
	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
			width: 49,
		},
		{
			title: "발생일자",
			dataIndex: "date",
			key: "date",
			width: 100,
		},
		{
			title: "발생공정",
			dataIndex: "process",
			key: "process",
		},
		{
			title: "불량구분(대분류)",
			dataIndex: "poorDivideLarge",
			key: "poorDivideLarge",
			width: 150,
		},
		{
			title: "불량구분(중분류)",
			dataIndex: "poorDivideMid",
			key: "poorDivideMid",
			width: 150,
		},
		{
			title: "불량내용",
			dataIndex: "poorContent",
			key: "poorContent",
			width: 150,
		},
		{
			title: "조치공정",
			dataIndex: "handleProcess",
			key: "handleProcess",
			width: 100,
		},
		{
			title: "조치구분",
			dataIndex: "handleDivide",
			key: "handleDivide",
			width: 100,
		},
		{
			title: "조치내용",
			dataIndex: "handleContent",
			key: "handleContent",
			width: 150,
		},
		{
			title: "조치일자",
			dataIndex: "handleDate",
			key: "handleDate",
			width: 100,
		},
		{
			title: "부적합 처리상태",
			dataIndex: "unfitState",
			key: "unfitState",
			width: 120,
		},
	];

	const data = [
		{
			key: "1",
			no: 1,
			date: "2024-11-15",
			process: "최종검사",
			poorDivideLarge: "Flow Accuracy 불량",
			poorDivideMid: "2차 유량검증",
			poorContent: "10% 구간 Fail",
			handleProcess: "-",
			handleDivide: "-",
			handleContent: "-",
			handleDate: "2024-01-01",
			unfitState: (
				<div>
					<Badge
						text="처리대기"
						status="error"
						className="packing-bedge"
						style={{
							color: "#FF4D4F",
						}}
					/>

					<Badge
						count={<CheckOutlined />}
						text="처리완료"
						className="packing-bedge complete"
					/>
				</div>
			),
		},
	];

	return (
		<div className="tab-content-in top-h">
			<div className="box-info-wrap">
				<div className="box-info-area">
					<Flex
						align="center"
						justify="space-between"
						className="title-box-area"
					>
						<p className="title-box">부적합 발생 이력</p>

						<Flex gap={4}>
							<Button
								variant="outlined"
								size="small"
								icon={<PlusOutlined />}
								iconPosition="end"
							>
								부적합 추가
							</Button>

							<Button
								variant="outlined"
								size="small"
								icon={<DownloadOutlined />}
								iconPosition="end"
							>
								엑셀다운로드
							</Button>
						</Flex>
					</Flex>

					<div>
						<Table
							columns={columns}
							dataSource={data}
							pagination={false}
							size="small"
							className="th-center"
							scroll={{
								x: "max-content",
								y: "calc(100vh - 256px)",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProduceUnfit;
