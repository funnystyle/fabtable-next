// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Flex, message, Modal, Space,} from "antd";
import {useMutation} from "@tanstack/react-query";
import {putAxios} from "@api/apiClient";
import {CheckOutlined, CloseOutlined, DownOutlined} from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";
import OrderCreateStatusChangeButton from "@components/order/create/button/OrderCreateStatusChangeButton";
import OrderCreateCopyButton from "@components/order/create/button/OrderCreateCopyButton";
import {transformTagDataSingle} from "@components/order/table/transformTagData";
import OrderCreateDeleteButton from "@components/order/create/button/OrderCreateDeleteButton";
import { handleRecordInfoPopup } from "@components/popup/handleOpenPopup";

const OrderCreateHeaderUpdate = ({ form }) => {

	const { record, setRecord, nowState, setNowState, tagInfoList, serialNumber, isChange, setIsCopy, setIsChange } = useRecordDataStore();

	const { mutate: updateRecord } = useMutation({
		mutationKey: "updateRecord",
		mutationFn: (values) => putAxios("/user/record", values),
		onSuccess: (response, values) => {
			setIsChange(false);
			setIsCopy(false);
			message.success('저장 완료');
		},
		onError: (error) => {
			message.error('저장 실패. 잠시 후 다시 시도해주세요');
		}
	});

	const handleSubmit = async (event) => {
		const values = await form.validateFields();
		values.ids = [record.id];

		await updateRecord(values);
	}

	const handleReset = () => {
		if (isChange) {
			Modal.confirm({
				title: "알림",
				content: "변경된 데이터가 있습니다. 저장하지 않고 진행할까요? ",
				onOk: () => {
					setIsCopy(false);
					setIsChange(false);
					setNowState(transformTagDataSingle(tagInfoList, "발주기입"));
					form.resetFields();
					setRecord({});
				},
			});
		} else {
			setIsCopy(false);
			setIsChange(false);
			setNowState(transformTagDataSingle(tagInfoList, "발주기입"));
			form.resetFields();
			setRecord({});
		}
	};

	return (
		<div className="top-btn-area">
			{/* 기 등록된 수주 내용 수정시 */}
			<Flex justify="space-between" className="detail-top-area">
				<Flex gap={12}>
					{nowState}

					<ul className="product-info">
						<li>{record.oldSerialNumber}</li>
						<li>{serialNumber}</li>
					</ul>
				</Flex>

				<Flex align="center" gap={8} className="detail-btn-area">
					<Flex gap={8} className="btn-space-area">
						<Button onClick={(e) => handleRecordInfoPopup(window, [record])}>수주 종합정보</Button>

						<OrderCreateStatusChangeButton />
					</Flex>

					<Flex gap={8} className="btn-space-area">
						<OrderCreateCopyButton />
						<Button onClick={handleReset}>신규</Button>
						<OrderCreateDeleteButton form={form} handleReset={handleReset}/>

						<Dropdown menu={{ items: [] }}>
							<Button>
								<Space>
									인쇄
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>
					</Flex>
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
