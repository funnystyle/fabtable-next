// pages/order/create/index.js
import React, {useState} from "react";
import {Button, Form,} from "antd";
import OrderListEditModal from "@components/order/list/modal/OrderListEditModal";
import useRecordModalStore from "@store/useRecordModalStore";

const OrderListButtonEdit = () => {

	const [form] = Form.useForm();

	const { openEditModal:openModal, setOpenEditModal:setOpenModal } = useRecordModalStore();

	const showModal = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Button onClick={showModal}>수주 일괄수정</Button>
			<OrderListEditModal form={form} openModal={openModal} setOpenModal={setOpenModal} />
		</>
	);
};

export default OrderListButtonEdit;
