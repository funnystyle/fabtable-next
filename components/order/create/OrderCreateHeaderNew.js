// pages/order/create/index.js
import React from "react";
import {Button, Flex, message, Modal, Tag,} from "antd";
import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import {CloseOutlined, EditFilled} from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";
import useMenuTabStore from "@store/useMenuTabStore";
import {transformTagDataSingle} from "@components/order/table/transformTagData";

const OrderCreateHeaderNew = ({ form, tabRemove }) => {

	const { setRecord, setIsCopy, setIsChange } = useRecordDataStore();
	const { moveUrl } = useMenuTabStore();

	const { mutate: orderInfoCreate } = useMutation({
		mutationKey: "orderInfoCreate",
		mutationFn: (values) => postAxios("/user/record", values),
		onSuccess: (response, values) => {
			values.id= response?.data?.id;
			values.serialNumber = response?.data?.serialNumber;
			values.oldSerialNumber = response?.data?.oldSerialNumber;
			values.nowState = transformTagDataSingle(response?.data?.tagInfoList, response?.data?.nowState);
			setIsCopy(false);
			setIsChange(false);
			setRecord(values)
			message.success('수주 등록이 완료되었습니다.');
		}
	});

	const handleReset = () => {
		Modal.confirm({
			title: "초기화 안내",
			content: "입력된 내용이 모두 초기화 됩니다.",
			onOk: () => {
				setIsChange(false);
				setIsCopy(false);
				setRecord({});
				form.resetFields();
			},
		});
	};

	const handleSubmit = async (event) => {
		const values = await form.validateFields();

		await orderInfoCreate(values);

		// moveUrl(`/order/list`);
	}

	const handleCancel = () => {
		Modal.confirm({
			title: "등록 취소",
			content: "등록을 취소하고 이 화면을 닫습니다.",
			onOk: () => {
				setIsChange(false);
				setIsCopy(false);
				setRecord({});
				form.resetFields();
				tabRemove();
			},
		});
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
						<Button icon={<CloseOutlined />} iconPosition={"end"} onClick={handleCancel}>
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
