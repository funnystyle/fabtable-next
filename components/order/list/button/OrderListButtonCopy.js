// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import {Button, Form,} from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { handleCopyModal } from "@components/list/handleCopyModal";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import OrderListCopyModal from "@components/order/list/modal/OrderListCopyModal";

const OrderListButtonCopy = ({ selectedRowKeys }) => {

	const [form] = Form.useForm();

	const [openModal, setOpenModal] = useState(false);
	const showModal = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Button onClick={showModal}>수주 복제하기</Button>
			<OrderListCopyModal form={form} openModal={openModal} setOpenModal={setOpenModal} selectedRowKeys={selectedRowKeys} />
		</>
	);
};

export default OrderListButtonCopy;
