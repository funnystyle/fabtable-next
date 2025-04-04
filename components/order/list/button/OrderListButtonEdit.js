// pages/order/create/index.js
import React from "react";
import { Button, Form, message, } from "antd";
import OrderListEditModal from "@components/order/list/modal/OrderListEditModal";
import useRecordListEditModalStore from "@store/useRecordListEditModalStore";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";

const OrderListButtonEdit = ({ handleReload }) => {

	const [form] = Form.useForm();

	const { openEditModal:openModal, setOpenEditModal:setOpenModal } = useRecordListEditModalStore();
	const { selectedRowKeys } = useTableSelectKeysOrderListStore();

	const showModal = () => {
		if (selectedRowKeys.length === 0) {
			message.warning("수정할 행을 선택해주세요.");
			return;
		}
		setOpenModal(true);
	};

	return (
		<>
			<Button onClick={showModal}>수주 일괄수정</Button>
			<OrderListEditModal form={form} openModal={openModal} setOpenModal={setOpenModal} handleReload={handleReload} />
		</>
	);
};

export default OrderListButtonEdit;
