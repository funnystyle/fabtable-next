// pages/order/create/index.js
import React from "react";
import {Button, Flex, message, Tag,} from "antd";
import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import {CloseOutlined, EditFilled} from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";

const OrderCreateHeaderNew = ({ form }) => {

	const { setRecord } = useRecordDataStore();

	const { mutate: orderInfoCreate } = useMutation({
		mutationKey: "orderInfoCreate",
		mutationFn: (values) => postAxios("/user/record", values),
		onSuccess: (response, values) => {
			values.id= response?.data?.id;
			setRecord(values)
		}
	});

	const handleReset = () => {
		form.resetFields();
	};

	const handleSubmit = async (event) => {
		const values = await form.validateFields();

		await orderInfoCreate(values);
		message.success('수주 등록이 완료되었습니다!');
	}

	return (
		<div className="top-btn-area">
			{/* 신규 수주 등록시 */}
			<Flex align="center" justify="space-between">
				<Tag className="CurrentStatus001">발주기입</Tag>

				<Flex align="center" gap={8}>
					<Flex className="btn-space-area">
						<Button type="text" onClick={handleReset} className="btn-all-reset">
							전체 초기화
						</Button>
					</Flex>

					<Flex gap={8}>
						<Button icon={<CloseOutlined />} iconPosition={"end"}>
							취소
						</Button>
						<Button
							type="primary"
							icon={<EditFilled />}
							iconPosition={"end"}
							onClick={handleSubmit}
						>
							등록
						</Button>
					</Flex>
				</Flex>
			</Flex>
			{/* //신규 수주 등록시 */}
		</div>
	);
};

export default OrderCreateHeaderNew;
