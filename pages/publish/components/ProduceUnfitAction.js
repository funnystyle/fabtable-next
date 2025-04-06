import React, { useState } from "react";
import {
	Button,
	Flex,
	Table,
	Tooltip,
	Input,
	Select,
	DatePicker,
	InputNumber,
} from "antd";
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import dayjs from "dayjs";

const ProduceUnfitAction = () => {
	const [selectionType, setSelectionType] = useState("checkbox");

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
				if (record.key === "3" || record.key === "4") {
					return {
						colSpan: 3,
					};
				}
				return {};
			},
			render: (text, record) => {
				if (record.key === "4") {
					return (
						<div className="data-input-area">
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
				if (record.key === "3" || record.key === "4") {
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
				if (record.key === "3" || record.key === "4") {
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
					title="조치공정"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>조치공정</span>
				</Tooltip>
			),
			input1: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="조치공정 선택"
						options={[{ value: "1", label: "조립공정" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			title2: (
				<Tooltip
					title="조치일자"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>조치일자</span>
				</Tooltip>
			),
			input2: (
				<div className="data-input-area select">
					<DatePicker />
				</div>
			),
		},
		{
			key: "2",
			title1: (
				<Tooltip
					title="작업자"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>작업자</span>
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
					title="부적합 처리상태"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>부적합 처리상태</span>
				</Tooltip>
			),
			input2: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="처리상태 선택"
						options={[
							{ value: "1", label: "처리대기" },
							{ value: "2", label: "처리완료" },
						]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
		},
		{
			key: "3",
			title1: (
				<Tooltip
					title="조치구분"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>조치구분</span>
				</Tooltip>
			),
			input1: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="조치구분 선택"
						options={[{ value: "1", label: "재조립" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			title2: "",
			input2: "",
		},
		{
			key: "4",
			title1: (
				<Tooltip
					title="조치내용"
					color="#FFFBE6"
					overlayInnerStyle={{ color: "rgba(0, 0, 0, 0.88)" }}
				>
					<span>조치내용</span>
				</Tooltip>
			),
			input1: "",
			title2: "",
			input2: "",
		},
	];

	const partscolumns = [
		{
			title: "분류 1",
			dataIndex: "category1",
		},
		{
			title: "분류 2",
			dataIndex: "category2",
		},
		{
			title: "자체품번",
			dataIndex: "itemNum",
		},
		{
			title: "수량",
			dataIndex: "itemAmount",
			width: "55px",
		},
	];

	const partsdata = [
		{
			key: "1",
			category1: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="분류1 선택"
						options={[{ value: "1", label: "-" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			category2: "-",
			itemNum: (
				<div className="data-input-area">
					<Input placeholder="품번" />
				</div>
			),
			itemAmount: (
				<div className="data-input-area">
					<InputNumber placeholder="수량" />
				</div>
			),
		},
		{
			key: "2",
			category1: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="분류1 선택"
						options={[{ value: "1", label: "-" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			category2: (
				<div className="data-input-area select">
					<Select
						showSearch
						placeholder="분류2 선택"
						options={[{ value: "1", label: "-" }]}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			),
			itemNum: (
				<div className="data-input-area">
					<Input placeholder="품번" />
				</div>
			),
			itemAmount: (
				<div className="data-input-area">
					<InputNumber placeholder="수량" />
				</div>
			),
		},
	];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				"selectedRows: ",
				selectedRows
			);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disabled User", // Column configuration not to be checked
			name: record.name,
		}),
	};

	return (
		<div className="tab-content-in top-h action-area">
			<div className="box-info-wrap bd-b0">
				<div className="box-info-area">
					<Flex
						align="center"
						justify="space-between"
						className="title-box-area"
					>
						<p className="title-box">조치사항 등록 및 상세 정보</p>

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

					<Table
						columns={columns}
						dataSource={data}
						pagination={false}
						showHeader={false}
						className="input-tb"
					/>

					<Flex
						align="center"
						justify="space-between"
						className="title-box-area"
					>
						<p className="title-box">교체 Parts 정보</p>

						<Flex gap={4}>
							<Button type="text" className="btn-all-reset">
								초기화
							</Button>

							<Button
								variant="outlined"
								size="small"
								icon={<PlusOutlined />}
								iconPosition="end"
							>
								행 추가
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

					<Table
						rowSelection={Object.assign({ type: selectionType }, rowSelection)}
						columns={partscolumns}
						dataSource={partsdata}
						pagination={false}
						size="small"
						className="input-tb"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProduceUnfitAction;
