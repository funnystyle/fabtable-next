import React from "react";
import { Button, Flex, Table, Tooltip, Input, Select, Checkbox } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ProduceUnfitDetail = () => {
	// 테이블
	const columns = [
		{
			title: "타이틀",
			dataIndex: "title1",
			rowScope: "row",
			width: "134px",
			align: "left",
		},
		{
			title: "입력",
			dataIndex: "input1",
			onCell: (record) => {
				if (record.key === "4") {
					return {
						colSpan: 3,
					};
				}
				return {};
			},
			render: (text, record) => {
				if (record.key === "4") {
					return (
						<div className="data-input-area select">
							<TextArea rows={4} />
						</div>
					);
				}
				return text;
			},
		},
		{
			title: "타이틀",
			dataIndex: "title2",
			rowScope: "row",
			width: "134px",
			align: "left",
			onCell: (record) => {
				if (record.key === "4") {
					return {
						colSpan: 0,
					};
				}
				return {};
			},
		},
		{
			title: "입력",
			dataIndex: "input2",
			onCell: (record) => {
				if (record.key === "4") {
					return {
						colSpan: 0,
					};
				}
				return {};
			},
		},
	];
	const data = [
		{
			key: "1",
			title1: (
				<Tooltip
					title="발생공정"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>발생공정</span>
				</Tooltip>
			),
			input1: "최종검사",
			title2: (
				<Tooltip
					title="발생일자"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>발생일자</span>
				</Tooltip>
			),
			input2: (
				<Tooltip
					title="2024-11-13"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
					placement="left"
				>
					<span>2024-11-13</span>
				</Tooltip>
			),
		},
		{
			key: "2",
			title1: (
				<Tooltip
					title="가입자"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>가입자</span>
				</Tooltip>
			),
			input1: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="목록 선택"
						options={[
							{ value: "1", label: "Jack" },
							{ value: "2", label: "Lucy" },
							{ value: "3", label: "Tom" },
						]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			title2: (
				<Tooltip
					title="불량상태 판정"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>불량상태 판정</span>
				</Tooltip>
			),
			input2: "-",
		},
		{
			key: "3",
			title1: (
				<Tooltip
					title="불량구분(대분류)"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>불량구분(대분류)</span>
				</Tooltip>
			),
			input1: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="목록 선택"
						options={[{ value: "1", label: "-" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			title2: (
				<Tooltip
					title="불량구분(중분류)"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>불량구분(중분류)</span>
				</Tooltip>
			),
			input2: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="목록 선택"
						options={[{ value: "1", label: "-" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
		},
		{
			key: "4",
			title1: (
				<Tooltip
					title="불량내용"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>불량내용</span>
				</Tooltip>
			),
			input1: "",
			title2: "",
			input2: "",
		},
	];

	return (
		<div className="tab-content-in top-h">
			<div className="box-info-wrap bd-b0">
				<div className="box-info-area">
					<Flex
						align="center"
						justify="space-between"
						className="title-box-area"
					>
						<Flex gap={8}>
							<p className="title-box">부적합 등록 및 상세 정보</p>

							<Checkbox>Rework 결정</Checkbox>
						</Flex>

						<Flex gap={4}>
							<Button type="text" className="btn-all-reset">
								초기화
							</Button>

							<Button
								variant="outlined"
								size="small"
								icon={<CheckOutlined />}
								iconPosition="end"
							>
								저장
							</Button>

							<Button
								variant="outlined"
								size="small"
								icon={<DeleteOutlined />}
								iconPosition="end"
							>
								삭제
							</Button>
						</Flex>
					</Flex>

					<div>
						<Table
							columns={columns}
							dataSource={data}
							pagination={false}
							showHeader={false}
							className="input-tb"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProduceUnfitDetail;
