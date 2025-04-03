// pages/order/create/index.js
import React from "react";
import { Button, Form, } from "antd";
import OrderListCopyModal from "@components/order/list/modal/OrderListCopyModal";
import useRecordListCopyModalStore from "@store/useRecordListCopyModalStore";

const OrderListButtonCopy = ({ handleReload }) => {

	const [form] = Form.useForm();

	const { openCopyModal:openModal, setOpenCopyModal:setOpenModal } = useRecordListCopyModalStore();

	const showModal = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Button onClick={showModal}>수주 복제하기</Button>
			<OrderListCopyModal form={form} openModal={openModal} setOpenModal={setOpenModal} handleReload={handleReload} />
		</>
	);
};

export default OrderListButtonCopy;
