// pages/order/create/index.js
import React from "react";
import { Button, Form, message, } from "antd";
import OrderListCopyModal from "@components/order/list/modal/OrderListCopyModal";
import useRecordListCopyModalStore from "@store/useRecordListCopyModalStore";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";

const OrderListButtonCopy = ({ handleReload }) => {

	const [form] = Form.useForm();

	const { openCopyModal:openModal, setOpenCopyModal:setOpenModal } = useRecordListCopyModalStore();
	const { selectedRowKeys } = useTableSelectKeysOrderListStore();

	const showModal = () => {
		if (selectedRowKeys.length === 0) {
			message.warning("복제할 행을 선택해주세요.");
			return;
		}

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
