// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, Flex, message, Space, Tag, } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postAxios, putAxios } from "@api/apiClient";
import { CheckOutlined, CloseOutlined, DownOutlined, EditFilled } from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";

const OrderCreateHeaderUpdate = ({ form }) => {

	const { record } = useRecordDataStore();

	const { mutate: updateRecord } = useMutation({
		mutationKey: "updateRecord",
		mutationFn: (values) => putAxios("/user/record", values),
	});

	const handleSubmit = async (event) => {
		const values = await form.validateFields();
		values.ids = [record.id];

		await updateRecord(values);
		message.success('수주 수정이 완료되었습니다!');
	}

	return (
		<div className="top-btn-area">
			{/* 기 등록된 수주 내용 수정시 */}
			<Flex justify="space-between" className="detail-top-area">
				<Flex gap={12}>
					{record.nowState}

					<ul className="product-info">
						<li>{record.oldSerialNumber}</li>
						<li>{record.serialNumber}</li>
					</ul>
				</Flex>

				<Flex align="center" gap={8} className="detail-btn-area">
					<Flex gap={8}>
						<Button icon={<CloseOutlined />} iconPosition={"end"}>
							취소
						</Button>
						<Button
							type="primary"
							icon={<CheckOutlined />}
							iconPosition={"end"}
							onClick={handleSubmit}
						>
							저장
						</Button>
					</Flex>
				</Flex>
			</Flex>
			{/* //기 등록된 수주 내용 수정시 */}
		</div>
	);
};

export default OrderCreateHeaderUpdate;
