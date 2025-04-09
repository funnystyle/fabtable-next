import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useSetRecordMemo } from "@components/api/useSetRecordMemo";

const { TextArea } = Input;

const OrderTotalPopupMemo = ({ data }) => {

	const { recordMemoUpdate } = useSetRecordMemo();

	// 메모 저장
	const [salesTeamMemo, setSalesTeamMemo] = useState("");
	const [produceTeamMemo, setProduceTeamMemo] = useState("");
	const [qcTeamMemo, setQcTeamMemo] = useState("");

	const onClick = (id, salesTeamMemo, produceTeamMemo, qcTeamMemo) => {
		recordMemoUpdate([id], salesTeamMemo, produceTeamMemo, qcTeamMemo);
	}

	useEffect(() => {
		if (data) {
			setSalesTeamMemo(data.salesTeamMemo || "");
			setProduceTeamMemo(data.produceTeamMemo || "");
			setQcTeamMemo(data.qcTeamMemo || "");
		}
	}, [data]);

	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">부서별 메모</p>

				<p>
					{/* <Button icon={<SettingOutlined />} size="small" /> */}
				</p>
			</Flex>

			<div className="order-info-wrap">
				<Form.Item label="영업팀 메모">
					<TextArea rows={5} value={salesTeamMemo} onChange={(e) => setSalesTeamMemo(e.target.value)} />
				</Form.Item>

				<Form.Item label="생산팀 메모">
					<TextArea rows={5} value={produceTeamMemo} onChange={(e) => setProduceTeamMemo(e.target.value)} />
				</Form.Item>

				<Form.Item label="품질팀 메모">
					<TextArea rows={5} value={qcTeamMemo} onChange={(e) => setQcTeamMemo(e.target.value)} />
				</Form.Item>

				<Flex justify="flex-end">
					<Button type="primary" style={{ width: "84px" }} onClick={() => onClick(data?.id, salesTeamMemo, produceTeamMemo, qcTeamMemo)}>
						메모 저장
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default OrderTotalPopupMemo;
